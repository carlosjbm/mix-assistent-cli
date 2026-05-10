const path = require("path");
const projectRoot = path.resolve(__dirname, "..", "..");

module.exports = {
  projectRoot,
  zun: {
    installBase: "C:/Program Files (x86)/GET/ZUN Software",
    resourcesBase: "D:/.resources",
    acc: { dest: "C:/Program Files (x86)/GET/ZUN Software/ZUN acc" },
    pms: { dest: "C:/Program Files (x86)/GET/ZUN Software/ZUN pms" },
    st: { dest: "C:/Program Files (x86)/GET/ZUN Software/ZUNStock" },
  },
  structure: {
    acc: path.join(projectRoot, "folders_strs", "acc_folder_structure.md"),
    pms: path.join(projectRoot, "folders_strs", "pms_folder_structure.md"),
    st: path.join(projectRoot, "folders_strs", "st_folder_structure.md"),
    default: path.join(projectRoot, "folders_strs", "structure.md"),
  },
};
