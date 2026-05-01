const fs = require("fs");
const path = require("path");

function normalizePath(inputPath) {
  if (!inputPath) return inputPath;
  return path.normalize(inputPath.replace(/[\\\/]+/g, path.sep));
}

function cloneFile(sourcePath, destPath) {
  sourcePath = normalizePath(sourcePath);
  destPath = normalizePath(destPath);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`El archivo origen no existe: ${sourcePath}`);
  }

  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copyFileSync(sourcePath, destPath);
  console.log(`  ✓ Copiado: ${path.basename(sourcePath)}`);
}

function cloneDirectory(sourcePath, destPath) {
  sourcePath = normalizePath(sourcePath);
  destPath = normalizePath(destPath);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`El directorio origen no existe: ${sourcePath}`);
  }

  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
  }

  const items = fs.readdirSync(sourcePath);

  for (const item of items) {
    const srcItem = path.join(sourcePath, item);
    const destItem = path.join(destPath, item);
    const stat = fs.statSync(srcItem);

    if (stat.isDirectory()) {
      cloneDirectory(srcItem, destItem);
    } else {
      fs.copyFileSync(srcItem, destItem);
      console.log(`  ✓ Copiado: ${item}`);
    }
  }
}

function cloneFiles(source, destination, isDirectory = false) {
  try {
    if (isDirectory) {
      cloneDirectory(source, destination);
    } else {
      cloneFile(source, destination);
    }
    return true;
  } catch (error) {
    console.error(`Error al clonar: ${error.message}`);
    return false;
  }
}

function main() {
  const source = process.argv[2];
  const destination = process.argv[3];

  if (!source || !destination) {
    console.error(
      "Uso: node cloneFiles.js <origen> <destino> [--directory]"
    );
    process.exit(1);
  }

  const isDirectory = process.argv.includes("--directory");

  console.log(`\nClonando de: ${source}`);
  console.log(`Hacia: ${destination}\n`);

  if (cloneFiles(source, destination, isDirectory)) {
    console.log("\n✓ Clonación completada.\n");
  } else {
    console.log("\n✗ Error en la clonación.\n");
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { cloneFile, cloneDirectory, cloneFiles };