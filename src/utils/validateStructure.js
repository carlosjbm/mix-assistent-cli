const fs = require("fs");
const path = require("path");
const readline = require("readline");

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
  const targetPath = process.argv[2];
  const structureFilePath = process.argv[3];

  let finalTargetPath = targetPath;
  let finalStructurePath = structureFilePath;

  if (!targetPath) {
    const rl = createInterface();
    finalTargetPath = await askQuestion(
      rl,
      "Ingrese la ruta de la carpeta a validar: ",
    );
    rl.close();

    if (!finalTargetPath) {
      console.error("Error: Debe proporcionar una ruta de carpeta.");
      process.exit(1);
    }
  }

  if (!structureFilePath) {
    finalStructurePath = path.join(finalTargetPath, "structure.md");
  }

  try {
    const result = validateStructure(finalTargetPath, finalStructurePath);

    console.log("\n=== Estructura de Carpetas ===\n");
    console.log("Esperada:");
    result.expected.forEach((item) => console.log(`  ✓ ${item}`));

    console.log("\nActual:");
    result.actual.forEach((item) => console.log(`  ${item}`));

    if (result.isValid) {
      console.log("\n✓ La estructura coincide con lo esperado!\n");
    } else {
      if (result.missing.length > 0) {
        console.log("\n✗ Carpetas faltantes:");
        result.missing.forEach((item) => console.log(`  - ${item}`));
      }

      if (result.extra.length > 0) {
        console.log("\n✗ Carpetas extra:");
        result.extra.forEach((item) => console.log(`  + ${item}`));
      }

      console.log("\n✗ La estructura NO coincide.\n");
    }

    const aj = createInterface();
    const ajustStructure = await askQuestion(
      aj,
      "Si desea ajustar diferencias escriba: y o n si no ",
    );
    if (ajustStructure === "y") {
      /**Logica para el casi en que si se decida ajustar */
      console.log("Se selecciono que si");
    }
    if (ajustStructure === "n") {
      /**Logica para el caso en que no se quiera ajustar */
      console.log("Se selecciono que no");
    }
    aj.close();

    process.exit(result.isValid ? 0 : 1);
  } catch (error) {
    console.error(`Error: ${error.message}`);
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
};
