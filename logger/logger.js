import { fileURLToPath } from "url";
import path from "path";
import log4js from "log4js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname, "logs");
console.log("🚀 ~ file: logger.js:8 ~ logDir:", logDir);

log4js.configure({
  appenders: {
    console: { type: "console" },
    infoFile: { type: "file", filename: path.join(logDir, "info.log") },
    warnFile: { type: "file", filename: path.join(logDir, "warn.log") },
    errorFile: { type: "file", filename: path.join(logDir, "error.log") },
    infoFileLogger: {
      type: "logLevelFilter",
      appender: "infoFile",
      level: "info",
    },
    warnFileLogger: {
      type: "logLevelFilter",
      appender: "warnFile",
      level: "warn",
    },
    errorFileLogger: {
      type: "logLevelFilter",
      appender: "errorFile",
      level: "error",
    },
  },
  categories: {
    default: {
      appenders: [
        "console",
        "infoFileLogger",
        "errorFileLogger",
        "warnFileLogger",
      ],
      level: "all",
    },
    info: {
      appenders: ["infoFileLogger", "console"],
      level: "info",
    },
    warn: {
      appenders: ["warnFileLogger", "console"],
      level: "warn",
    },
    error: {
      appenders: ["errorFileLogger", "console"],
      level: "error",
    },
  },
});

const logger = log4js.getLogger();

export default logger;
