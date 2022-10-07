"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe('JsonLoggerService tests', () => {
    describe('Creating object with success', () => {
        let jsonLoggerService;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            process.env.LOGGER_ENV = 'test';
            index_1.LoggerFactory.setDefaultLogCustomContextBuilder(undefined);
            jsonLoggerService = new index_1.JsonLoggerService('MyLoggerService');
        }));
        it('Should return a new instance', () => {
            expect(jsonLoggerService).toBeDefined();
        });
        it('Should log info', () => {
            jsonLoggerService.log('It works!');
        });
        it('Should use custom context builder', () => {
            const customLogger = new index_1.JsonLoggerService('MyLoggerService', {
                buildCustomContext() {
                    return { 'x-request-id': '8324-234-234-234' };
                },
            });
            customLogger.log('Log with x-request-id');
        });
        it('Should use default context builder', () => {
            index_1.LoggerFactory.setDefaultLogCustomContextBuilder({
                buildCustomContext() {
                    return { PROP_A: 'YES' };
                },
            });
            const customLogger = new index_1.JsonLoggerService('MyLoggerService');
            customLogger.log('Log with default custom context builder');
        });
        it('Should log error', () => {
            jsonLoggerService.error('It works!', 'TRACE', 'CONTEXT');
        });
        it('Should log debug', () => {
            jsonLoggerService.debug('It works!', 'CONTEXT');
        });
        it('Should log warn', () => {
            jsonLoggerService.warn('It works!', 'CONTEXT');
        });
        it('Should log verbose', () => {
            jsonLoggerService.verbose('It works!');
        });
    });
});
describe('LoggerFactory tests', () => {
    describe('Creating Logger with success', () => {
        let logger;
        beforeAll(() => {
            logger = index_1.LoggerFactory.createLogger('MyLogger');
        });
        it('Should return a new instance', () => {
            expect(logger).toBeDefined();
        });
        it('Should log info without throwing errors', () => {
            logger.info('It works!');
        });
        it('Should log debug without throwing errors', () => {
            logger.debug('It works!');
        });
        it('Should log error without throwing errors', () => {
            logger.error('It works!');
        });
        it('Should log error with context without throwing errors', () => {
            logger.error({ context: 'Hello World' }, 'It works!');
        });
        it('Should log error with context and trace without throwing errors', () => {
            logger.error({ context: 'Hello World' }, 'TRACE', 'It works!');
        });
        it('Should log warn without throwing errors', () => {
            logger.warn('It works!');
        });
        it('Should log fatal without throwing errors', () => {
            logger.fatal('It works!');
        });
        it('Should log trace without throwing errors', () => {
            logger.trace('It works!');
        });
    });
    describe('Pretty printing', () => {
        let logger;
        beforeAll(() => {
            process.env.LOGGER_PRETTY_PRINT = 'true';
            process.env.LOGGER_ENV = 'local';
            index_1.LoggerFactory.setDefaultLogCustomContextBuilder(undefined);
            logger = index_1.LoggerFactory.createLogger('MyPrettyLogger');
        });
        afterAll(() => {
            process.env.LOGGER_PRETTY_PRINT = undefined;
        });
        it('Should return a new instance', () => {
            expect(logger).toBeDefined();
        });
        it('Should log without throwing errors', () => {
            logger.info('It works!');
        });
    });
});
//# sourceMappingURL=index.spec.js.map