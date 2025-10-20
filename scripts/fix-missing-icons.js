/**
 * Script pour corriger les icônes manquantes (sans préfixe Icons.)
 */

const fs = require('fs');
const path = require('path');

// Liste des icônes à rechercher
const iconNames = [
  'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Check', 'Mail', 'Phone', 'MapPin',
  'Send', 'Loader2', 'CheckCircle2', 'AlertCircle', 'Sparkles', 'Clock',
  'Rocket', 'Zap', 'Shield', 'ChevronDown', 'Filter', 'X', 'Eye', 'EyeOff',
  'Lock', 'User', 'LogOut', 'Copy', 'Edit', 'Trash2', 'Star', 'StarOff',
  'Power', 'PowerOff', 'Save', 'Plus', 'Search', 'ChevronLeft', 'ChevronRight',
  'GraduationCap', 'BookOpen', 'Award', 'Calendar', 'Home', 'AlertTriangle',
  'Sun', 'Moon', 'Code', 'Database', 'Palette', 'Wrench', 'ExternalLink',
  'Globe', 'Github', 'Upload', 'Image', 'Code2'
];

function findTsxFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Vérifier si le fichier importe déjà Icons
    if (!content.includes("import { Icons } from '@/lib/icons'")) {
      return false;
    }

    // Chercher les icônes utilisées directement (sans Icons.)
    iconNames.forEach(iconName => {
      // Pattern pour trouver <IconName className=... ou <IconName> ou <IconName />
      const patterns = [
        new RegExp(`<${iconName}\\b(?!\\s*className)`, 'g'),
        new RegExp(`<${iconName}\\s+className`, 'g'),
        new RegExp(`<${iconName}\\s*/>`, 'g'),
        new RegExp(`<${iconName}\\s*>`, 'g')
      ];

      patterns.forEach(pattern => {
        if (pattern.test(content)) {
          // Remplacer <IconName par <Icons.IconName
          content = content.replace(pattern, `<Icons.${iconName}`);
          modified = true;
        }
      });
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Corrigé: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Erreur lors de la correction de ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔧 Correction des icônes manquantes...\n');

  const files = findTsxFiles('app');
  let fixedCount = 0;

  files.forEach(file => {
    if (fixFile(file)) {
      fixedCount++;
    }
  });

  console.log(`\n📊 Résultats:`);
  console.log(`   - Fichiers traités: ${files.length}`);
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

module.exports = { fixFile, findTsxFiles };
