const fs = require("fs");
const path = require("path");

const styles = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
};

const installPath = "C:/Program Files (x86)/GET/Zun Software";

function printHeader(title) {
  console.log(`\n${styles.bold}${styles.blue}${"=".repeat(60)}${styles.reset}`);
  console.log(`${styles.bold}${styles.blue}${title}${styles.reset}`);
  console.log(`${styles.bold}${styles.blue}${"=".repeat(60)}${styles.reset}\n`);
}

function printSuccess(msg) {
  console.log(`${styles.green}✓ ${msg}${styles.reset}`);
}

function printError(msg) {
  console.log(`${styles.red}✗ ${msg}${styles.reset}`);
}

function formatDate(date) {
  return date.toISOString().replace("T", " ").substring(0, 19);
}

function getInstalledModules() {
  if (!fs.existsSync(installPath)) {
    printError(`Ruta no encontrada: ${installPath}`);
    return [];
  }

  const items = fs.readdirSync(installPath);
  const modules = [];

  for (const item of items) {
    const fullPath = path.join(installPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      modules.push({
        name: item,
        path: fullPath,
        lastModified: stat.mtime,
      });
    }
  }

  return modules.sort((a, b) => b.lastModified - a.lastModified);
}

function showInstalledModules() {
  printHeader("Módulos ZUN Instalados");

  printInfo(`Ruta: ${installPath}\n`);

  const modules = getInstalledModules();

  if (modules.length === 0) {
    printWarning("No se encontraron módulos instalados.");
    console.log();
    return;
  }

  console.log(`${styles.bold}┌${"─".repeat(58)}┐${styles.reset}`);
  console.log(
    `${styles.bold}│${styles.reset} ${styles.blue}Módulo${styles.reset.padEnd(25)} ${styles.yellow}Última Modificación${styles.reset.padEnd(20)} ${styles.green}Estado${styles.reset}`,
  );
  console.log(`${styles.bold}├${"─".repeat(58)}┤${styles.reset}`);

  modules.forEach((mod) => {
    const name = mod.name.padEnd(25);
    const date = formatDate(mod.lastModified).padEnd(20);
    console.log(
      `${styles.bold}│${styles.reset} ${styles.green}${name}${styles.reset} ${styles.dim}${date}${styles.reset} ${styles.green}✓ Instalado${styles.reset}`,
    );
  });

  console.log(`${styles.bold}└${"─".repeat(58)}┘${styles.reset}`);

  console.log(`\n${styles.blue}Total: ${modules.length} módulo(s) encontrado(s).${styles.reset}\n`);
}

function printInfo(msg) {
  console.log(`${styles.blue}ℹ ${msg}${styles.reset}`);
}

function printWarning(msg) {
  console.log(`${styles.yellow}⚠ ${msg}${styles.reset}`);
}

showInstalledModules();