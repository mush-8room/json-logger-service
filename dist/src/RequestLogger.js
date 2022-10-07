"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLogger = void 0;
const LoggerFactory_1 = require("./LoggerFactory");
const onFinished = require('on-finished');
class RequestLogger {
    static buildExpressRequestLogger(options) {
        if (!options) {
            options = {};
        }
        if (!options.doNotLogPaths) {
            options.doNotLogPaths = [];
        }
        if (!options.logOnlyBasePaths) {
            options.logOnlyBasePaths = [];
        }
        if (!options.jsonLogger) {
            options.jsonLogger = LoggerFactory_1.LoggerFactory.createLogger(RequestLogger.name);
        }
        const logger = options.jsonLogger;
        return (req, res, next) => {
            if (!(req && req.path)) {
                logger.warn('No request path defined.');
                next();
                return;
            }
            if (RequestLogger.isInDoNotLogPaths(req.path, options.doNotLogPaths)) {
                next();
                return;
            }
            const requestPath = RequestLogger.getPathToLog(req.path, options.logOnlyBasePaths);
            const method = req.method ? req.method : '';
            logger.info({ uri: requestPath }, `Before request ${method} '${requestPath}'`);
            onFinished(res, () => {
                logger.info({ uri: requestPath }, `After request ${method} '${requestPath}'`);
            });
            next();
        };
    }
    static getPathToLog(requestPath, logOnlyBasePaths) {
        for (const logOnlyBasePath of logOnlyBasePaths) {
            if (requestPath.startsWith(logOnlyBasePath)) {
                return logOnlyBasePath;
            }
        }
        return requestPath;
    }
    static isInDoNotLogPaths(requestPath, doNotLogPaths) {
        for (const doNotLogPath of doNotLogPaths) {
            if (requestPath.startsWith(doNotLogPath)) {
                return true;
            }
        }
        return false;
    }
}
exports.RequestLogger = RequestLogger;
//# sourceMappingURL=RequestLogger.js.map