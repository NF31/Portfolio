/**
 * Script pour corriger toutes les références restantes à LucideIcons
 */

const fs = require('fs');
const path = require('path');

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

function fixLucideIconsReferences(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Vérifier si le fichier contient des références à LucideIcons
    if (!content.includes('LucideIcons')) {
      return false;
    }

    // Remplacer toutes les références à LucideIcons par Icons
    const lucideIconsRegex = /LucideIcons/g;
    if (lucideIconsRegex.test(content)) {
      content = content.replace(lucideIconsRegex, 'Icons');
      modified = true;
    }

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
  console.log('🔧 Correction des références LucideIcons...\n');

  const files = findTsxFiles('app');
  let fixedCount = 0;

  files.forEach(file => {
    if (fixLucideIconsReferences(file)) {
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

module.exports = { fixLucideIconsReferences, findTsxFiles };
