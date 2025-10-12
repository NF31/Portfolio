const fs = require('fs');
const path = require('path');

// Tous les fichiers restants à nettoyer
const filesToClean = [
  'app/(admin)/admin-projects/components/ProjectsTable.tsx',
  'app/(admin)/admin-images/components/ImagesTable.tsx',
  'app/(admin)/admin-skills/edit/[id]/page.tsx',
  'app/(admin)/admin-services/edit/[id]/page.tsx',
  'app/(admin)/admin-projects/edit/[id]/page.tsx',
  'app/(admin)/admin-images/edit/[id]/page.tsx',
];

let totalChanges = 0;

filesToClean.forEach((filePath) => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⏭️  Skipping ${filePath}`);
      return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;

    // 1. NETTOYER les classes dupliquées (règles strictes)
    
    // Nettoyer px dupliqués
    content = content.replace(
      /className="([^"]*px-6[^"]*px-4 sm:px-6[^"]*)"/g,
      'className="$1 px-4 sm:px-6"'
    );
    
    // Nettoyer py dupliqués  
    content = content.replace(
      /className="([^"]*py-4[^"]*py-3 sm:py-4[^"]*)"/g,
      'className="$1 py-3 sm:py-4"'
    );
    
    // Nettoyer text dupliqués
    content = content.replace(
      /className="([^"]*text-sm[^"]*text-xs sm:text-sm[^"]*)"/g,
      'className="$1 text-xs sm:text-sm"'
    );
    
    // Nettoyer grid dupliqués
    content = content.replace(
      /className="([^"]*grid-cols-12[^"]*grid-cols-1 sm:grid-cols-2 lg:grid-cols-12[^"]*)"/g,
      'className="$1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12"'
    );
    
    // Nettoyer gap dupliqués
    content = content.replace(
      /className="([^"]*gap-4[^"]*gap-2 sm:gap-4[^"]*)"/g,
      'className="$1 gap-2 sm:gap-4"'
    );
    
    // Nettoyer col-span dupliqués
    content = content.replace(
      /className="([^"]*col-span-3[^"]*col-span-1 sm:col-span-2 lg:col-span-3[^"]*)"/g,
      'className="$1 col-span-1 sm:col-span-2 lg:col-span-3"'
    );
    content = content.replace(
      /className="([^"]*col-span-2[^"]*col-span-1 sm:col-span-2[^"]*)"/g,
      'className="$1 col-span-1 sm:col-span-2"'
    );
    
    // Nettoyer flex dupliqués
    content = content.replace(
      /className="([^"]*flex items-center[^"]*flex flex-col sm:flex-row items-start sm:items-center[^"]*)"/g,
      'className="$1 flex flex-col sm:flex-row items-start sm:items-center"'
    );
    
    // Nettoyer w-h dupliqués
    content = content.replace(
      /className="([^"]*w-12 h-12[^"]*w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12[^"]*)"/g,
      'className="$1 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"'
    );
    content = content.replace(
      /className="([^"]*w-10 h-10[^"]*w-8 h-8 sm:w-10 sm:h-10[^"]*)"/g,
      'className="$1 w-8 h-8 sm:w-10 sm:h-10"'
    );

    // 2. CORRIGER les containers responsive
    
    // Containers principaux
    content = content.replace(
      /className="([^"]*max-w-4xl mx-auto[^"]*)"/g,
      'className="max-w-full sm:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"'
    );
    
    // Grids de formulaires
    content = content.replace(
      /className="([^"]*grid grid-cols-1 md:grid-cols-2[^"]*)"/g,
      'className="grid grid-cols-1 sm:grid-cols-2 gap-4"'
    );

    // 3. CORRIGER les inputs responsive
    
    // Inputs avec min-w-0
    content = content.replace(
      /className="([^"]*w-full px-3 py-2[^"]*bg-white dark:bg-gray-700[^"]*)"/g,
      'className="$1 min-w-0"'
    );
    
    // Textareas avec resize
    content = content.replace(
      /className="([^"]*w-full px-3 py-2[^"]*bg-white dark:bg-gray-700[^"]*textarea[^"]*)"/g,
      'className="$1 min-w-0 resize-none sm:resize-y"'
    );

    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ ${filePath} - CLEANED all duplicates`);
      totalChanges++;
    } else {
      console.log(`⏭️  ${filePath} - No changes needed`);
    }
  } catch (error) {
    console.error(`❌ Error: ${filePath}:`, error.message);
  }
});

console.log(`\n🎉 Done! ${totalChanges} files CLEANED of all duplicates`);


