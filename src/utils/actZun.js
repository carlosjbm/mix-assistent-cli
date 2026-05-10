#! /usr/bin/env node
const path = require("path");
const { cloneFiles } = require("../services/cloneFiles");
const { validateStructure } = require("./validateStructure");
const paths = require("../config/paths");

const modules = {
  acc: {
    //destPath: "C:/Program Files (x86)/GET/ZUN Software/ZUN acc",
    // sourcePath: "D:/.resources/ZUN acc",
    destPath: `${paths.zun.acc.dest}`,
    sourcePath: `${paths.zun.resourcesBase}/ZUN acc`,
  },
  pms: {
    //destPath: "C:/Program Files (x86)/GET/Zun Software/ZUN pms",
    // sourcePath: "D:/.resources/ZUNpms",
    destPath: `${paths.zun.pms.dest}`,
    sourcePath: `${paths.zun.resourcesBase}/ZUN pms`,
  },
  st: {
    //destPath: "C:/Program Files (x86)/GET/ZUN Software/ZUNStock",
    // sourcePath: "D:/.resources/ZUNStock",
    destPath: `${paths.zun.st.dest}`,
    sourcePath: `${paths.zun.resourcesBase}/ZUNStock`,
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

function printInfo(msg) {
  console.log(`${styles.dim}${msg}${styles.reset}`);
}

function printWarning(msg) {
  console.log(`${styles.yellow}⚠ ${msg}${styles.reset}`);
}

const updateModule = (moduleKey) => {
  const module = modules[moduleKey];
  if (!module) {
    printError(`Módulo no reconocido: ${moduleKey}`);
    console.log(`${styles.dim}Módulos disponibles:${styles.reset}`);
    Object.keys(modules).forEach((key) =>
      console.log(`  ${styles.blue}→ ${key}${styles.reset}`),
    );
    return;
  }

  const structureFilePath = paths.structure[moduleKey];

  printHeader(`ZUN - Actualización de ${moduleKey.toUpperCase()}`);
  printInfo(`Origen: ${module.sourcePath}`);
  printInfo(`Destino: ${module.destPath}\n`);

  const result = validateStructure(module.destPath, structureFilePath);

  // if (!result.isValid) {
  //   printError("La estructura no es válida.");
  //   console.log(`${styles.yellow}Carpetas faltantes:${styles.reset}`);
  //   result.missing.forEach((item) =>
  //     console.log(`  ${styles.red}→ ${item}${styles.reset}`),
  //   );
  //   printWarning(`Ajuste la estructura primero: npm run fix -- ${moduleKey}`);
  //   return;
  // }

  printSuccess("Estructura validada correctamente.");
  console.log(`${styles.blue}Iniciando clonación...${styles.reset}\n`);
  const response = cloneFiles(module.sourcePath, module.destPath, true);
  if (!response) {
    printError(
      `No se pudo realizar la ctualizacion de ${moduleKey.toUpperCase()}.`,
    );
    return;
  }
  printSuccess(`Actualización de ${moduleKey.toUpperCase()} completada.`);
};

const actZun = () => {
  const arg = process.argv[2];

  if (!arg) {
    printHeader("ZUN - Actualizador de Recursos");
    console.log(`${styles.bold}Uso:${styles.reset} npm run act -- <modulo>`);
    console.log(`${styles.dim}Módulos disponibles:${styles.reset}`);
    Object.keys(modules).forEach((key) =>
      console.log(`  ${styles.blue}→ ${key}${styles.reset}`),
    );
    console.log();
    return;
  }

  updateModule(arg);
};

actZun();
