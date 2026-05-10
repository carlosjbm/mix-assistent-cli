const commands = [
  {
    name: "start",
    description: "Verificar estructura desde la raíz del proyecto",
    usage: "npm start",
  },
  {
    name: "test",
    description: "Ejecutar pruebas",
    usage: "npm test",
  },
  {
    name: "validate",
    description: "Modo interactivo de validación",
    usage: "npm run validate",
  },
  {
    name: "validate <ruta>",
    description: "Validar carpeta específica",
    usage: "npm run validate /ruta/del/proyecto",
  },
  {
    name: "validate -- i",
    description: "Validar ruta por defecto",
    usage: "npm run validate -- i",
  },
  {
    name: "fix -- <modulo>",
    description: "Ajustar estructura de un módulo específico (acc, pms, sma)",
    usage: "npm run fix -- acc",
  },
  {
    name: "act -- <modulo>",
    description: "Actualizar recursos ZUN de un módulo (acc, pms, sma)",
    usage: "npm run act -- acc",
  },
  {
    name: "clone <origen> <dest>",
    description: "Clonar archivo a otra ubicación",
    usage: "npm run clone -- origen.txt destino.txt",
  },
  {
    name: "clone <origen> <dest> --directory",
    description: "Clonar directorio completo",
    usage: "npm run clone -- /ruta/origen /ruta/destino --directory",
  },
  {
    name: "installed",
    description: "Ver módulos ZUN instalados",
    usage: "npm run installed",
  },
  {
    name: "adjust",
    description: "Crear carpetas faltantes en la estructura",
    usage: "npm run adjust",
  },
  {
    name: "versioninfo <ruta>",
    description: "Ver información de versión de un ejecutable",
    usage: "openmix-versioninfo \"C:/ruta/al/ejecutable.exe\"",
  },
  {
    name: "versioninfo --acc",
    description: "Ver versión de ZunAcc (Proton VPN)",
    usage: "openmix-versioninfo --acc",
  },
  {
    name: "versioninfo --pms",
    description: "Ver versión de ZunPms (Proton VPN)",
    usage: "openmix-versioninfo --pms",
  },
  {
    name: "versioninfo --st",
    description: "Ver versión de ZunStock (Proton VPN)",
    usage: "openmix-versioninfo --st",
  },
  {
    name: "help",
    description: "Mostrar ayuda de comandos",
    usage: "help [comando]",
  },
  {
    name: "help <comando>",
    description: "Mostrar ayuda de un comando específico",
    usage: "help validate",
  },
  {
    name: "version",
    description: "Ver la versión de OpenMix instalada",
    usage: "version",
  },
];

function getCommands() {
  return commands;
}

function searchCommands(query) {
  if (!query) return commands;

  const lowerQuery = query.toLowerCase();
  return commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(lowerQuery) ||
      cmd.description.toLowerCase().includes(lowerQuery)
  );
}

function getCommandNames() {
  return commands.map((cmd) => cmd.name);
}

function autoComplete(input) {
  if (!input) {
    return commands.map((cmd) => ({ name: cmd.name, description: cmd.description }));
  }

  const lowerQuery = input.toLowerCase();
  const results = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(lowerQuery) ||
      cmd.description.toLowerCase().includes(lowerQuery)
  );
  return results.map((cmd) => ({ name: cmd.name, description: cmd.description }));
}

function main() {
  const input = process.argv[2] || "";
  const results = autoComplete(input);

  if (results.length === 0) {
    console.log("No se encontraron comandos que coincidan.");
    process.exit(1);
  }

  console.log("\nComandos disponibles:\n");
  results.forEach((cmd) => console.log(`  ${cmd}`));
  console.log("");
}

if (require.main === module) {
  main();
}

module.exports = {
  commands,
  getCommands,
  searchCommands,
  getCommandNames,
  autoComplete,
};