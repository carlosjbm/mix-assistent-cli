const fs = require("fs");
const path = require("path");
const { cloneFiles } = require("../services/cloneFiles");
const { validateStructure } = require("./validateStructure");

const accPath = "C:/Users/Carlinhos/Desktop/GET/ZunAcc";

const actResources = "C:/Users/Carlinhos/Desktop/carpeta_prueba/ZunAcc";

const structureFilePath = path.join(process.cwd(), "acc_folder_structure.md");

const actZun = () => {
  const arg = process.argv[2];
  if (arg === "acc") {
    const result = validateStructure(accPath, structureFilePath);
    if (!result.isValid) {
      console.log("\n✗ La estructura no es válida. Faltan carpetas:");
      result.missing.forEach((item) => console.log(`  - ${item}`));
      console.log("\nAjuste la estructura antes de actualizar.\n");
      return;
    }
    console.log("✓ Estructura validada. Procediendo a clonar...\n");
    cloneFiles(actResources, accPath, true);
  }
};

actZun();
