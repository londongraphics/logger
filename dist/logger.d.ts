export interface ILogger {
    log: {
        info: (message: string) => void;
        error: (message: string) => void;
    };
}
export declare class Logger implements ILogger {
    logName: string;
    directory: string;
    constructor(logName: string, directory: string);
    private myFormat;
    private appendTimestamp;
    private transport;
    log: any;
}
