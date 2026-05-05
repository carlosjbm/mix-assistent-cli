#! /usr/bin/env node
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { adjustStructure } = require("./adjustStructure.js");

const defaultInstallationPath = "C:/Program Files (x86)/GET/Zun Software";

const styles = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
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

function printWarning(msg) {
  console.log(`${styles.yellow}⚠ ${msg}${styles.reset}`);
}

function printInfo(msg) {
  console.log(`${styles.blue}ℹ ${msg}${styles.reset}`);
}

function printDim(msg) {
  console.log(`${styles.dim}${msg}${styles.reset}`);
}

function formatTreeAsList(structure) {
  const tree = {};
  const result = [];

  for (const item of structure) {
    const parts = item.replace(/\/$/, "").split("/");
    let current = tree;
    for (const part of parts) {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
  }

  function traverse(obj, prefix = "", isLast = true, resultList = []) {
    const keys = Object.keys(obj).sort();
    keys.forEach((key, index) => {
      const isLastKey = index === keys.length - 1;
      const connector = isLastKey ? "└── " : "├── ";
      const branch = isLast ? "    " : "│   ";

      resultList.push(prefix + connector + styles.cyan + key + styles.reset);

      if (Object.keys(obj[key]).length > 0) {
        traverse(obj[key], prefix + branch, isLastKey, resultList);
      }
    });
  }

  traverse(tree, "", true, result);
  return result;
}

function getDirectoryStructure(dirPath) {
  const structure = [];

  if (!fs.existsSync(dirPath)) {
    return structure;
  }

  function walk(dir, prefix = "") {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        structure.push(prefix + item + "/");
        walk(fullPath, prefix + item + "/");
      }
    }
  }

  walk(dirPath);
  return structure;
}

function loadExpectedStructure(structureFilePath) {
  if (!fs.existsSync(structureFilePath)) {
    throw new Error(
      `Archivo structure.md no encontrado en: ${structureFilePath}`,
    );
  }

  const content = fs.readFileSync(structureFilePath, "utf-8");
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));
}

function validateStructure(targetPath, structureFilePath) {
  const expected = loadExpectedStructure(structureFilePath);
  const actual = getDirectoryStructure(targetPath);

  const missing = expected.filter((item) => !actual.includes(item));
  const extra = actual.filter((item) => !expected.includes(item));

  return {
    expected,
    actual,
    missing,
    extra,
    isValid: missing.length === 0 && extra.length === 0,
  };
}

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  const arg = process.argv[2];
  const useDefaultPath = arg === "i";
  const targetPath = useDefaultPath ? null : arg;
  const structureFilePath = process.argv[3];

  let finalTargetPath;
  let finalStructurePath;

  if (useDefaultPath) {
    finalTargetPath = defaultInstallationPath;
    finalStructurePath = path.join(
      process.cwd(),
      "opentest/folders_strs/structure.md",
    );
  } else if (targetPath) {
    finalTargetPath = targetPath;
    finalStructurePath =
      structureFilePath ||
      path.join(targetPath, "opentest/folders_strs/structure.md");
  } else {
    const rl = createInterface();
    finalTargetPath = await askQuestion(
      rl,
      `${styles.blue}Ingrese la ruta de la carpeta a validar: ${styles.reset}`,
    );
    rl.close();

    if (!finalTargetPath) {
      printError("Debe proporcionar una ruta de carpeta.");
      process.exit(1);
    }

    finalStructurePath = path.join(
      finalTargetPath,
      "opentest/folders_strs/structure.md",
    );
  }

  const rootStructurePath = path.join(
    process.cwd(),
    "opentest/folders_strs/structure.md",
  );
  const needsToAsk = !fs.existsSync(finalStructurePath);

  if (needsToAsk) {
    printWarning(`No se encontró structure.md en: ${finalTargetPath}`);
    const rl = createInterface();
    const respuesta = await askQuestion(
      rl,
      `${styles.blue}¿Desea crear la estructura del proyecto usando el template? (y/n): ${styles.reset}`,
    );
    rl.close();

    if (respuesta === "y") {
      if (!fs.existsSync(rootStructurePath)) {
        printError(`No existe structure.md en la raíz: ${rootStructurePath}`);
        process.exit(1);
      }
      const content = fs.readFileSync(rootStructurePath, "utf-8");
      fs.writeFileSync(finalStructurePath, content);
      printSuccess(`Copiado structure.md a: ${finalTargetPath}`);
    } else {
      printWarning("Operación cancelada.");
      process.exit(1);
    }
  }

  try {
    const result = validateStructure(finalTargetPath, finalStructurePath);
    const expectedTree = formatTreeAsList(result.expected);
    const actualTree = formatTreeAsList(result.actual);

    printHeader("Estructura de Carpetas");
    console.log(
      `${styles.blue}Ruta validada: ${finalTargetPath}${styles.reset}\n`,
    );
    console.log(`${styles.bold}Esperada:${styles.reset}`);
    expectedTree.forEach((item) => printSuccess(item));

    console.log(`\n${styles.bold}Actual:${styles.reset}`);
    actualTree.forEach((item) => printDim(item));

    if (result.isValid) {
      printSuccess("La estructura coincide con lo esperado!");
    } else {
      if (result.missing.length > 0) {
        printError("Carpetas faltantes:");
        result.missing.forEach((item) => printWarning(`  → ${item}`));
      }

      if (result.extra.length > 0) {
        printWarning("Carpetas extra:");
        result.extra.forEach((item) => console.log(`  + ${item}`));
      }

      printError("La estructura NO coincide.");
    }

    const aj = createInterface();
    const ajustStructure = await askQuestion(
      aj,
      `${styles.blue}¿Desea ajustar las diferencias? (y/n): ${styles.reset}`,
    );
    aj.close();

    if (ajustStructure === "y") {
      printInfo("Ajustando estructura...");
      try {
        adjustStructure(finalTargetPath, finalStructurePath);
        printSuccess("Estructura ajustada correctamente.");
      } catch (error) {
        printError(`Error al ajustar: ${error.message}`);
      }
    } else if (ajustStructure === "n") {
      printWarning("No se realizarán cambios.");
    } else {
      printWarning("Opción no válida. No se realizarán cambios.");
    }

    process.exit(result.isValid ? 0 : 1);
  } catch (error) {
    printError(error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  validateStructure,
  getDirectoryStructure,
  loadExpectedStructure,
  formatTreeAsList,
};
