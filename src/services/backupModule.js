#! /usr/bin/env node
const fs = require("fs");
const path = require("path");
const paths = require("../config/paths");

const modules = {
  acc: paths.zun.acc.dest,
  pms: paths.zun.pms.dest,
  st: paths.zun.st.dest,
  cc: paths.zun.cc.dest,
  // aft: paths.zun.aft.dest,
  ut: paths.zun.ut.dest,
};

const styles = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
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
  console.log(`${styles.blue}ℹ ${msg}${styles.reset}`);
}

function countFiles(src) {
  let count = 0;
  const items = fs.readdirSync(src);
  for (const item of items) {
    const itemPath = path.join(src, item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      count += countFiles(itemPath);
    } else {
      count++;
    }
  }
  return count;
}

function copyDirRecursive(src, dest, total, copied, onProgress) {
  fs.mkdirSync(dest, { recursive: true });
  const items = fs.readdirSync(src);

  for (const item of items) {
    if (item === "recicle") continue;

    const srcItem = path.join(src, item);
    const destItem = path.join(dest, item);
    const stat = fs.statSync(srcItem);

    if (stat.isDirectory()) {
      copyDirRecursive(srcItem, destItem, total, copied, onProgress);
    } else {
      fs.copyFileSync(srcItem, destItem);
      copied.count++;
      onProgress(copied.count, total);
    }
  }
}

function drawProgressBar(current, total, width = 30) {
  const percent = Math.floor((current / total) * 100);
  const filled = Math.floor((current / total) * width);
  const empty = width - filled;

  const bar = `${styles.green}${"█".repeat(filled)}${styles.dim}${"░".repeat(empty)}${styles.reset}`;
  const percentStr = `${styles.bold}${styles.cyan}${String(percent).padStart(3)}%${styles.reset}`;

  process.stdout.write(`\r  ${bar} ${percentStr} (${current}/${total})`);
  if (current === total) {
    console.log("");
  }
}

async function backupModule(moduleArg) {
  if (!moduleArg) {
    printHeader("BACKUP - Copia de Seguridad ZUN");
    console.log(`${styles.bold}Uso:${styles.reset} openmix-back <modulo>`);
    console.log(`${styles.dim}Módulos disponibles:${styles.reset}`);
    Object.keys(modules).forEach((key) =>
      console.log(`  ${styles.blue}→ ${key}${styles.reset}`),
    );
    console.log();
    return;
  }

  const modulePath = modules[moduleArg].replace(/\//g, "\\");
  const backupPath = path.join(modulePath, "recicle");

  printHeader("BACKUP - Copia de Seguridad ZUN");
  printSuccess(`Módulo: ${moduleArg.toUpperCase()}`);
  console.log(`${styles.blue}Origen:${styles.reset} ${modulePath}`);
  console.log(`${styles.blue}Destino:${styles.reset} ${backupPath}\n`);

  if (!fs.existsSync(modulePath)) {
    printError(`El directorio origen no existe: ${modulePath}`);
    return;
  }

  if (fs.existsSync(backupPath)) {
    fs.rmSync(backupPath, { recursive: true, force: true });
    printInfo("Carpeta recicle anterior eliminada.\n");
  }

  const totalFiles = countFiles(modulePath);
  console.log(
    `${styles.blue}Archivos a copiar:${styles.reset} ${totalFiles}\n`,
  );
  console.log(`${styles.bold}${styles.blue}Progreso:${styles.reset}`);

  const copied = { count: 0 };

  try {
    copyDirRecursive(
      modulePath,
      backupPath,
      totalFiles,
      copied,
      (current, total) => {
        drawProgressBar(current, total);
      },
    );
    printSuccess("Backup creado exitosamente.");
    console.log(
      `${styles.blue}Puedes encontrar la copia de respardo en:${styles.reset} ${backupPath}\n`,
    );
  } catch (error) {
    console.log();
    printError(`Error al crear backup: ${error.message}`);
  }
}

const main = async () => {
  const moduleArg = process.argv[2];
  await backupModule(moduleArg);
};

main();
