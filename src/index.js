function showWelcome() {
  console.log(`

    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║   Validación de Estructura de Carpetas                    ║
    ║                                                           ║
    ║   Comandos disponibles:                                   ║
    ║     • npm run validate           - Modo interactivo       ║
    ║     • npm run validate <ruta>    - Validar específica     ║
    ║     • npm run validate <ruta> <md> - Con archivo MD       ║
    ║     • npm run clone <origen> <dest> - Clonar archivo      ║
    ║  • npm run clone <origen> <dest> --directory - Directorio ║
    ║                                                           ║
    ║   El sistema comparará la estructura contra               ║
    ║   un archivo 'structure.md' en la carpeta objetivo.       ║
    ║   Compatible con rutas usando / o \\                      ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝

  `);
}

showWelcome();
