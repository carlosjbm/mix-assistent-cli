#! /usr/bin/env node
const { startInteractive } = require("./services/interactiveCLI");

function showWelcome() {
  const styles = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    dim: "\x1b[2m",
  };

  console.log(`

    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║   OpenMix CLI - Asistente de Automatizacion              ║
    ║ ========================================================= ║
    ║                                                           ║
    ║   Bienvenido a OpenMix!                                  ║
    ║   Tu asistente para automatizar tareas del soporte ZUN    ║
    ║                                                           ║
    ║   Para ver todos los comandos disponibles:               ║
    ║     ${styles.cyan}help${styles.reset}                                              ║
    ║                                                           ║
    ║   Para ayuda especifica de un comando:                   ║
    ║     ${styles.cyan}help <comando>${styles.reset}                                  ║
    ║     Ejemplo: ${styles.dim}help validate${styles.reset}                          ║
    ║                                                           ║
    ║ ********************************************************* ║
    ║   Escribe un comando y presiona ENTER                    ║
    ║   ESPACIO ESPACIO muestra sugerencias                    ║
    ║   ESC limpia sugerencias, CTRL+C sale                    ║
    ║ ********************************************************* ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝

  `);
}

showWelcome();
startInteractive();