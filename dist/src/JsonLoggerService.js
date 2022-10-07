"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonLoggerService = void 0;
const LoggerFactory_1 = require("./LoggerFactory");
class JsonLoggerService {
    constructor(name, customContextBuilder) {
        this.logger = LoggerFactory_1.LoggerFactory.createLogger(name, customContextBuilder);
    }
    log(message, context) {
        return this.logger.info(context, message);
    }
    error(message, trace, context) {
        return this.logger.error(context, trace, message);
    }
    warn(message, context) {
        return this.logger.warn(context, message);
    }
    debug(message, context) {
        return this.logger.debug(context, message);
    }
    verbose(message, context) {
        return this.logger.trace(context, message);
    }
}
exports.JsonLoggerService = JsonLoggerService;
//# sourceMappingURL=JsonLoggerService.js.map