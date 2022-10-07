"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = void 0;
const Logger = require("bunyan");
const JsonLogger_1 = require("./JsonLogger");
class LoggerFactory {
    static setDefaultLogCustomContextBuilder(defaultCustomContextBuilder) {
        LoggerFactory.defaultCustomContextBuilder = defaultCustomContextBuilder;
    }
    static createLogger(name, customContextBuilder) {
        const stream = undefined;
        stream.pipe(process.stdout);
        const bunyanLogger = Logger.createLogger({
            name,
            serializers: {
                error: Logger.stdSerializers.err,
            },
            env: process.env.LOGGER_ENV,
            level: process.env.LOGGER_LEVEL || "info",
            stream: stream,
        });
        return new JsonLogger_1.JsonLogger(bunyanLogger, customContextBuilder);
    }
}
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=LoggerFactory.js.map