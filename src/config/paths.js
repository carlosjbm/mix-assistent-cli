const path = require("path");
const projectRoot = path.resolve(__dirname, "..", "..");

module.exports = {
  projectRoot,
  zun: {
    installBase: "C:/Program Files (x86)/GET/ZUN Software",
    resourcesBase: "D:/.resources",
    backupPathDefault: "C:/Program Files (x86)/GET/ZUN Software/backups",
    acc: { dest: "C:/Program Files (x86)/GET/ZUN Software/ZUN acc" },
    pms: { dest: "C:/Program Files (x86)/GET/ZUN Software/ZUN pms" },
    st: { dest: "C:/Program Files (x86)/GET/ZUN Software/ZUNStock" },
    cc: { dest: "C:/Program Files (x86)/GET/ZUN Software/ZUNcc" },
    // aft: { dest: "C:/Program Files (x86)/GET/ZUN Software/ZUN aft" },
    ut: { dest: "C:/Program Files (x86)/GET/ZUN Software/ZUNutiles" },
  },
  structure: {
    acc: path.join(projectRoot, "folders_strs", "acc_folder_structure.md"),
    pms: path.join(projectRoot, "folders_strs", "pms_folder_structure.md"),
    st: path.join(projectRoot, "folders_strs", "st_folder_structure.md"),
    cc: path.join(projectRoot, "folders_strs", "cc_folder_structure.md"),
    // aft: path.join(projectRoot, "folders_strs", "aft_folder_structure.md"),
    ut: path.join(projectRoot, "folders_strs", "ut_folder_structure.md"),
    default: path.join(projectRoot, "folders_strs", "structure.md"),
  },
};
