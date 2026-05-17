const path = require("path");
const projectRoot = path.resolve(__dirname, "..", "..");

module.exports = {
  projectRoot,
  zun: {
    installBase: "C:/Program Files (x86)/GET/ZUN Software",
    resourcesBase: "D:/.resources",
    backupPathDefault: "C:/Program Files (x86)/GET/ZUN Software/backups",
    acc: {
      flag: "--acc",
      dest: "C:/Program Files (x86)/GET/ZUN Software/ZUN acc",
      exePath: "C:/Program Files (x86)/GET/ZUN Software/ZUN acc/zunacc.exe",
    },
    pms: {
      flag: "--pms",
      dest: "C:/Program Files (x86)/GET/ZUN Software/ZUN pms",
      exePath: "C:/Program Files (x86)/GET/ZUN Software/ZUN pms/front.exe",
    },
    st: {
      flag: "--st",
      dest: "C:/Program Files (x86)/GET/ZUN Software/ZUNStock",
      exePath: "C:/Program Files (x86)/GET/ZUN Software/ZUNStock/ZUNStock.exe",
    },
    cc: {
      flag: "--cc",
      dest: "C:/Program Files (x86)/GET/ZUN Software/ZUNcc",
      exePath: "C:/Program Files (x86)/GET/ZUN Software/ZUNcc/ZUNcc.exe",
    },
    // aft: { flag:"--aft",dest: "C:/Program Files (x86)/GET/ZUN Software/ZUN aft", exePath:"C:/Program Files (x86)/GET/ZUN Software/ZUN aft/ZUN aft.exe" },
    ut: {
      flag: "--ut",
      dest: "C:/Program Files (x86)/GET/ZUN Software/ZUNutiles",
      exePath:
        "C:/Program Files (x86)/GET/ZUN Software/ZUNutiles/ZUNútiles.exe",
    },
  },
  structure: {
    acc: path.join(projectRoot, "folders_strs", "acc_folder_structure.md"),
    pms: path.join(projectRoot, "folders_strs", "pms_folder_structure.md"),
    st: path.join(projectRoot, "folders_strs", "st_folder_structure.md"),
    cc: path.join(projectRoot, "folders_strs", "cc_folder_structure.md"),
    // aft: path.join(projectRoot, "folders_strs", "aft_folder_structure.md"),
    ut: path.join(projectRoot, "folders_strs", "ut_folder_structure.md"),
    default: path.join(projectRoot, "folders_strs", "structure.md"),
    resourcePath: path.join(
      projectRoot,
      "folders_strs",
      "resource_structure.md",
    ),
  },
};
