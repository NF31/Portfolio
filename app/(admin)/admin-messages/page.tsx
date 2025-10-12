'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, 
  MailOpen, 
  CheckCircle2, 
  Trash2, 
  Phone, 
  Calendar,
  Loader2,
  AlertCircle,
  Reply
} from 'lucide-react';

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
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      unread: { icon: Mail, text: 'Non lu', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      read: { icon: MailOpen, text: 'Lu', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
      processed: { icon: CheckCircle2, text: 'Traité', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    };
    
    // Protection : utiliser 'unread' par défaut si le statut n'existe pas
    const badge = badges[status as keyof typeof badges] || badges.unread;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium ${badge.color}`}>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 dark:bg-gray-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Messages de contact</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Gérez les messages reçus depuis votre portfolio</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 sm:p-3 rounded-lg">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Non lus</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.unread}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 sm:p-3 rounded-lg">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Lus</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">{stats.read}</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 sm:p-3 rounded-lg">
              <MailOpen className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Traités</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.processed}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 sm:p-3 rounded-lg">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-4 mb-6 border border-gray-200 dark:border-gray-700">
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
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium transition-all ${
                activeFilter === filter.key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

        {/* Messages List */}
        {loading ? (
          <div className="flex items-center justify-center py-12 sm:py-20">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-blue-600 dark:text-blue-400" />
          </div>
        ) : messages.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 sm:p-12 text-center border border-gray-200 dark:border-gray-700">
            <Mail className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Aucun message</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Aucun message ne correspond à vos critères</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border transition-all hover:shadow-md ${
                  message.status === 'unread' 
                    ? 'border-blue-300 dark:border-blue-700 bg-blue-50/30 dark:bg-blue-900/10' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-3 sm:gap-4 mb-4">
                    <div className="flex-1 min-w-0 w-full lg:w-auto">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                          {message.name}
                        </h3>
                        {getStatusBadge(message.status)}
                        {!message.emailSent && (
                          <span className="inline-flex items-center px-2 py-0.5 sm:py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Email non envoyé
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <a 
                          href={`mailto:${message.email}`}
                          className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="truncate max-w-[200px] sm:max-w-none">{message.email}</span>
                        </a>
                        <a 
                          href={`tel:${message.phone}`}
                          className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                          {message.phone}
                        </a>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 sm:gap-2 w-full lg:w-auto justify-end">
                      {message.status !== 'read' && (
                        <button
                          onClick={() => updateStatus(message._id, 'read')}
                          disabled={actionLoading === message._id}
                          className="p-1.5 sm:p-2 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors disabled:opacity-50"
                          title="Marquer comme lu"
                        >
                          <MailOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      )}
                      {message.status !== 'processed' && (
                        <button
                          onClick={() => updateStatus(message._id, 'processed')}
                          disabled={actionLoading === message._id}
                          className="p-1.5 sm:p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors disabled:opacity-50"
                          title="Marquer comme traité"
                        >
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      )}
                      <a
                        href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject || 'Votre message')}&body=${encodeURIComponent(`Bonjour ${message.name},\n\n`)}`}
                        className="p-1.5 sm:p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Répondre par email"
                      >
                        <Reply className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                      <button
                        onClick={() => deleteMessage(message._id)}
                        disabled={actionLoading === message._id}
                        className="p-1.5 sm:p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Optional Fields */}
                  {(message.subject || message.budget) && (
                    <div className="flex flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm">
                      {message.subject && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Service:</span>
                          <span className="px-2 py-0.5 sm:py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-md">
                            {message.subject}
                          </span>
                        </div>
                      )}
                      {message.budget && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Budget:</span>
                          <span className="px-2 py-0.5 sm:py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md">
                            {message.budget}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

