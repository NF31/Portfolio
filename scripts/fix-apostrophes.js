const fs = require('fs');
const path = require('path');

function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next')) {
      findTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function fixApostrophes(content) {
  let modified = false;
  
  // Remplacer les apostrophes dans le texte JSX (mais pas dans les commentaires ou strings)
  // Pattern: texte avec apostrophe dans du texte JSX (entre > et <)
  const patterns = [
    // Apostrophes simples dans le texte JSX
    {
      // Match: >texte avec l'apostrophe< ou >texte avec d'apostrophe<
      pattern: />([^<]*?)([a-zA-ZÀ-ÖØ-öø-ÿ])'([a-zA-ZÀ-ÖØ-öø-ÿ][^<]*?)</g,
      replacement: (match, before, char1, after) => {
        // Ne pas remplacer si c'est déjà échappé ou dans une expression JS
        if (before.includes('&apos;') || before.includes('&#39;') || before.includes('{')) {
          return match;
        }
        modified = true;
        return `>${before}${char1}&apos;${after}<`;
      }
    },
    // Guillemets doubles dans le texte JSX
    {
      pattern: />([^<]*?)"([^<]*?)</g,
      replacement: (match, before, after) => {
        // Ne pas remplacer si c'est déjà échappé ou dans une expression JS ou attribut
        if (before.includes('&quot;') || before.includes('&#34;') || before.includes('{') || before.includes('=')) {
          return match;
        }
        modified = true;
        return `>${before}&quot;${after}<`;
      }
    }
  ];

  // Approche plus simple: remplacer les apostrophes et guillemets dans les chaînes de texte JSX
  // En cherchant les patterns spécifiques d'erreur ESLint
  
  // Remplacer l'apostrophe dans les patterns courants
  const commonApostrophes = [
    { from: /L'([a-z])/g, to: "L&apos;$1" },
    { from: /l'([a-z])/g, to: "l&apos;$1" },
    { from: /d'([a-z])/g, to: "d&apos;$1" },
    { from: /n'([a-z])/g, to: "n&apos;$1" },
    { from: /s'([a-z])/g, to: "s&apos;$1" },
    { from: /c'([a-z])/g, to: "c&apos;$1" },
    { from: /j'([a-z])/g, to: "j&apos;$1" },
    { from: /m'([a-z])/g, to: "m&apos;$1" },
    { from: /t'([a-z])/g, to: "t&apos;$1" },
    { from: /qu'([a-z])/g, to: "qu&apos;$1" },
  ];

  // Remplacer les guillemets dans le texte JSX (mais pas dans les attributs)
  const quotePattern = /(>[^<{]*?)"([^<{]*?)(<|{)/g;
  
  let newContent = content;
  
  // D'abord, remplacer les apostrophes courantes dans le texte JSX
  commonApostrophes.forEach(({ from, to }) => {
    // Seulement dans le texte JSX, pas dans les attributs ou expressions
    newContent = newContent.replace(from, (match, ...args) => {
      // Vérifier que ce n'est pas dans une expression JS {}
      const beforeMatch = newContent.substring(0, newContent.indexOf(match));
      const lastOpenBrace = beforeMatch.lastIndexOf('{');
      const lastCloseBrace = beforeMatch.lastIndexOf('}');
      const lastOpenTag = beforeMatch.lastIndexOf('<');
      const lastCloseTag = beforeMatch.lastIndexOf('>');
      
      // Si on est dans une expression JS, ne pas remplacer
      if (lastOpenBrace > lastCloseBrace && lastOpenBrace > lastOpenTag) {
        return match;
      }
      
      // Si on est dans un attribut HTML, ne pas remplacer
      if (lastOpenTag > lastCloseTag) {
        return match;
      }
      
      modified = true;
      return match.replace(from, to);
    });
  });

  return { content: newContent, modified };
}

function fixFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: newContent, modified } = fixApostrophes(content);
    
    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Corrigé: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Erreur avec ${filePath}:`, error.message);
    return false;
  }
}

// Approche manuelle pour les fichiers spécifiques avec erreurs
const specificFixes = {
  // Remplacer les apostrophes dans les chaînes JSX spécifiques
  fixInJsxText: (content) => {
    let modified = false;
    let newContent = content;
    
    // Liste des remplacements spécifiques basés sur les erreurs du build
    const replacements = [
      // Apostrophes
      { from: /(>[^<{]*?)([a-zA-ZÀ-ÖØ-öø-ÿ])'([a-zA-ZÀ-ÖØ-öø-ÿ][^<{]*?)(<|{)/g, to: (match, before, char1, after, end) => {
        if (before.includes('&apos;') || before.includes('{') || before.includes('=')) return match;
        modified = true;
        return `${before}${char1}&apos;${after}${end}`;
      }},
      // Guillemets dans le texte
      { from: /(>[^<{]*?)"([^<{]*?)(<|{)/g, to: (match, before, after, end) => {
        if (before.includes('&quot;') || before.includes('{') || before.includes('=')) return match;
        modified = true;
        return `${before}&quot;${after}${end}`;
      }},
    ];
    
    replacements.forEach(({ from, to }) => {
      newContent = newContent.replace(from, to);
    });
    
    return { content: newContent, modified };
  }
};

function main() {
  console.log('🔧 Correction des apostrophes et guillemets dans JSX...\n');
  
  const appDir = path.join(__dirname, '..', 'app');
  const files = findTsxFiles(appDir);
  
  let fixedCount = 0;
  
  files.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;
      
      // Remplacer les apostrophes courantes dans le texte JSX
      const apostrophePatterns = [
        /L'([a-z])/gi,
        /l'([a-z])/gi,
        /d'([a-z])/gi,
        /n'([a-z])/gi,
        /s'([a-z])/gi,
        /c'([a-z])/gi,
        /j'([a-z])/gi,
        /m'([a-z])/gi,
        /t'([a-z])/gi,
        /qu'([a-z])/gi,
      ];
      
      // Remplacer seulement dans le texte JSX (entre > et <, mais pas dans les attributs ou expressions)
      const lines = content.split('\n');
      const newLines = lines.map((line, lineIndex) => {
        // Ignorer les commentaires
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) {
          return line;
        }
        
        let newLine = line;
        let lineModified = false;
        
        // Chercher les patterns de texte JSX avec apostrophes
        // Pattern: >texte avec l'apostrophe<
        const jsxTextPattern = />([^<{]*?)([a-zA-ZÀ-ÖØ-öø-ÿ])'([a-zA-ZÀ-ÖØ-öø-ÿ][^<{]*?)(<|{)/g;
        newLine = newLine.replace(jsxTextPattern, (match, before, char1, after, end) => {
          // Vérifier qu'on n'est pas dans une expression JS ou un attribut
          const beforeMatch = line.substring(0, line.indexOf(match));
          if (beforeMatch.includes('{') && !beforeMatch.includes('}') || beforeMatch.includes('=')) {
            return match;
          }
          lineModified = true;
          modified = true;
          return `>${before}${char1}&apos;${after}${end}`;
        });
        
        // Chercher les guillemets dans le texte JSX
        const jsxQuotePattern = />([^<{]*?)"([^<{]*?)(<|{)/g;
        newLine = newLine.replace(jsxQuotePattern, (match, before, after, end) => {
          const beforeMatch = line.substring(0, line.indexOf(match));
          if (beforeMatch.includes('{') && !beforeMatch.includes('}') || beforeMatch.includes('=') || beforeMatch.includes('&quot;')) {
            return match;
          }
          lineModified = true;
          modified = true;
          return `>${before}&quot;${after}${end}`;
        });
        
        return newLine;
      });
      
      if (modified) {
        fs.writeFileSync(file, newLines.join('\n'), 'utf8');
        console.log(`✅ Corrigé: ${file}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Erreur avec ${file}:`, error.message);
    }
  });
  
  console.log(`\n✅ ${fixedCount} fichier(s) corrigé(s)`);
}

main();

