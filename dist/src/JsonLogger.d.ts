import * as Logger from 'bunyan';
import { CustomContextBuilderInterface } from './CustomContextBuilder.interface';
export declare class JsonLogger {
    private readonly bunyanLogger;
    private readonly customContextBuilder?;
    constructor(bunyanLogger: Logger, customContextBuilder?: CustomContextBuilderInterface);
    info(context: any, message?: string): void;
    error(context: any, trace?: string, message?: string): void;
    warn(context: any, message?: string): void;
    debug(context: any, message?: string): void;
    trace(context: any, message?: string): void;
    fatal(context: any, message?: string): void;
    private getBunyanParams;
    private getDefaultContextObject;
}
