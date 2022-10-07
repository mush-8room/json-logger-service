"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonLogger = void 0;
const LoggerFactory_1 = require("./LoggerFactory");
class JsonLogger {
    constructor(bunyanLogger, customContextBuilder) {
        this.bunyanLogger = bunyanLogger;
        this.customContextBuilder = customContextBuilder;
    }
    info(context, message) {
        const bunyanParams = this.getBunyanParams(message, context);
        this.bunyanLogger.info(bunyanParams.context, bunyanParams.message);
    }
    error(context, trace, message) {
        if (trace && message) {
            const bunyanParams = this.getBunyanParams(message, context);
            this.bunyanLogger.error(bunyanParams.context, trace, bunyanParams.message);
        }
        else if (trace) {
            const bunyanParams = this.getBunyanParams(trace, context);
            this.bunyanLogger.error(bunyanParams.context, bunyanParams.message);
        }
        else {
            const bunyanParams = this.getBunyanParams(undefined, context);
            this.bunyanLogger.error(bunyanParams.context, bunyanParams.message);
        }
    }
    warn(context, message) {
        const bunyanParams = this.getBunyanParams(message, context);
        this.bunyanLogger.warn(bunyanParams.context, bunyanParams.message);
    }
    debug(context, message) {
        const bunyanParams = this.getBunyanParams(message, context);
        this.bunyanLogger.debug(bunyanParams.context, bunyanParams.message);
    }
    trace(context, message) {
        const bunyanParams = this.getBunyanParams(message, context);
        this.bunyanLogger.trace(bunyanParams.context, bunyanParams.message);
    }
    fatal(context, message) {
        const bunyanParams = this.getBunyanParams(message, context);
        this.bunyanLogger.fatal(bunyanParams.context, bunyanParams.message);
    }
    getBunyanParams(message, context) {
        const contextObj = (typeof context) === 'object' ? context : { context };
        return {
            context: message === undefined ?
                this.getDefaultContextObject()
                : Object.assign(this.getDefaultContextObject(), contextObj),
            message: message === undefined ? context : message,
        };
    }
    getDefaultContextObject() {
        const defaultCustomContextBuilder = LoggerFactory_1.LoggerFactory.defaultCustomContextBuilder;
        return this.customContextBuilder && this.customContextBuilder.buildCustomContext()
            || defaultCustomContextBuilder && defaultCustomContextBuilder.buildCustomContext()
            || {};
    }
}
exports.JsonLogger = JsonLogger;
//# sourceMappingURL=JsonLogger.js.map