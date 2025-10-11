'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, 
  MailOpen, 
  CheckCircle2, 
  Trash2, 
  Phone, 
  Calendar,
  TrendingUp,
  Loader2,
  ExternalLink,
  AlertCircle,
  Reply
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
  budget?: string;
  status: 'unread' | 'read' | 'processed';
  ip?: string;
  emailSent: boolean;
  emailSentAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  unread: number;
  read: number;
  processed: number;
  total: number;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats>({ unread: 0, read: 0, processed: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'read' | 'processed'>('all');
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [activeFilter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const url = activeFilter === 'all' 
        ? '/api/messages'
        : `/api/messages?status=${activeFilter}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setMessages(data.data);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: 'unread' | 'read' | 'processed') => {
    try {
      setActionLoading(id);
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    try {
      setActionLoading(id);
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      unread: { icon: Mail, text: 'Non lu', color: 'bg-blue-100 text-blue-800' },
      read: { icon: MailOpen, text: 'Lu', color: 'bg-yellow-100 text-yellow-800' },
      processed: { icon: CheckCircle2, text: 'Traité', color: 'bg-green-100 text-green-800' },
    };
    
    // Protection : utiliser 'unread' par défaut si le statut n'existe pas
    const badge = badges[status as keyof typeof badges] || badges.unread;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {badge.text}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days === 1) return 'Hier';
    if (days < 7) return `Il y a ${days}j`;
    
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages de contact</h1>
          <p className="text-gray-600">Gérez les messages reçus depuis votre portfolio</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Non lus</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.unread}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lus</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.read}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <MailOpen className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Traités</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.processed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Tous', count: stats.total },
              { key: 'unread', label: 'Non lus', count: stats.unread },
              { key: 'read', label: 'Lus', count: stats.read },
              { key: 'processed', label: 'Traités', count: stats.processed },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as typeof activeFilter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeFilter === filter.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Messages List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
            <Mail className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun message</h3>
            <p className="text-gray-600">Aucun message ne correspond à vos critères</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`bg-white rounded-xl shadow-sm border transition-all hover:shadow-md ${
                  message.status === 'unread' 
                    ? 'border-blue-300 bg-blue-50/30' 
                    : 'border-gray-200'
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {message.name}
                        </h3>
                        {getStatusBadge(message.status)}
                        {!message.emailSent && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Email non envoyé
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <a 
                          href={`mailto:${message.email}`}
                          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          {message.email}
                        </a>
                        <a 
                          href={`tel:${message.phone}`}
                          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {message.phone}
                        </a>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {message.status !== 'read' && (
                        <button
                          onClick={() => updateStatus(message._id, 'read')}
                          disabled={actionLoading === message._id}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Marquer comme lu"
                        >
                          <MailOpen className="w-5 h-5" />
                        </button>
                      )}
                      {message.status !== 'processed' && (
                        <button
                          onClick={() => updateStatus(message._id, 'processed')}
                          disabled={actionLoading === message._id}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Marquer comme traité"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                      )}
                      <a
                        href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject || 'Votre message')}&body=${encodeURIComponent(`Bonjour ${message.name},\n\n`)}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Répondre par email"
                      >
                        <Reply className="w-5 h-5" />
                      </a>
                      <button
                        onClick={() => deleteMessage(message._id)}
                        disabled={actionLoading === message._id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Optional Fields */}
                  {(message.subject || message.budget) && (
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      {message.subject && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="font-medium">Service:</span>
                          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md">
                            {message.subject}
                          </span>
                        </div>
                      )}
                      {message.budget && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="font-medium">Budget:</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md">
                            {message.budget}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

