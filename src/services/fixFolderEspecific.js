#! /usr/bin/env node
const { adjustStructure } = require("../utils/adjustStructure");
const path = require("path");

const folders = {
  acc: {
    path: "C:/Program Files (x86)/GET/ZUN Software/ZUN acc",
    structureFile: "opentest/folders_strs/acc_folder_structure.md",
  },
  pms: {
    path: "C:/Program Files (x86)/GET/ZUN Software/ZUN pms",
    structureFile: "opentest/folders_strs/pms_folder_structure.md",
  },
  st: {
    path: "C:/Program Files (x86)/GET/ZUN Software/ZUNStock",
    structureFile: "opentest/folders_strs/st_folder_structure.md",
  },
  cc: {
    path: "C:/Program Files (x86)/GET/ZUN Software/ZUNcc",
    structureFile: "opentest/folders_strs/cc_folder_structure.md",
  },
  // aft: {
  //   path: "C:/Program Files (x86)/GET/ZUN Software/ZUN aft",
  //   structureFile: "opentest/folders_strs/aft_folder_structure.md",
  // },
  ut: {
    path: "C:/Program Files (x86)/GET/ZUN Software/ZUNutiles",
    structureFile: "opentest/folders_strs/ut_folder_structure.md",
  },
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
  const module = folders[arg];

  if (!arg) {
    printHeader("FIX - Ajuste de Estructura");
    console.log(`${styles.bold}Uso:${styles.reset} npm run fix -- <modulo>`);
    console.log(`${styles.dim}Módulos disponibles:${styles.reset}`);
    Object.keys(folders).forEach((key) =>
      console.log(`  ${styles.blue}→ ${key}${styles.reset}`),
    );
    console.log();
    return;
  }

  if (!module) {
    printError(`Módulo no reconocido: ${arg}`);
    console.log(`${styles.dim}Módulos disponibles:${styles.reset}`);
    Object.keys(folders).forEach((key) =>
      console.log(`  ${styles.blue}→ ${key}${styles.reset}`),
    );
    return;
  }

  const structureFilePath = path.join(process.cwd(), module.structureFile);

  printHeader("FIX - Ajuste de Estructura");
  printSuccess(`Módulo: ${arg.toUpperCase()}`);
  console.log(`${styles.dim}Ruta: ${module.path}${styles.reset}\n`);

  printInfo("Ajustando estructura...");
  try {
    adjustStructure(module.path, structureFilePath);
    printSuccess("Estructura ajustada correctamente.");
  } catch (error) {
    printError(`Error al ajustar: ${error.message}`);
  }
};

fixFolder();
