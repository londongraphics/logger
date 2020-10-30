"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment-timezone");
require('./pkg-fix');
var _a = require('winston'), createLogger = _a.createLogger, format = _a.format, transports = _a.transports;
var fs = require("fs");
var path = require("path");
require('winston-daily-rotate-file');
var Logger = /** @class */ (function () {
    function Logger(logName, directory) {
        this.logName = logName;
        this.directory = directory;
        this.myFormat = format.printf(function (info) { return info.timestamp + " [" + info.level + "]: " + info.message; });
        this.appendTimestamp = format(function (info, opts) {
            if (opts.tz)
                info.timestamp = moment().tz(opts.tz).format();
            return info;
        });
        this.transport = new (transports.DailyRotateFile)({
            filename: path.join(this.directory, this.logName) + "-%DATE%.log",
            datePattern: 'YYYY-MM-DD',
            prepend: true,
            maxSize: '20m',
            maxFiles: '7d'
        });
        this.log = createLogger({
            level: 'info',
            format: format.combine(this.appendTimestamp({ tz: 'Europe/London' }), this.myFormat),
            transports: [
                new transports.Console(),
                this.transport
            ]
        });
        try {
            // make location if it doesn't exist
            if (!fs.existsSync(path.join(directory))) {
                fs.mkdirSync(path.join(directory));
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return Logger;
}());
exports.Logger = Logger;

//# sourceMappingURL=logger.js.map
