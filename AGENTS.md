# AGENTS.md - OpenMix CLI

## Project
- **Type**: Node.js CLI tool for Windows
- **Purpose**: Automate ZUN software support (structure validation, file cloning, version info)
- **Entry**: `src/index.js`

## Commands
| Command | Script | Description |
|---------|--------|-------------|
| `npm run start` / `openmix` | src/index.js | Interactive CLI mode |
| `npm run validate` | src/utils/validateStructure.js | Validate folder structure |
| `npm run fix` | src/services/fixFolderEspecific.js | Create missing folders |
| `npm run act` | src/utils/actZun.js | Full ZUN update (validate + clone) |
| `npm run clone` | src/services/cloneFiles.js | Copy files/dirs |
| `npm run installed` | src/utils/installedModules.js | List installed ZUN modules |
| `npm run test` | jest | Run tests |

## Key Flags
- `openmix-validate <path>` - validate specific path
- `openmix-validate -- i` - validate default path (`C:/Program Files (x86)/GET/Zun Software`)
- `openmix-fix -- acc|pms|st` - fix structure for module
- `openmix-act -- acc|pms|st` - update full ZUN module
- `openmix-versioninfo --acc|--pms|--st` - get exe version info

## ZUN Modules
- ZunAcc (acc) - Accounting
- ZunPms (pms) - Point of Sale
- ZunStock (st) - Inventory

## Structure Validation
- Expected structure defined in `folders_strs/*.md` files
- validateStructure.js looks for structure.md in validated folder first, then repo root

## Skills
- `.opencode/skills/app-flow/SKILL.md` - ZUN update workflow