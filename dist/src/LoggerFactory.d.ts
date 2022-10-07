import { JsonLogger } from "./JsonLogger";
import { CustomContextBuilderInterface } from "./CustomContextBuilder.interface";
export declare class LoggerFactory {
    static defaultCustomContextBuilder: CustomContextBuilderInterface;
    static setDefaultLogCustomContextBuilder(defaultCustomContextBuilder: CustomContextBuilderInterface): void;
    static createLogger(name: string, customContextBuilder?: CustomContextBuilderInterface): JsonLogger;
}
