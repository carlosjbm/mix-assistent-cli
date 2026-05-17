#! /usr/bin/env node
const vi = require("win-version-info");
const paths = require("../config/paths");
const modules = [
  {
    name: "ZUN acc (Contabilidad)",
    flag: paths.zun.acc.flag,
    path: paths.zun.acc.exePath,
  },
  {
    name: "ZUN pms (Front de Carpeta)",
    flag: paths.zun.pms.flag,
    path: paths.zun.pms.exePath,
  },
  {
    name: "ZUN Stock (Almacén)",
    flag: paths.zun.st.flag,
    path: paths.zun.st.exePath,
  },
  {
    name: "ZUN cc (Validador)",
    flag: paths.zun.cc.flag,
    path: paths.zun.cc.exePath,
  },
  // {
  //   name: "Zun aft",
  //   flag: "--aft",
  //   path: "C:/Program Files (x86)/GET/ZUN Software/ZUN aft/ZUN aft.exe",
  // },
  {
    name: "ZUN Utiles (Útiles y Herramientas)",
    flag: paths.zun.ut.flag,
    path: paths.zun.ut.exePath,
  },
];

const styles = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
};

function resolveModulePath(arg) {
  if (!arg) {
    return null;
  }

  const module = modules.find((m) => m.flag === arg);
  return module ? module.path : null;
}

function showHelp() {
  console.log(
    `${styles.yellow}Usage: opx-versioninfo <ruta-ejecutable | flag>${styles.reset}`,
  );
  console.log(`${styles.dim}Ejemplos:${styles.reset}`);
  console.log(
    `  ${styles.green}openmix-versioninfo "C:/ruta/al/ejecutable.exe"${styles.reset}`,
  );
  console.log(`  ${styles.green}opx-versioninfo --acc${styles.reset}`);
  console.log(`  ${styles.green}opx-versioninfo --pms${styles.reset}`);
  console.log(`  ${styles.green}opx-versioninfo --st${styles.reset}`);
  console.log(`\n${styles.dim}Flags disponibles:${styles.reset}`);
  modules.forEach((m) => {
    console.log(`  ${styles.cyan}${m.flag}${styles.reset} - ${m.name}`);
  });
}

function showVersionInfo(exePath) {
  let resolvedPath = exePath;

  if (exePath.startsWith("--")) {
    resolvedPath = resolveModulePath(exePath);
    if (!resolvedPath) {
      console.log(
        `${styles.red}Flag no reconhecida: ${exePath}${styles.reset}`,
      );
      showHelp();
      process.exit(1);
    }
  }

  if (!resolvedPath) {
    showHelp();
    process.exit(1);
  }
  try {
    const info = vi(resolvedPath);

    console.log(`
  ${styles.bold}${styles.blue}════════════════════════════════════════════════════════════${styles.reset}
  ${styles.bold}Información de Versión: ${resolvedPath}${styles.blue}
  ════════════════════════════════════════════════════${styles.reset}
  ${styles.green}Product Name:       ${styles.reset}${info.ProductName || "N/A"}
  ${styles.green}Product Version:    ${styles.reset}${info.ProductVersion || "N/A"}
  ${styles.green}File Version:        ${styles.reset}${info.FileVersion || "N/A"}
  ${styles.green}File Description:   ${styles.reset}${info.FileDescription || "N/A"}
  ${styles.green}Company Name:      ${styles.reset}${info.CompanyName || "N/A"}
  ${styles.green}Legal Copyright:  ${styles.reset}${info.LegalCopyright || "N/A"}
  ${styles.green}Legal Trademarks:   ${styles.reset}${info.LegalTrademarks || "N/A"}
  ${styles.green}Original Filename: ${styles.reset}${info.OriginalFilename || "N/A"}
  ${styles.green}Internal Name:      ${styles.reset}${info.InternalName || "N/A"}
  ${styles.green}Build ID:           ${styles.reset}${info.BuildID || "N/A"}
  ${styles.blue}════════════════════════════════════════════════════${styles.reset}
  `);
  } catch (error) {
    console.error(
      `${styles.red}Error al obtener información del ejecutable: ${error.message}${styles.reset}`,
    );
    process.exit(1);
  }
}

const exePath = process.argv[2];
showVersionInfo(exePath);
