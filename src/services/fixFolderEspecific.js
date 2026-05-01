const { adjustStructure } = require("../utils/adjustStructure");
const path = require("path");

const folders = {
  acc: "C:/Users/Carlinhos/Desktop/GET/ZunAcc",
};

const styles = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
};

function printHeader(title) {
  console.log(`\n${styles.bold}${styles.blue}${"=".repeat(50)}${styles.reset}`);
  console.log(`${styles.bold}${styles.blue}${title}${styles.reset}`);
  console.log(`${styles.bold}${styles.blue}${"=".repeat(50)}${styles.reset}\n`);
}

function printSuccess(msg) {
  console.log(`${styles.green}✓ ${msg}${styles.reset}`);
}

function printError(msg) {
  console.log(`${styles.red}✗ ${msg}${styles.reset}`);
}

function printWarning(msg) {
  console.log(`${styles.yellow}⚠ ${msg}${styles.reset}`);
}

function printInfo(msg) {
  console.log(`${styles.blue}ℹ ${msg}${styles.reset}`);
}

const fixFolder = () => {
  const arg = process.argv[2];
  const folderPath = folders[arg];

  if (!arg) {
    printHeader("FIX - Ajuste de Estructura");
    console.log(`${styles.bold}Uso:${styles.reset} npm run fix -- <modulo>`);
    console.log(`${styles.dim}Módulos disponibles:${styles.reset}`);
    Object.keys(folders).forEach((key) => console.log(`  ${styles.blue}→ ${key}${styles.reset}`));
    console.log();
    return;
  }

  if (!folderPath) {
    printError(`Módulo no reconocido: ${arg}`);
    console.log(`${styles.dim}Módulos disponibles:${styles.reset}`);
    Object.keys(folders).forEach((key) => console.log(`  ${styles.blue}→ ${key}${styles.reset}`));
    return;
  }

  const structureFile = arg + "_folder_structure.md";
  const structureFilePath = path.join(process.cwd(), structureFile);

  printHeader("FIX - Ajuste de Estructura");
  printSuccess(`Módulo: ${arg}`);
  console.log(`${styles.dim}Ruta: ${folderPath}${styles.reset}\n`);

  printInfo("Ajustando estructura...");
  try {
    adjustStructure(folderPath, structureFilePath);
    printSuccess("Estructura ajustada correctamente.");
  } catch (error) {
    printError(`Error al ajustar: ${error.message}`);
  }
};

fixFolder();
