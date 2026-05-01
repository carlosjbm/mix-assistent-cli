const path = require("path");
const { cloneFiles } = require("../services/cloneFiles");
const { validateStructure } = require("./validateStructure");

const accPath = "C:/Users/Carlinhos/Desktop/GET/ZunAcc";
const actResources = "C:/Users/Carlinhos/Desktop/carpeta_prueba/ZunAcc";
const structureFilePath = path.join(process.cwd(), "acc_folder_structure.md");

const styles = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
};

function printHeader(title) {
  console.log(`\n${styles.bold}${styles.blue}${"=".repeat(50)}${styles.reset}`);
  console.log(`${styles.bold}${styles.blue}${title}${styles.reset}`);
  console.log(`${styles.bold}${styles.blue}${"=".repeat(50)}${styles.reset}\n`);
}

function printSuccess(msg) {
  console.log(`${styles.green}✓ ${msg}${styles.reset}`);
}

function printError(msg) {
  console.log(`${styles.red}✗ ${msg}${styles.reset}`);
}

function printInfo(msg) {
  console.log(`${styles.dim}${msg}${styles.reset}`);
}

const actZun = () => {
  const arg = process.argv[2];
  if (arg === "acc") {
    printHeader("ZUN - Actualización de Recursos");
    printInfo(`Origen: ${actResources}`);
    printInfo(`Destino: ${accPath}\n`);

    const result = validateStructure(accPath, structureFilePath);
    if (!result.isValid) {
      printError("La estructura no es válida.");
      console.log(`${styles.yellow}Carpetas faltantes:${styles.reset}`);
      result.missing.forEach((item) =>
        console.log(`  ${styles.red}→ ${item}${styles.reset}`),
      );
      console.log(
        `\n${styles.yellow}Por favor, ajuste la estructura antes de actualizar(npm run fix -- acc).${styles.reset}\n`,
      );
      return;
    }
    printSuccess("Estructura validada correctamente.");
    console.log(`${styles.blue}Iniciando clonación...${styles.reset}\n`);
    cloneFiles(actResources, accPath, true);
    printSuccess("Actualización completada.");
  } else {
    printHeader("ZUN - Actualizador de Recursos");
    console.log(`${styles.bold}Uso:${styles.reset} npm run act -- acc`);
    console.log(
      `${styles.dim}Ejecuta la actualización de los recursos desde la carpeta de origen.${styles.reset}\n`,
    );
  }
};

actZun();
