#! /usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const styles = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
};

const backupPathDefault = "C:/Program Files (x86)/GET/Zun Software/backups";

const moduleConfig = {
  acc: { db: "ZunAcc" },
  pms: { db: "ZunPms" },
  st: { db: "ZunStock" },
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

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function getBackupPath(module, customPath) {
  if (customPath) {
    return customPath;
  }

  let finalPath = backupPathDefault;

  if (!fs.existsSync(finalPath)) {
    fs.mkdirSync(finalPath, { recursive: true });
  }

  return finalPath;
}

function checkSqlCmd() {
  try {
    execSync("sqlcmd -?", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function backupDatabase(module, bakPath, dbName) {
  const sql = `BACKUP DATABASE [${dbName}] TO DISK = N'${bakPath}' WITH NOFORMAT, NOINIT, NAME = N'${dbName}-Full Backup', SKIP, NOREWIND, NOUNLOAD`;

  try {
    console.log(`${styles.dim}Ejecutando: sqlcmd -Q "${sql}"${styles.reset}\n`);
    execSync(`sqlcmd -E -S localhost -Q "${sql}"`, { stdio: "inherit" });
    return true;
  } catch (error) {
    throw new Error(`Error al ejecutar backup: ${error.message}`);
  }
}

async function main() {
  const arg = process.argv[2];
  const customBakPath = process.argv[3];

  if (!checkSqlCmd()) {
    printError("sqlcmd no encontrado. Asegúrese de tener SQL Server Tools instalado.");
    printInfo("Ruta esperada: C:/Program Files/Microsoft SQL Server/...");
    process.exit(1);
  }

  let moduleKey;

  if (!arg) {
    printHeader("BACKUP - SQL Server Database");

    printInfo("Módulos disponibles:");
    Object.keys(moduleConfig).forEach((key, index) => {
      const config = moduleConfig[key];
      console.log(
        `  ${styles.blue}${index + 1})${styles.reset} ${styles.green}${key.toUpperCase()}${styles.reset} - ${config.db}`,
      );
    });

    const rl = createInterface();
    const answer = await askQuestion(
      rl,
      `\n${styles.blue}Seleccione módulo (1-${Object.keys(moduleConfig).length}): ${styles.reset}`,
    );
    rl.close();

    const index = parseInt(answer) - 1;
    moduleKey = Object.keys(moduleConfig)[index];

    if (!moduleKey) {
      printError("Opción no válida.");
      process.exit(1);
    }
  } else {
    moduleKey = arg.startsWith("--") ? arg.substring(2) : arg;
  }

  const config = moduleConfig[moduleKey];

  if (!config) {
    printError(`Módulo no reconocido: ${moduleKey}`);
    console.log(`${styles.dim}Módulos disponibles:${styles.reset}`);
    Object.keys(moduleConfig).forEach((key) =>
      console.log(`  ${styles.blue}→ ${key}${styles.reset}`),
    );
    process.exit(1);
  }

  printHeader("BACKUP - SQL Server Database");
  printSuccess(`Módulo: ${moduleKey.toUpperCase()}`);
  printInfo(`Base de datos: ${config.db}`);

  const rl = createInterface();
  const bakFileName = await askQuestion(
    rl,
    `${styles.blue}Nombre del archivo de backup (sin extensión): ${styles.reset}`,
  );
  rl.close();

  if (!bakFileName) {
    printError("Debe proporcionar un nombre para el archivo.");
    process.exit(1);
  }

  if (!bakFileName.endsWith(".bak")) {
    bakFileName += ".bak";
  }

  const finalBackupPath = getBackupPath(moduleKey, customBakPath);
  const fullBakPath = path.join(finalBackupPath, bakFileName);

  console.log(`${styles.dim}Ubicación: ${fullBakPath}${styles.reset}\n`);

  printInfo("Iniciando backup...");

  try {
    backupDatabase(moduleKey, fullBakPath, config.db);
    printSuccess(`Backup completado: ${bakFileName}`);
  } catch (error) {
    printError(error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { backupDatabase, moduleConfig };