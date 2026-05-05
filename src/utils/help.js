#! /usr/bin/env node

const commands = {
  validate: {
    name: "validate",
    description: "Valida la estructura de carpetas de un modulo ZUN",
    usage: [
      "validate",
      "validate <ruta>",
      "validate --i",
    ],
    examples: [
      "validate - Modo interactivo",
      "validate C:/ZunAcc - Validar ruta especifica",
      "validate --i - Validar instalacion por defecto",
    ],
    module: "validacion",
  },
  fix: {
    name: "fix",
    description: "Ajusta la estructura de carpetas faltantes",
    usage: [
      "fix -- <modulo>",
    ],
    examples: [
      "fix -- acc - Ajustar estructura de ZunAcc",
      "fix -- pms - Ajustar estructura de ZunPms",
      "fix -- st - Ajustar estructura de ZunStock",
    ],
    module: "estructura",
  },
  clone: {
    name: "clone",
    description: "Clona archivos de una carpeta a otra",
    usage: [
      "clone <origen> <dest> --directory",
    ],
    examples: [
      "clone C:/origen C:/dest - Clonar archivos",
      "clone C:/origen C:/dest --directory - Clonar incluyendo carpetas",
    ],
    module: "archivos",
  },
  act: {
    name: "act",
    description: "Actualiza recursos ZUN de un modulo",
    usage: [
      "act",
      "act -- <modulo>",
    ],
    examples: [
      "act - Ver modulos disponibles",
      "act -- acc - Actualizar ZunAcc",
      "act -- pms - Actualizar ZunPms",
      "act -- st - Actualizar ZunStock",
    ],
    module: "actualizacion",
  },
  installed: {
    name: "installed",
    description: "Muestra los modulos ZUN instalados",
    usage: [
      "installed",
    ],
    examples: [
      "installed - Ver lista de modulos instalados",
    ],
    module: "modulos",
  },
  versioninfo: {
    name: "versioninfo",
    description: "Muestra informacion de version de ejecutables",
    usage: [
      "versioninfo <ruta>",
      "versioninfo --acc",
      "versioninfo --pms",
      "versioninfo --st",
    ],
    examples: [
      "versioninfo C:/ZunAcc/ZunAcc.exe - Ver version de exe",
      "versioninfo --acc - Ver version de ZunAcc",
      "versioninfo --pms - Ver version de ZunPms",
      "versioninfo --st - Ver version de ZunStock",
    ],
    module: "informacion",
  },
  help: {
    name: "help",
    description: "Muestra la ayuda de comandos",
    usage: [
      "help",
      "help <comando>",
    ],
    examples: [
      "help - Ver todos los comandos",
      "help validate - Ver ayuda especifica de validate",
    ],
    module: "ayuda",
  },
};

const styles = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  underline: "\x1b[4m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

function s(style) {
  return styles[style] || "";
}

function printHeader(title) {
  const line = "=".repeat(60);
  console.log("\n" + s("bold") + s("blue") + line + s("reset"));
  console.log(s("bold") + s("blue") + title + s("reset"));
  console.log(s("bold") + s("blue") + line + s("reset") + "\n");
}

function printCommandHelp(cmd, filter) {
  const isFiltered = filter && cmd.name.toLowerCase() !== filter.toLowerCase();
  if (isFiltered && filter !== "all") return;

  console.log(s("bold") + s("cyan") + cmd.name + s("reset"));
  console.log(s("dim") + cmd.description + s("reset") + "\n");

  console.log(s("bold") + s("yellow") + "Uso:" + s("reset"));
  cmd.usage.forEach(function(u) {
    console.log("  " + s("green") + u + s("reset"));
  });

  console.log("\n" + s("bold") + s("yellow") + "Ejemplos:" + s("reset"));
  cmd.examples.forEach(function(e) {
    console.log("  " + s("dim") + e + s("reset"));
  });

  console.log("");
}

function showHelp(filter) {
  const filterLower = filter ? filter.toLowerCase() : null;

  if (!filterLower || filterLower === "all") {
    printHeader("OpenMix CLI - Ayuda de Comandos");

    console.log(s("bold") + "Uso:" + s("reset") + " npm run <comando> [opciones]");
    console.log(s("bold") + "Alias:" + s("reset") + " npx openmix-<comando> [opciones]\n");

    console.log(s("bold") + s("yellow") + "Comandos disponibles:" + s("reset") + "\n");

    Object.values(commands).forEach(function(cmd) {
      console.log(
        s("bold") + s("green") + "  " + cmd.name.padEnd(15) + s("reset") + " " + s("dim") + cmd.description + s("reset")
      );
    });

    console.log("\n" + s("bold") + "Usa:" + s("reset") + " " + s("cyan") + "help <comando>" + s("reset") + " para ver detalles especificos");
    console.log(s("bold") + "Ejemplo:" + s("reset") + " " + s("dim") + "help validate" + s("reset") + "\n");
  } else {
    const found = Object.values(commands).find(
      function(cmd) { return cmd.name.toLowerCase() === filterLower; }
    );

    if (!found) {
      console.log(s("red") + "Comando no encontrado: " + filter + s("reset"));
      console.log(s("dim") + "Usa 'help' sin filtros para ver todos los comandos" + s("reset") + "\n");
      return;
    }

    printHeader("Ayuda: " + found.name);
    printCommandHelp(found, filter);
  }
}

function runHelp(args) {
  const filter = args[2] || null;
  showHelp(filter);
}

if (require.main === module) {
  runHelp(process.argv);
}

module.exports = { showHelp: showHelp, commands: commands };