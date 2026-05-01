function showWelcome() {
  console.log(`

    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║   OpenMix CLI - Asistente de Automatización v1.0.0        ║
    ║ ********************************************************* ║
    ║   Comandos disponibles:                                   ║
    ║                                                           ║
    ║    VALIDAR ESTRUCTURA:                                    ║
    ║     • npm run validate           - Modo interactivo       ║
    ║     • npm run validate <ruta>    - Validar específica     ║
    ║  • npm run validate -- i     - Validar ruta por defecto   ║
    ║                                                           ║
    ║      AJUSTAR ESTRUCTURA:                                  ║
    ║     • npm run fix -- <modulo>   - Ajustar estructura      ║
    ║       (> npm run fix -- acc)                              ║
    ║                                                           ║
    ║    CLONAR ARCHIVOS:                                       ║
    ║     • npm run clone <origen> <dest> --directory           ║
    ║                                                           ║
    ║        ACTUALIZAR ZUN:                                    ║
    ║     • npm run act -- acc     - Valida y actualiza ZUN     ║
    ║                                                           ║
    ║   Pasos para actualizar ZUN:                              ║
    ║     1. npm run fix -- acc     (Ajustar estructura)        ║
    ║     2. npm run act -- acc     (Clonar recursos)           ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝

  `);
}

showWelcome();
