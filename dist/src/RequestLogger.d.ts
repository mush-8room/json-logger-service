import { RequestLoggerOptions } from './RequestLoggerOptions';
export declare class RequestLogger {
    static buildExpressRequestLogger(options?: RequestLoggerOptions): any;
    private static getPathToLog;
    private static isInDoNotLogPaths;
}
