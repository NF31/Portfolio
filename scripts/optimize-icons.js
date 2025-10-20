/**
 * Script d'optimisation des icônes Lucide React
 * Remplace les imports lucide-react par des imports optimisés
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Mapping des icônes les plus utilisées
const iconMappings = {
  'ArrowLeft': 'Icons.ArrowLeft',
  'ArrowRight': 'Icons.ArrowRight',
  'ArrowUp': 'Icons.ArrowUp',
  'Check': 'Icons.Check',
  'Mail': 'Icons.Mail',
  'Phone': 'Icons.Phone',
  'MapPin': 'Icons.MapPin',
  'Send': 'Icons.Send',
  'Loader2': 'Icons.Loader2',
  'CheckCircle2': 'Icons.CheckCircle2',
  'AlertCircle': 'Icons.AlertCircle',
  'Sparkles': 'Icons.Sparkles',
  'Clock': 'Icons.Clock',
  'Rocket': 'Icons.Rocket',
  'Zap': 'Icons.Zap',
  'Shield': 'Icons.Shield',
  'ChevronDown': 'Icons.ChevronDown',
  'Filter': 'Icons.Filter',
  'X': 'Icons.X',
  'Eye': 'Icons.Eye',
  'EyeOff': 'Icons.EyeOff',
  'Lock': 'Icons.Lock',
  'User': 'Icons.User',
  'LogOut': 'Icons.LogOut',
  'Copy': 'Icons.Copy',
  'Edit': 'Icons.Edit',
  'Trash2': 'Icons.Trash2',
  'Star': 'Icons.Star',
  'StarOff': 'Icons.StarOff',
  'Power': 'Icons.Power',
  'PowerOff': 'Icons.PowerOff',
  'Save': 'Icons.Save',
  'Plus': 'Icons.Plus',
  'Search': 'Icons.Search',
  'ChevronLeft': 'Icons.ChevronLeft',
  'ChevronRight': 'Icons.ChevronRight',
  'GraduationCap': 'Icons.GraduationCap',
  'BookOpen': 'Icons.BookOpen',
  'Award': 'Icons.Award',
  'Calendar': 'Icons.Calendar',
  'Home': 'Icons.Home',
  'AlertTriangle': 'Icons.AlertTriangle',
  'Sun': 'Icons.Sun',
  'Moon': 'Icons.Moon',
  'Code': 'Icons.Code',
  'Database': 'Icons.Database',
  'Palette': 'Icons.Palette',
  'Wrench': 'Icons.Wrench',
  'ExternalLink': 'Icons.ExternalLink',
  'Globe': 'Icons.Globe',
  'Github': 'Icons.Github',
  'Upload': 'Icons.Upload',
  'Image': 'Icons.ImageIcon',
  'Code2': 'Icons.Code2'
};

function optimizeFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

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
    }

    return false;
  } catch (error) {
    console.error(`❌ Erreur lors de l'optimisation de ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🚀 Début de l\'optimisation des icônes Lucide React...\n');

  // Trouver tous les fichiers TypeScript/JavaScript
  const files = glob.sync('app/**/*.{ts,tsx}', { ignore: ['node_modules/**'] });
  
  let optimizedCount = 0;
  let totalFiles = files.length;

  files.forEach(file => {
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
