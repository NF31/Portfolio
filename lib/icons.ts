/**
 * Fichier centralisé pour les icônes Lucide React
 * Optimise les performances en évitant les imports répétitifs
 * et en permettant le tree-shaking
 */

// Imports spécifiques pour le tree-shaking
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Clock,
  Rocket,
  Zap,
  Shield,
  ChevronDown,
  Filter,
  X,
  Eye,
  EyeOff,
  Lock,
  User,
  LogOut,
  Copy,
  Edit,
  Trash2,
  Star,
  StarOff,
  Power,
  PowerOff,
  Save,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Award,
  Calendar,
  Home,
  AlertTriangle,
  Sun,
  Moon,
  Code,
  Database,
  Palette,
  Wrench,
  ExternalLink,
  Globe,
  Github,
  Upload,
  Image as ImageIcon,
  Code2
} from 'lucide-react';

// Export des icônes les plus utilisées
export const Icons = {
  // Navigation
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Home,
  
  // Actions
  Check,
  Save,
  Edit,
  Copy,
  Trash2,
  Plus,
  Search,
  Filter,
  X,
  Send,
  Upload,
  
  // État
  Loader2,
  CheckCircle2,
  AlertCircle,
  Star,
  StarOff,
  Power,
  PowerOff,
  Eye,
  EyeOff,
  Lock,
  
  // Contact
  Mail,
  Phone,
  MapPin,
  
  // Interface
  User,
  LogOut,
  Shield,
  Sparkles,
  Clock,
  Rocket,
  Zap,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  
  // Éducation
  GraduationCap,
  BookOpen,
  Award,
  Calendar,
  
  // Développement
  Code,
  Code2,
  Database,
  Palette,
  Wrench,
  ExternalLink,
  Globe,
  Github,
  ImageIcon,
  
  // Thème
  Sun,
  Moon,
  
  // Autres
  AlertTriangle
} as const;

// Type pour l'autocomplétion
export type IconName = keyof typeof Icons;

// Fonction utilitaire pour obtenir une icône
export const getIcon = (name: IconName) => Icons[name];

// Export par défaut pour compatibilité
export default Icons;
