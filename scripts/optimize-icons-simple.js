/**
 * Script d'optimisation simplifié des icônes Lucide React
 * Version sans dépendances externes
 */

const fs = require('fs');
const path = require('path');

// Liste complète des fichiers à optimiser
const filesToOptimize = [
  // Components principaux
  'app/components/Footer.tsx',
  'app/components/HeroSection.tsx',
  'app/components/Navbar.tsx',
  'app/components/ProjectsSection.tsx',
  'app/components/ScrollToTop.tsx',
  'app/components/ServicesSection.tsx',
  'app/components/SkillCard.tsx',
  'app/components/SkillIcon.tsx',
  'app/components/BackButton.tsx',
  
  // Pages principales
  'app/services/page.tsx',
  'app/projets/page.tsx',
  'app/access-denied/page.tsx',
  'app/not-found.tsx',
  'app/system-maintenance-portal/page.tsx',
  'app/confidentialite/page.tsx',
  'app/conditions/page.tsx',
  'app/conditions-generales/page.tsx',
  
  // Admin pages
  'app/(admin)/page.tsx',
  'app/(admin)/not-found.tsx',
  'app/(admin)/admin-dashboard/page.tsx',
  'app/(admin)/admin-education/page.tsx',
  'app/(admin)/admin-images/page.tsx',
  'app/(admin)/admin-images/add/page.tsx',
  'app/(admin)/admin-images/edit/[id]/page.tsx',
  'app/(admin)/admin-messages/page.tsx',
  'app/(admin)/admin-projects/add/page.tsx',
  'app/(admin)/admin-services/page.tsx',
  'app/(admin)/admin-services/add/page.tsx',
  'app/(admin)/admin-services/edit/[id]/page.tsx',
  'app/(admin)/admin-skills/page.tsx',
  'app/(admin)/admin-skills/add/page.tsx',
  'app/(admin)/admin-skills/edit/[id]/page.tsx',
  
  // Admin components
  'app/(admin)/components/AdminNavbar.tsx',
  'app/(admin)/components/AdminSidebar.tsx',
  'app/(admin)/components/BackButton.tsx',
  'app/(admin)/components/LogoutButton.tsx',
  'app/(admin)/components/UserInfo.tsx',
  
  // Admin table components
  'app/(admin)/admin-images/components/ImagesTable.tsx',
  'app/(admin)/admin-images/components/ImagesFilters.tsx',
  'app/(admin)/admin-images/components/ImageReplacer.tsx',
  'app/(admin)/admin-images/components/Pagination.tsx',
  'app/(admin)/admin-projects/components/Pagination.tsx',
  'app/(admin)/admin-services/components/ServicesTable.tsx',
  'app/(admin)/admin-services/components/ServicesFilters.tsx',
  'app/(admin)/admin-services/components/Pagination.tsx',
  'app/(admin)/admin-skills/components/SkillsTable.tsx',
  'app/(admin)/admin-skills/components/SkillsFilters.tsx',
  'app/(admin)/admin-skills/components/Pagination.tsx'
];

