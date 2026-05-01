function showWelcome() {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                    OPENMIX - ASISTENTE CLI                ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║           Sistema de validación de estructura de          ║
║           estructura correcta de carpetas                 ║
║                                                           ║
║  Comandos disponibles:                                    ║
║    • npm run validate           - Modo interactivo        ║
║    • npm run validate <ruta>   - Validar ruta específica  ║
║    • npm run validate <ruta> <archivo> - Con archivo MD   ║
║                                                           ║
║  El sistema comparará la estructura actual contra         ║
║  un archivo 'structure.md' en la carpeta objetivo.        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);
}
showWelcome();
