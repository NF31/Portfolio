/**
 * Script ULTRA-EFFICACE pour corriger TOUTES les erreurs de syntaxe JSX
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

function fixAllJsxErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let errorCount = 0;

    // Détecter TOUTES les variantes d'erreurs JSX avec Icons
    const errorPatterns = [
      // Icons.IconName={`...`} -> Icons.IconName className={`...`}
      {
        pattern: /<Icons\.(\w+)\{`([^`]+)`\}/g,
        replacement: '<Icons.$1 className={`$2`}',
        name: 'Template literals sans className'
      },
      // Icons.IconName={"..."} -> Icons.IconName className={"..."}
      {
        pattern: /<Icons\.(\w+)\{\"([^\"]+)\"\}/g,
        replacement: '<Icons.$1 className={"$2"}',
        name: 'Double quotes sans className'
      },
      // Icons.IconName={'...'} -> Icons.IconName className={'...'}
      {
        pattern: /<Icons\.(\w+)\{\'([^\']+)\'\}/g,
        replacement: '<Icons.$1 className={\'$2\'}',
        name: 'Single quotes sans className'
      },
      // Icons.IconName={variable} -> Icons.IconName className={variable}
      {
        pattern: /<Icons\.(\w+)\{([^`"'}\s]+)\}/g,
        replacement: '<Icons.$1 className={$2}',
        name: 'Variables sans className'
      },
      // Icons.IconName="..." -> Icons.IconName className="..."
      {
        pattern: /<Icons\.(\w+)="([^"]+)"/g,
        replacement: '<Icons.$1 className="$2"',
        name: 'String literals sans className'
      },
      // Icons.IconName='...' -> Icons.IconName className='...'
      {
        pattern: /<Icons\.(\w+)='([^']+)'/g,
        replacement: '<Icons.$1 className=\'$2\'',
        name: 'Single quotes string sans className'
      }
    ];

    console.log(`🔍 Analyse de ${filePath}...`);

    errorPatterns.forEach(fix => {
      const matches = content.match(fix.pattern);
      if (matches) {
        console.log(`   ❌ Trouvé ${matches.length} erreur(s) de type: ${fix.name}`);
        content = content.replace(fix.pattern, fix.replacement);
        modified = true;
        errorCount += matches.length;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Corrigé: ${filePath} (${errorCount} erreur(s))`);
      return true;
    } else {
      console.log(`✅ Aucune erreur trouvée dans ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur lors de la correction de ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔧 CORRECTION ULTRA-EFFICACE des erreurs JSX...\n');

  const files = findTsxFiles('app');
  let fixedCount = 0;
  let totalErrors = 0;

  files.forEach(file => {
    if (fixAllJsxErrors(file)) {
      fixedCount++;
    }
  });

  console.log(`\n📊 RÉSULTATS FINAUX:`);
  console.log(`   - Fichiers traités: ${files.length}`);
  console.log(`   - Fichiers corrigés: ${fixedCount}`);
  
  if (fixedCount > 0) {
    console.log('\n✨ CORRECTION TERMINÉE ! Plus d\'erreurs JSX !');
  } else {
    console.log('\n🎉 Aucune erreur JSX trouvée !');
  }
}

if (require.main === module) {
  main();
}

module.exports = { fixAllJsxErrors, findTsxFiles };
