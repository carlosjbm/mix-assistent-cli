const fs = require("fs");
const path = require("path");

const styles = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  dim: "\x1b[2m",
};

function normalizePath(inputPath) {
  if (!inputPath) return inputPath;
  let normalized = inputPath.trim();
  if (process.platform === "win32") {
    normalized = normalized.replace(/\//g, "\\");
  }
  return path.normalize(normalized);
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
  console.log(`  ${styles.green}✓${styles.reset} ${path.basename(sourcePath)}`);
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
      console.log(`  ${styles.green}✓${styles.reset} ${item}`);
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
    console.error(`${styles.red}Error al clonar: ${error.message}${styles.reset}`);
    return false;
  }
}

function main() {
  const source = process.argv[2];
  const destination = process.argv[3];

  if (!source || !destination) {
    console.error(
      `${styles.red}Uso: node cloneFiles.js <origen> <destino> [--directory]${styles.reset}`
    );
    process.exit(1);
  }

  const isDirectory = process.argv.includes("--directory");

  console.log(`\n${styles.blue}Clonando de:${styles.reset} ${source}`);
  console.log(`${styles.blue}Hacia:${styles.reset} ${destination}\n`);

  if (cloneFiles(source, destination, isDirectory)) {
    console.log(`\n${styles.green}✓ Clonación completada.${styles.reset}\n`);
  } else {
    console.log(`\n${styles.red}✗ Error en la clonación.${styles.reset}\n`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { cloneFile, cloneDirectory, cloneFiles };