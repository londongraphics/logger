import * as moment from 'moment-timezone'
require('./pkg-fix');

const { createLogger, format, transports } = require('winston');

import * as fs from 'fs';
import * as path from 'path';
require('winston-daily-rotate-file');

export interface ILogger {
    log: {
        info: (message: string) => void,
        error: (message: string) => void;
    }
}

export class Logger implements ILogger {
    constructor(public logName: string, public directory: string){
        try {
            // make location if it doesn't exist
            if (!fs.existsSync(path.join(directory))){
                fs.mkdirSync(path.join(directory));
            }
        } catch (err) {
            console.log(err)
        }
    }
    private myFormat = format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`);

    private appendTimestamp = format((info, opts) => {
        if(opts.tz)
            info.timestamp = moment().tz(opts.tz).format();
        return info;
    });

    private transport = new (transports.DailyRotateFile)({
        filename: `${path.join(this.directory, this.logName)}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        prepend: true,
        maxSize: '20m',
        maxFiles: '7d'
    });

    public log = createLogger({
        level: 'info',
        format: format.combine(
            this.appendTimestamp({tz: 'Europe/London'}),
            this.myFormat
        ),
        transports: [
            new transports.Console(),
            this.transport
        ]
    });
}