// Mapping complet des icônes utilisées
const iconMappings = {
  // Navigation
  'ArrowLeft': 'Icons.ArrowLeft',
  'ArrowRight': 'Icons.ArrowRight',
  'ArrowUp': 'Icons.ArrowUp',
  'ChevronLeft': 'Icons.ChevronLeft',
  'ChevronRight': 'Icons.ChevronRight',
  'ChevronDown': 'Icons.ChevronDown',
  'Home': 'Icons.Home',
  
  // Actions
  'Check': 'Icons.Check',
  'Save': 'Icons.Save',
  'Edit': 'Icons.Edit',
  'Copy': 'Icons.Copy',
  'Trash2': 'Icons.Trash2',
  'Plus': 'Icons.Plus',
  'Search': 'Icons.Search',
  'Filter': 'Icons.Filter',
  'X': 'Icons.X',
  'Send': 'Icons.Send',
  'Upload': 'Icons.Upload',
  
  // État
  'Loader2': 'Icons.Loader2',
  'CheckCircle2': 'Icons.CheckCircle2',
  'AlertCircle': 'Icons.AlertCircle',
  'AlertTriangle': 'Icons.AlertTriangle',
  'Star': 'Icons.Star',
  'StarOff': 'Icons.StarOff',
  'Power': 'Icons.Power',
  'PowerOff': 'Icons.PowerOff',
  'Eye': 'Icons.Eye',
  'EyeOff': 'Icons.EyeOff',
  'Lock': 'Icons.Lock',
  
  // Contact
  'Mail': 'Icons.Mail',
  'Phone': 'Icons.Phone',
  'MapPin': 'Icons.MapPin',
  
  // Interface
  'User': 'Icons.User',
  'LogOut': 'Icons.LogOut',
  'Shield': 'Icons.Shield',
  'Sparkles': 'Icons.Sparkles',
  'Clock': 'Icons.Clock',
  'Rocket': 'Icons.Rocket',
  'Zap': 'Icons.Zap',
  
  // Éducation
  'GraduationCap': 'Icons.GraduationCap',
  'BookOpen': 'Icons.BookOpen',
  'Award': 'Icons.Award',
  'Calendar': 'Icons.Calendar',
  
  // Développement
  'Code': 'Icons.Code',
  'Code2': 'Icons.Code2',
  'Database': 'Icons.Database',
  'Palette': 'Icons.Palette',
  'Wrench': 'Icons.Wrench',
  'ExternalLink': 'Icons.ExternalLink',
  'Globe': 'Icons.Globe',
  'Github': 'Icons.Github',
  'Image': 'Icons.ImageIcon',
  
  // Thème
  'Sun': 'Icons.Sun',
  'Moon': 'Icons.Moon'
};

function optimizeFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Fichier non trouvé: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Vérifier si le fichier utilise déjà Icons.
    if (content.includes('Icons.')) {
      console.log(`✅ Déjà optimisé: ${filePath}`);
      return false;
    }

    // Remplacer les imports lucide-react
    const lucideImportRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"];?/g;
    const wildcardImportRegex = /import\s*\*\s*as\s*LucideIcons\s*from\s*['"]lucide-react['"];?/g;

    // Traiter les imports nommés
    content = content.replace(lucideImportRegex, (match, icons) => {
      const iconList = icons.split(',').map(icon => icon.trim());
      const mappedIcons = iconList.map(icon => {
        const cleanIcon = icon.replace(/\s+as\s+\w+/, ''); // Enlever les alias
        return iconMappings[cleanIcon] || icon;
      });

      // Si tous les icônes sont mappés, remplacer par l'import optimisé
      if (iconList.every(icon => {
        const cleanIcon = icon.replace(/\s+as\s+\w+/, '');
        return iconMappings[cleanIcon];
      })) {
        modified = true;
        return `import { Icons } from '@/lib/icons';`;
      }
      
      return match;
    });

    // Traiter les imports wildcard
    content = content.replace(wildcardImportRegex, () => {
      modified = true;
      return `import { Icons } from '@/lib/icons';`;
    });

    // Remplacer les utilisations d'icônes
    Object.entries(iconMappings).forEach(([original, mapped]) => {
      const regex = new RegExp(`\\b${original}\\b`, 'g');
      if (content.includes(original) && !content.includes('Icons.')) {
        content = content.replace(regex, mapped);
        modified = true;
      }
    });

    // Remplacer LucideIcons. par Icons.
    content = content.replace(/LucideIcons\./g, 'Icons.');
    if (content.includes('LucideIcons.')) {
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Optimisé: ${filePath}`);
      return true;
    } else {
      console.log(`ℹ️  Aucune optimisation nécessaire: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur lors de l'optimisation de ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🚀 Début de l\'optimisation des icônes Lucide React...\n');

  let optimizedCount = 0;
  let totalFiles = filesToOptimize.length;

  filesToOptimize.forEach(file => {
    if (optimizeFile(file)) {
      optimizedCount++;
    }
  });

  console.log(`\n📊 Résultats:`);
  console.log(`   - Fichiers traités: ${totalFiles}`);
  console.log(`   - Fichiers optimisés: ${optimizedCount}`);
  console.log(`   - Économie estimée: ~${optimizedCount * 15}KB de bundle`);
  
  if (optimizedCount > 0) {
    console.log('\n✨ Optimisation terminée ! N\'oubliez pas de tester votre application.');
  } else {
    console.log('\nℹ️  Aucun fichier n\'a nécessité d\'optimisation.');
  }
}

if (require.main === module) {
  main();
}

module.exports = { optimizeFile, iconMappings };
