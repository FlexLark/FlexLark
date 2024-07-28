
export interface ILogger {
  log: (...data: any[]) => void;
  error: (...data: any[]) => void;
  warn: (...data: any[]) => void;
  debug: (...data: any[]) => void;
  info: (...data: any[]) => void;
}
