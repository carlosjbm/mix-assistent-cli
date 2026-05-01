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
    ║     • npm run validate <ruta>   - Validar específica     ║
    ║     • npm run validate -- i     - Validar ruta por defecto ║
    ║                                                           ║
    ║      AJUSTAR ESTRUCTURA:                                  ║
    ║     • npm run fix -- <modulo>   - Ajustar estructura      ║
    ║       (acc, pms, sma)                                  ║
    ║                                                           ║
    ║    CLONAR ARCHIVOS:                                       ║
    ║     • npm run clone <origen> <dest> --directory          ║
    ║                                                           ║
    ║        ACTUALIZAR ZUN:                                    ║
    ║     • npm run act -- <modulo>   - Valida y actualiza       ║
    ║       (acc, pms, sma)                                  ║
    ║                                                           ║
    ║    MÓDULOS INSTALADOS:                                   ║
    ║     • npm run installed       - Ver módulos instalados   ║
    ║                                                           ║
    ║   Módulos ZUN disponibles:                             ║
    ║     • acc  - ZunAccess                               ║
    ║     • pms  - ZunPMS                                 ║
    ║     • sma  - ZunSMA                                 ║
    ║                                                           ║
    ║   Flujo de actualización:                            ║
    ║     1. npm run fix -- <modulo>  (Ajustar estructura)         ║
    ║     2. npm run act -- <modulo>  (Clonar recursos)            ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝

  `);
}

showWelcome();
