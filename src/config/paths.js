const path = require('path');
const projectRoot = path.resolve(__dirname, '..', '..');

module.exports = {
  projectRoot,
  zun: {
    installBase: 'C:/Program Files (x86)/GET/Zun Software',
    resourcesBase: 'D:/.resources',
    acc: { dest: 'C:/Program Files (x86)/GET/Zun Software/ZunAcc' },
    pms: { dest: 'C:/Program Files (x86)/GET/Zun Software/ZunPms' },
    st: { dest: 'C:/Program Files (x86)/GET/Zun Software/ZunStock' },
  },
  structure: {
    acc: path.join(projectRoot, 'folders_strs', 'acc_folder_structure.md'),
    pms: path.join(projectRoot, 'folders_strs', 'pms_folder_structure.md'),
    st: path.join(projectRoot, 'folders_strs', 'st_folder_structure.md'),
    default: path.join(projectRoot, 'folders_strs', 'structure.md'),
  },
};