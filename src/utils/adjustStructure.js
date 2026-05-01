const fs = require('fs');
const path = require('path');

function getExpectedStructure(structureFilePath) {
  if (!fs.existsSync(structureFilePath)) {
    throw new Error(`Archivo structure.md no encontrado en: ${structureFilePath}`);
  }
  
  const content = fs.readFileSync(structureFilePath, 'utf-8');
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.startsWith('#'));
}

function adjustStructure(targetPath, structureFilePath) {
  const expected = getExpectedStructure(structureFilePath);
  const created = [];
  
  for (const item of expected) {
    const fullPath = path.join(targetPath, item);
    
    if (item.endsWith('/')) {
      const dirPath = fullPath.slice(0, -1);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        created.push(item);
        console.log(`  ✓ Creado: ${item}`);
      }
    } else {
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, '');
        created.push(item);
        console.log(`  ✓ Creado: ${item}`);
      }
    }
  }
  
  return created;
}

async function main() {
  const targetPath = process.argv[2];
  const structureFilePath = process.argv[3] || path.join(targetPath, 'structure.md');
  
  if (!targetPath) {
    console.error('Uso: node adjustStructure.js <carpeta> [archivo-structure.md]');
    process.exit(1);
  }
  
  if (!fs.existsSync(targetPath)) {
    console.error(`Error: La carpeta '${targetPath}' no existe.`);
    process.exit(1);
  }
  
  console.log(`\nAjustando estructura en: ${targetPath}\n`);
  
  try {
    const created = adjustStructure(targetPath, structureFilePath);
    
    if (created.length > 0) {
      console.log(`\n✓ Se crearon ${created.length} elemento(s).\n`);
    } else {
      console.log('\n✓ La estructura ya está completa.\n');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { adjustStructure, getExpectedStructure };