/**
 * Script pour corriger les erreurs de syntaxe dans les icônes
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

function fixSyntaxErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Corriger les erreurs de syntaxe communes avec les icônes
    const fixes = [
      // Corriger Icons.IconName="..." en Icons.IconName className="..."
      {
        pattern: /<Icons\.(\w+)="([^"]+)"/g,
        replacement: '<Icons.$1 className="$2"'
      },
      // Corriger les balises auto-fermantes mal formées
      {
        pattern: /<Icons\.(\w+)\s+className="([^"]+)"\s*\/>/g,
        replacement: '<Icons.$1 className="$2" />'
      },
      // Corriger les espaces manquants avant />
      {
        pattern: /<Icons\.(\w+)\s+className="([^"]+)"\/>/g,
        replacement: '<Icons.$1 className="$2" />'
      }
    ];

    fixes.forEach(fix => {
      if (fix.pattern.test(content)) {
        content = content.replace(fix.pattern, fix.replacement);
        modified = true;
      }
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
  console.log('🔧 Correction des erreurs de syntaxe...\n');

  const files = findTsxFiles('app');
  let fixedCount = 0;

  files.forEach(file => {
    if (fixSyntaxErrors(file)) {
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

module.exports = { fixSyntaxErrors, findTsxFiles };
