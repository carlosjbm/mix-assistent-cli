#! /usr/bin/env node
const path = require("path");
const fs = require("fs");

const pkgPath = path.join(__dirname, "..", "..", "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

const styles = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
};

function showVersion() {
  console.log(`
${styles.bold}${styles.blue}════════════════════════════════════════════════════════════${styles.reset}
${styles.bold}  OpenMix CLI - Información de versión${styles.reset}
${styles.blue}════════════════════════════════════════════════════════════${styles.reset}

  ${styles.green}Versión:${styles.reset}    ${styles.bold}${pkg.version}${styles.reset}
  ${styles.green}Módulos:${styles.reset}   acc | pms | st | cc | aft | ut 

${styles.blue}────────────────────────────────────────────────────────────${styles.reset}

  ${styles.dim}Comandos disponibles:${styles.reset}
    openmix              Modo interactivo
    opx-validate     Validar estructura de carpetas
    opx-fix          Ajustar estructura
    opx-act          Actualizar módulo ZUN
    opx-back         Crear backup de modulo
    opx-versioninfo  Ver info de ejecutable
    opx-installed    Ver módulos instalados
    opx-clone        Clonar archivos/directorios

${styles.blue}════════════════════════════════════════════════════════════${styles.reset}
`);
}

showVersion();
