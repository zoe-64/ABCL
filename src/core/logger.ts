class Logger {
  private logsArray: Array<{
    level: string;
    timestamp: string;
    message: any;
  }> = [];
  private maxLogSize: number = 100;

  private log(level: string, message: any, logFunction: (...args: any[]) => void) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      message,
      level,
      version: modVersion,
      timestamp,
    };

    logFunction(`%c${modIdentifier}:`, `font-weight: bold; color: #f6cbde;`, logEntry);

    this.logsArray.push(logEntry);

    if (this.logsArray.length > this.maxLogSize) {
      this.logsArray.shift();
    }
  }

  info(message: any) {
    this.log("INFO", message, console.log);
  }

  debug(message: any) {
    this.log("DEBUG", message, console.debug);
  }

  warn(message: any) {
    this.log("WARN", message, console.warn);
  }

  error(message: any) {
    this.log("ERROR", message, console.error);
  }

  getLogs() {
    return this.logsArray;
  }
}

export const logger = new Logger();
