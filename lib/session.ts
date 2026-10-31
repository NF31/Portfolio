import { NextRequest, NextResponse } from 'next/server';

/**
 * Session admin signée (HMAC-SHA256).
 *
 * Le cookie contient `<payload>.<signature>` : sans SESSION_SECRET, impossible
 * de fabriquer ou de modifier un jeton valide. Web Crypto uniquement, pour que
 * le même code tourne dans le middleware (Edge) et dans les routes API (Node).
 */

export const SESSION_COOKIE = 'admin_session';
export const SESSION_MAX_AGE = 24 * 60 * 60; // 24 heures, en secondes

type SessionPayload = { uid: string; exp: number };

const encoder = new TextEncoder();

function base64url(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64url(value: string): Uint8Array<ArrayBuffer> {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64 + '='.repeat((4 - (base64.length % 4)) % 4));
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

async function getKey(): Promise<CryptoKey | null> {
  const secret = process.env.SESSION_SECRET;
  // Sans secret (ou secret trop court), aucune session n'est acceptée
  if (!secret || secret.length < 32) return null;
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Crée un jeton de session pour un utilisateur admin
 */
export async function createSessionToken(userId: string): Promise<string> {
  const key = await getKey();
  if (!key) throw new Error('SESSION_SECRET manquant ou trop court (32 caractères minimum)');

  const payload: SessionPayload = { uid: userId, exp: Date.now() + SESSION_MAX_AGE * 1000 };
  const body = base64url(encoder.encode(JSON.stringify(payload)));
  const signature = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(body)));

  return `${body}.${base64url(signature)}`;
}

/**
 * Vérifie un jeton de session, renvoie l'id utilisateur ou null
 */
export async function verifySessionToken(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  const key = await getKey();
  if (!key) return null;

  const [body, signature] = token.split('.');
  if (!body || !signature) return null;

  try {
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      fromBase64url(signature),
      encoder.encode(body)
    );
    if (!valid) return null;

    const payload = JSON.parse(new TextDecoder().decode(fromBase64url(body))) as SessionPayload;
    if (typeof payload.uid !== 'string' || typeof payload.exp !== 'number') return null;
    if (Date.now() > payload.exp) return null;

    return payload.uid;
  } catch {
    return null;
  }
}

/**
 * Id de l'admin connecté d'après le cookie de session, ou null
 */
export async function getSessionUserId(request: NextRequest): Promise<string | null> {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

/**
 * À appeler en tête des routes réservées à l'admin :
 * renvoie une réponse 401 si la session est absente ou invalide, sinon null
 */
export async function requireAdmin(request: NextRequest): Promise<NextResponse | null> {
  const userId = await getSessionUserId(request);
  if (!userId) {
    return NextResponse.json(
      { success: false, message: 'Non authentifié' },
      { status: 401 }
    );
  }
  return null;
}
