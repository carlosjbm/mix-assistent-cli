#! /usr/bin/env node
const path = require('path');
const fs = require('fs');

const pkgPath = path.join(__dirname, '..', '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

const styles = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
};

function showVersion() {
  console.log(`
${styles.bold}${styles.blue}════════════════════════════════════════════════════════════${styles.reset}
${styles.bold}  OpenMix ZUN - Información de versión${styles.reset}
${styles.blue}════════════════════════════════════════════════════════════${styles.reset}

  ${styles.green}Versión:${styles.reset}    ${styles.bold}${pkg.version}${styles.reset}
  ${styles.green}Módulos:${styles.reset}   acc | pms | st

${styles.blue}────────────────────────────────────────────────────────────────${styles.reset}

  ${styles.dim}Comandos disponibles:${styles.reset}
    openmix              Modo interactivo
    openmix-validate     Validar estructura de carpetas
    openmix-fix          Ajustar estructura
    openmix-act          Actualizar módulo ZUN
    openmix-back         Crear backup de modulo
    openmix-versioninfo  Ver info de ejecutable
    openmix-installed    Ver módulos instalados
    openmix-clone        Clonar archivos/directorios

${styles.blue}════════════════════════════════════════════════════════════${styles.reset}
`);
}

showVersion();