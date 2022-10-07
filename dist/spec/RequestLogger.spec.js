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
const ts_mockito_1 = require("ts-mockito");
describe('RequestLogger tests', () => {
    let requestLogger;
    let nextCalled;
    let loggerMock;
    const nextFunction = () => {
        nextCalled = true;
    };
    const responseMock = {
        socket: {
            finished: true,
        },
    };
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        loggerMock = (0, ts_mockito_1.mock)(index_1.JsonLogger);
        requestLogger = index_1.RequestLogger.buildExpressRequestLogger({ jsonLogger: (0, ts_mockito_1.instance)(loggerMock) });
        nextCalled = false;
    }));
    describe('When request is undefined', () => {
        beforeEach(() => {
            requestLogger(undefined, undefined, nextFunction);
        });
        it('Should return without failing', () => {
            expect(nextCalled).toBeTruthy();
            (0, ts_mockito_1.verify)(loggerMock.info((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            (0, ts_mockito_1.verify)(loggerMock.warn('No request path defined.')).once();
            (0, ts_mockito_1.verify)(loggerMock.error((0, ts_mockito_1.anything)())).never();
        });
    });
    describe('When path is undefined', () => {
        beforeEach(() => {
            requestLogger({ path: undefined }, undefined, nextFunction);
        });
        it('Should return without failing', () => {
            expect(nextCalled).toBeTruthy();
            (0, ts_mockito_1.verify)(loggerMock.info((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
            (0, ts_mockito_1.verify)(loggerMock.warn('No request path defined.')).once();
            (0, ts_mockito_1.verify)(loggerMock.error((0, ts_mockito_1.anything)())).never();
        });
    });
    describe('When path is defined', () => {
        beforeEach(() => {
            requestLogger({ path: '/mypath' }, responseMock, nextFunction);
        });
        it('Should log path', (done) => {
            setTimeout(() => {
                expect(nextCalled).toBeTruthy();
                (0, ts_mockito_1.verify)(loggerMock.info((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).twice();
                const capturedInputs = (0, ts_mockito_1.capture)(loggerMock.info);
                assertInfoMessageEquals(capturedInputs.first(), { uri: '/mypath' }, 'Before request  \'/mypath\'');
                assertInfoMessageEquals(capturedInputs.second(), { uri: '/mypath' }, 'After request  \'/mypath\'');
                (0, ts_mockito_1.verify)(loggerMock.warn((0, ts_mockito_1.anything)())).never();
                (0, ts_mockito_1.verify)(loggerMock.error((0, ts_mockito_1.anything)())).never();
                done();
            }, 200);
        });
    });
    describe('When path and method is defined', () => {
        beforeEach(() => {
            requestLogger({ path: '/mypath', method: 'GET' }, responseMock, nextFunction);
        });
        it('Should log path and method', (done) => {
            setTimeout(() => {
                expect(nextCalled).toBeTruthy();
                (0, ts_mockito_1.verify)(loggerMock.info((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).twice();
                const capturedInputs = (0, ts_mockito_1.capture)(loggerMock.info);
                assertInfoMessageEquals(capturedInputs.first(), { uri: '/mypath' }, 'Before request GET \'/mypath\'');
                assertInfoMessageEquals(capturedInputs.second(), { uri: '/mypath' }, 'After request GET \'/mypath\'');
                (0, ts_mockito_1.verify)(loggerMock.warn((0, ts_mockito_1.anything)())).never();
                (0, ts_mockito_1.verify)(loggerMock.error((0, ts_mockito_1.anything)())).never();
                done();
            }, 200);
        });
    });
    describe('When path should not be logged', () => {
        beforeEach(() => {
            requestLogger = index_1.RequestLogger.buildExpressRequestLogger({ doNotLogPaths: ['/mypath/do-not-log'], jsonLogger: (0, ts_mockito_1.instance)(loggerMock) });
            requestLogger({ path: '/mypath/do-not-log/customerEmail@gmail.com', method: 'GET' }, responseMock, nextFunction);
        });
        it('Should return without logging', (done) => {
            setTimeout(() => {
                expect(nextCalled).toBeTruthy();
                (0, ts_mockito_1.verify)(loggerMock.info((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).never();
                (0, ts_mockito_1.verify)(loggerMock.warn((0, ts_mockito_1.anything)())).never();
                (0, ts_mockito_1.verify)(loggerMock.error((0, ts_mockito_1.anything)())).never();
                done();
            }, 200);
        });
    });
    describe('When path should log only base url', () => {
        beforeEach(() => {
            requestLogger = index_1.RequestLogger.buildExpressRequestLogger({
                logOnlyBasePaths: ['/mypath/log-only-base-path'],
                jsonLogger: (0, ts_mockito_1.instance)(loggerMock),
            });
            requestLogger({ path: '/mypath/log-only-base-path/customerEmail@gmail.com', method: 'GET' }, responseMock, nextFunction);
        });
        it('Should log only the base path, instead of the full path', (done) => {
            setTimeout(() => {
                expect(nextCalled).toBeTruthy();
                (0, ts_mockito_1.verify)(loggerMock.info((0, ts_mockito_1.anything)(), (0, ts_mockito_1.anything)())).twice();
                const capturedInputs = (0, ts_mockito_1.capture)(loggerMock.info);
                assertInfoMessageEquals(capturedInputs.first(), { uri: '/mypath/log-only-base-path' }, 'Before request GET \'/mypath/log-only-base-path\'');
                assertInfoMessageEquals(capturedInputs.second(), { uri: '/mypath/log-only-base-path' }, 'After request GET \'/mypath/log-only-base-path\'');
                (0, ts_mockito_1.verify)(loggerMock.warn((0, ts_mockito_1.anything)())).never();
                (0, ts_mockito_1.verify)(loggerMock.error((0, ts_mockito_1.anything)())).never();
                done();
            }, 200);
        });
    });
});
const assertInfoMessageEquals = (message, expectedContext, expectedMessage) => {
    expect(message[0]).toEqual(expectedContext);
    expect(message[1]).toEqual(expectedMessage);
};
//# sourceMappingURL=RequestLogger.spec.js.map