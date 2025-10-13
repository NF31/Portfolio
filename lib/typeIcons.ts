// Base de données optimisée des icônes de types
export interface TypeConfig {
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

// Map optimisée pour O(1) lookup
export const TYPE_ICONS_MAP: Record<string, TypeConfig> = {
  // Technologies Frontend
  react: { icon: '⚛️', color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200' },
  vue: { icon: '💚', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  angular: { icon: '🅰️', color: 'from-red-500 to-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  svelte: { icon: '🧡', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  next: { icon: '▲', color: 'from-black to-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' },
  nuxt: { icon: '💚', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  sveltekit: { icon: '🧡', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  
  // Technologies Backend
  node: { icon: '🟢', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  express: { icon: '🚀', color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' },
  fastapi: { icon: '⚡', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  django: { icon: '🐍', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  flask: { icon: '🌶️', color: 'from-red-500 to-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  laravel: { icon: '🔴', color: 'from-red-500 to-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  symfony: { icon: '🎼', color: 'from-black to-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' },
  
  // Langages de programmation
  python: { icon: '🐍', color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  java: { icon: '☕', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  javascript: { icon: '🟨', color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  typescript: { icon: '🔷', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  php: { icon: '🐘', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  ruby: { icon: '💎', color: 'from-red-500 to-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  go: { icon: '🐹', color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-200' },
  rust: { icon: '🦀', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  csharp: { icon: '🔷', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  cpp: { icon: '⚙️', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  swift: { icon: '🍎', color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' },
  kotlin: { icon: '🟣', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  
  // Bases de données
  mysql: { icon: '🐬', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  postgresql: { icon: '🐘', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  mongodb: { icon: '🍃', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  redis: { icon: '🔴', color: 'from-red-500 to-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  sqlite: { icon: '🗃️', color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' },
  
  // Domaines métier
  game: { icon: '🎮', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  gaming: { icon: '🎮', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  ai: { icon: '🤖', color: 'from-violet-500 to-violet-600', bgColor: 'bg-violet-50', borderColor: 'border-violet-200' },
  ml: { icon: '🧠', color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
  machine: { icon: '🧠', color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
  crypto: { icon: '₿', color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  blockchain: { icon: '⛓️', color: 'from-slate-500 to-slate-600', bgColor: 'bg-slate-50', borderColor: 'border-slate-200' },
  fintech: { icon: '💰', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  health: { icon: '🏥', color: 'from-red-500 to-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  medical: { icon: '🏥', color: 'from-red-500 to-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  education: { icon: '🎓', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  edtech: { icon: '🎓', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  
  // Types de projets
  portfolio: { icon: '💼', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  cms: { icon: '📄', color: 'from-teal-500 to-teal-600', bgColor: 'bg-teal-50', borderColor: 'border-teal-200' },
  dashboard: { icon: '📈', color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  admin: { icon: '⚙️', color: 'from-gray-500 to-gray-600', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' },
  applications: { icon: '📱', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  saas: { icon: '☁️', color: 'from-sky-500 to-sky-600', bgColor: 'bg-sky-50', borderColor: 'border-sky-200' },
  'e-commerce': { icon: '🛒', color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  ecommerce: { icon: '🛒', color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
  blog: { icon: '📝', color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  landing: { icon: '🚀', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  api: { icon: '🔌', color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-200' },
  microservice: { icon: '🧩', color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-50', borderColor: 'border-pink-200' },
  serverless: { icon: '☁️', color: 'from-sky-500 to-sky-600', bgColor: 'bg-sky-50', borderColor: 'border-sky-200' },
  
  // Outils et services
  docker: { icon: '🐳', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  kubernetes: { icon: '☸️', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  aws: { icon: '☁️', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  azure: { icon: '🔵', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  gcp: { icon: '🌐', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  firebase: { icon: '🔥', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  supabase: { icon: '🟢', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' }
};

// Schémas de couleurs par défaut
const DEFAULT_COLOR_SCHEMES: TypeConfig[] = [
  { icon: '🔵', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  { icon: '🟢', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  { icon: '🟡', color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  { icon: '🟠', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  { icon: '🔴', color: 'from-red-500 to-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  { icon: '🟣', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  { icon: '🟤', color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' }
];

// Cache pour éviter les recalculs
const iconCache = new Map<string, TypeConfig>();

/**
 * Génère une configuration d'icône optimisée pour un type de projet
 * @param typeValue - Le type de projet (ex: "react-app", "python-api")
 * @returns Configuration avec icône, couleurs et styles
 */
export function generateTypeConfig(typeValue: string): TypeConfig {
  const type = typeValue.toLowerCase();
  
  // Vérifier le cache d'abord
  if (iconCache.has(type)) {
    return iconCache.get(type)!;
  }
  
  // Recherche exacte O(1)
  if (TYPE_ICONS_MAP[type]) {
    const config = TYPE_ICONS_MAP[type];
    iconCache.set(type, config);
    return config;
  }
  
  // Recherche par mot-clé optimisée
  for (const [keyword, config] of Object.entries(TYPE_ICONS_MAP)) {
    if (type.includes(keyword)) {
      iconCache.set(type, config);
      return config;
    }
  }
  
  // Génération automatique basée sur la première lettre
  const firstLetter = type.charAt(0).toUpperCase();
  const colorIndex = firstLetter.charCodeAt(0) % DEFAULT_COLOR_SCHEMES.length;
  const selectedScheme = DEFAULT_COLOR_SCHEMES[colorIndex];
  
  const config: TypeConfig = {
    ...selectedScheme,
    icon: firstLetter
  };
  
  // Mettre en cache
  iconCache.set(type, config);
  return config;
}

/**
 * Nettoie le cache (utile pour les tests ou le développement)
 */
export function clearIconCache(): void {
  iconCache.clear();
}
