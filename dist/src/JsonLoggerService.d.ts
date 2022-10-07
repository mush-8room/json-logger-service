import { LoggerService } from '@nestjs/common';
import { CustomContextBuilderInterface } from './CustomContextBuilder.interface';
export declare class JsonLoggerService implements LoggerService {
    private logger;
    constructor(name: string, customContextBuilder?: CustomContextBuilderInterface);
    log(message: any, context?: string): any;
    error(message: any, trace?: string, context?: string): any;
    warn(message: any, context?: string): any;
    debug?(message: any, context?: string): any;
    verbose?(message: any, context?: string): any;
}
