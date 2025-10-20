/**
 * Script pour corriger les fichiers restants avec des imports lucide-react
 */

const fs = require('fs');

// Fichiers restants à corriger
const filesToFix = [
  'app/components/ProjectsSection.tsx',
  'app/components/Footer.tsx', 
  'app/components/HeroSection.tsx',
  'app/projets/page.tsx',
  'app/components/ServicesSection.tsx',
  'app/(admin)/admin-services/edit/[id]/page.tsx',
  'app/(admin)/admin-services/components/ServicesTable.tsx',
  'app/(admin)/admin-services/add/page.tsx',
  'app/(admin)/admin-skills/edit/[id]/page.tsx',
  'app/(admin)/components/AdminSidebar.tsx',
  'app/(admin)/components/AdminNavbar.tsx',
  'app/(admin)/admin-messages/page.tsx',
  'app/(admin)/admin-dashboard/page.tsx',
  'app/(admin)/page.tsx'
];

function fixFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Fichier non trouvé: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remplacer tous les imports lucide-react
    const lucideImportRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"];?/g;
    const wildcardImportRegex = /import\s*\*\s*as\s*LucideIcons\s*from\s*['"]lucide-react['"];?/g;

    // Supprimer tous les imports lucide-react
    content = content.replace(lucideImportRegex, () => {
      modified = true;
      return '';
    });

    content = content.replace(wildcardImportRegex, () => {
      modified = true;
      return '';
    });

    // Ajouter l'import Icons si pas déjà présent
    if (!content.includes("import { Icons } from '@/lib/icons'")) {
      // Trouver la première ligne d'import
      const importLines = content.split('\n');
      let insertIndex = 0;
      
      for (let i = 0; i < importLines.length; i++) {
        if (importLines[i].startsWith('import ')) {
          insertIndex = i + 1;
        } else if (importLines[i].trim() === '' && insertIndex > 0) {
          break;
        }
      }
      
      importLines.splice(insertIndex, 0, "import { Icons } from '@/lib/icons';");
      content = importLines.join('\n');
      modified = true;
    }

    // Remplacer les utilisations d'icônes
    const iconReplacements = {
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

    // Remplacer les utilisations d'icônes
    Object.entries(iconReplacements).forEach(([original, replacement]) => {
      // Remplacer les icônes dans les balises JSX
      const jsxRegex = new RegExp(`<${original}\\b`, 'g');
      if (content.match(jsxRegex)) {
        content = content.replace(jsxRegex, `<${replacement}`);
        modified = true;
      }
    });

    // Remplacer LucideIcons. par Icons.
    if (content.includes('LucideIcons.')) {
      content = content.replace(/LucideIcons\./g, 'Icons.');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Corrigé: ${filePath}`);
      return true;
    } else {
      console.log(`ℹ️  Aucune correction nécessaire: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur lors de la correction de ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔧 Correction des fichiers restants avec lucide-react...\n');

  let fixedCount = 0;
  let totalFiles = filesToFix.length;

  filesToFix.forEach(file => {
    if (fixFile(file)) {
      fixedCount++;
    }
  });

  console.log(`\n📊 Résultats:`);
  console.log(`   - Fichiers traités: ${totalFiles}`);
  console.log(`   - Fichiers corrigés: ${fixedCount}`);
  
  if (fixedCount > 0) {
    console.log('\n✨ Correction terminée !');
  } else {
    console.log('\nℹ️  Aucun fichier n\'a nécessité de correction.');
  }
}

if (require.main === module) {
  main();
}

module.exports = { fixFile };
