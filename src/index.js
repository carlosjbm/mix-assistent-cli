#! /usr/bin/env node
const { startInteractive } = require("./services/interactiveCLI");

function showWelcome() {
  const styles = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
  };

  console.log(`

    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║   OpenMix CLI - Asistente de Automatización v1.0.0        ║
    ║ ********************************************************* ║
    ║   Escribe un comando o usa los atajos:                    ║
    ║                                                           ║
    ║    VALIDAR ESTRUCTURA:                                    ║
    ║     • validate           - Modo interactivo               ║
    ║     • validate <ruta>   - Validar específica              ║
    ║     • validate -- i     - Validar ruta por defecto        ║
    ║                                                           ║
    ║      AJUSTAR ESTRUCTURA:                                  ║
    ║     • fix -- <modulo>   - Ajustar estructura              ║
    ║       (acc, pms, st)                                      ║
    ║                                                           ║
    ║    CLONAR ARCHIVOS:                                       ║
    ║     • clone <origen> <dest> --directory                   ║
    ║                                                           ║
    ║        ACTUALIZAR ZUN:                                    ║
    ║     • act -- <modulo>   - Valida y actualiza              ║
    ║       (acc, pms, sma)                                     ║
    ║                                                           ║
║    MÓDULOS INSTALADOS:                                    ║
     ║     • installed       - Ver módulos instalados            ║
     ║     • adjust         - Crear carpetas faltantes           ║
     ║                                                           ║
     ║    INFORMACIÓN DE VERSIÓN:                               ║
     ║     • versioninfo <ruta> - Ver versión de exe             ║
     ║     • versioninfo --acc  - Ver versión ZunAcc             ║
     ║     • versioninfo --pms  - Ver versión ZunPms            ║
     ║     • versioninfo --st   - Ver versión ZunStock           ║
     ║                                                           ║
    ║   Teclea para ver autocompletado.                         ║
    ║   ESPACIO ESPACIO muestra sugerencias.                    ║
    ║   ↑↓ navega, ENTER ejecuta.                               ║
    ║   ESC limpia sugerencias, CTRL+C sale.                    ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝

  `);
}

showWelcome();
startInteractive();
