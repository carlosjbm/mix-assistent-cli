#! /usr/bin/env node
const path = require("path");
const fs = require("fs");
const { startInteractive } = require("./services/interactiveCLI");

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf-8"),
);

const styles = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  white: "\x1b[37m",
};

function showWelcome() {
  console.log(`
${styles.cyan}   ╔══════════════════════════════════════════╗
   ║${styles.reset}${styles.bold}${styles.white}            OPENMIX CLI             ${styles.reset}${styles.cyan}      ║
   ║${styles.reset}                                          ${styles.cyan}║
   ║${styles.reset}  ${styles.green}v${pkg.version}${styles.reset}${styles.dim} Asistente de automatizacion ZUN${styles.reset}  ${styles.cyan}║
   ╚══════════════════════════════════════════╝${styles.reset}

${styles.dim}   Escriba${styles.reset} ${styles.cyan}help${styles.reset} ${styles.dim}para ver todos los comandos disponibles${styles.reset}
${styles.dim}   Ej:${styles.reset} ${styles.cyan}help validate${styles.reset} ${styles.dim}— ayuda de un comando especifico${styles.reset}
`);
}

showWelcome();
startInteractive();
