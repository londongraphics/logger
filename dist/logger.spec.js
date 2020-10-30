"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var logger_1 = require("./logger");
var fs = require("fs");
describe('log tests', function () {
    var logger = new logger_1.Logger('Test', './');
    it('should log info', function () {
        logger.log.info('This is a test info message');
    });
    it('should log an error message', function () {
        logger.log.error('this is a test error message');
    });
    it('should create log directory', function () {
        chai_1.expect(fs.existsSync("/var/log/Test")).to.be.true;
    });
});

//# sourceMappingURL=logger.spec.js.map
