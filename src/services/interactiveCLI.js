const path = require("path");
const keypress = require("keypress");
const { searchCommands, getCommands } = require("./autoComplete");

const styles = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
};

let currentInput = "";
let suggestions = [];
let selectedIndex = 0;
let showSuggestions = false;
let lastKeyWasSpace = false;

function updateSuggestions(input) {
  suggestions = searchCommands(input);
  selectedIndex = 0;
}

function render() {
  process.stdout.write("\r");
  process.stdout.write("\x1b[K");
  process.stdout.write(`${styles.cyan}> ${currentInput}${styles.reset}`);

  if (showSuggestions && suggestions.length > 0) {
    console.log("");
    suggestions.forEach((cmd, index) => {
      const prefix = index === selectedIndex ? "  ▸ " : "    ";
      const highlight = index === selectedIndex ? styles.cyan : styles.dim;
      console.log(
        `${prefix}${highlight}${cmd.name}${styles.reset}  ${styles.dim}${cmd.description}${styles.reset}`,
      );
    });
  }

  process.stdout.write(`\r${styles.cyan}> ${currentInput}${styles.reset}`);
}

function executeCommand(command) {
  console.log("");
  const args = command.split(" ");
  const cmd = args[0];
  const script = args.slice(1).join(" ");

  const { execSync } = require("child_process");

  try {
    if (cmd === "validate") {
      let fullCmd = "openmix-validate";
      if (script) fullCmd += ` ${script}`;
      console.log(`${styles.cyan}$ ${fullCmd}${styles.reset}\n`);
      execSync(fullCmd, { stdio: "inherit" });
    } else if (cmd === "fix") {
      let fullCmd = "openmix-fix ";
      if (script) fullCmd += ` ${script}`;
      console.log(`${styles.cyan}$ ${fullCmd}${styles.reset}\n`);
      execSync(fullCmd, { stdio: "inherit" });
    } else if (cmd === "act") {
      let fullCmd = "openmix-act ";
      if (script) fullCmd += ` ${script}`;
      console.log(`${styles.cyan}$ ${fullCmd}${styles.reset}\n`);
      execSync(fullCmd, { stdio: "inherit" });
    } else if (cmd === "clone") {
      let fullCmd = "openmix-clone";
      if (script) fullCmd += ` ${script}`;
      console.log(`${styles.cyan}$ ${fullCmd}${styles.reset}\n`);
      execSync(fullCmd, { stdio: "inherit" });
    } else if (cmd === "start") {
      console.log(`${styles.cyan}$ npm start${styles.reset}\n`);
      execSync("npm start", { stdio: "inherit" });
    } else if (cmd === "test") {
      console.log(`${styles.cyan}$ npm test${styles.reset}\n`);
      execSync("npm test", { stdio: "inherit" });
    } else if (cmd === "installed") {
      console.log(`${styles.cyan}$ npm run installed${styles.reset}\n`);
      execSync("openmix-installed", { stdio: "inherit" });
    } else if (cmd === "adjust") {
      let fullCmd = "node src/utils/adjustStructure.js";
      if (script) fullCmd += ` ${script}`;
      console.log(`${styles.cyan}$ ${fullCmd}${styles.reset}\n`);
      execSync(fullCmd, { stdio: "inherit" });
    } else if (cmd === "versioninfo") {
      let fullCmd = "openmix-versioninfo";
      if (script) fullCmd += ` "${script}"`;
      console.log(`${styles.cyan}$ ${fullCmd}${styles.reset}\n`);
      execSync(fullCmd, { stdio: "inherit", shell: true });
    } else if (cmd === "versioninfo acc") {
      let fullCmd = "openmix-versioninfo --acc";
      if (script) fullCmd += ` ${script}`;
      console.log(`${styles.cyan}$ ${fullCmd}${styles.reset}\n`);
      execSync(fullCmd, { stdio: "inherit" });
} else if (cmd === "help") {
      const projectRoot = path.join(__dirname, "..", "..");
      const fullCmd = script ? `node src/utils/help.js ${script}` : "node src/utils/help.js";
      console.log(`${styles.cyan}$ ${fullCmd}${styles.reset}\n`);
      execSync(fullCmd, { stdio: "inherit", cwd: projectRoot });
    } else {
      console.log(`${styles.dim}Comando no reconocido: ${cmd}${styles.reset}`);
    }
  } catch (e) {}
}

function startInteractive() {
  currentInput = "";
  suggestions = [];
  selectedIndex = 0;
  showSuggestions = false;
  lastKeyWasSpace = false;

  process.stdout.write("\n");
  render();

  keypress(process.stdin);
  process.stdin.setRawMode = process.stdin.setRawMode || (() => {});
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  process.stdin.on("keypress", (ch, key) => {
    if (!key) return;

    if (key.name === "c" && key.ctrl) {
      console.log("\n");
      process.exit(0);
    }

    if (key.name === "return") {
      if (showSuggestions && suggestions.length > 0) {
        currentInput = suggestions[selectedIndex].name;
        showSuggestions = false;
        console.log("");
        executeCommand(currentInput);
        currentInput = "";
        suggestions = [];
        selectedIndex = 0;
        lastKeyWasSpace = false;
        process.stdout.write("\n");
        render();
      } else if (currentInput.trim()) {
        executeCommand(currentInput.trim());
        currentInput = "";
        suggestions = [];
        selectedIndex = 0;
        showSuggestions = false;
        lastKeyWasSpace = false;
        process.stdout.write("\n");
        render();
      }
      return;
    }

    if (key.name === "escape") {
      showSuggestions = false;
      suggestions = [];
      render();
      return;
    }

    if (key.name === "space") {
      if (lastKeyWasSpace && currentInput.trim()) {
        updateSuggestions(currentInput);
        if (suggestions.length > 0) {
          showSuggestions = true;
          selectedIndex = 0;
          render();
        }
        lastKeyWasSpace = false;
      } else {
        currentInput += " ";
        lastKeyWasSpace = true;
        render();
      }
      return;
    }

    if (key.name === "up") {
      if (showSuggestions && suggestions.length > 0) {
        selectedIndex =
          (selectedIndex - 1 + suggestions.length) % suggestions.length;
        render();
      }
      return;
    }

    if (key.name === "down") {
      if (showSuggestions && suggestions.length > 0) {
        selectedIndex = (selectedIndex + 1) % suggestions.length;
        render();
      }
      return;
    }

    if (key.name === "backspace") {
      if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        showSuggestions = false;
        suggestions = [];
        lastKeyWasSpace = false;
        render();
      }
      return;
    }

    if (
      ch &&
      ch.length === 1 &&
      !key.ctrl &&
      !key.meta &&
      key.name !== "space"
    ) {
      if (ch.charCodeAt(0) >= 32) {
        currentInput += ch;
        showSuggestions = false;
        suggestions = [];
        lastKeyWasSpace = false;
        render();
      }
    }
  });
}

if (require.main === module) {
  startInteractive();
}

module.exports = { startInteractive };
