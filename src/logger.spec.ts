import 'mocha'
import {expect} from "chai";
import {Logger} from './logger';
import * as fs from 'fs'

describe('log tests', () => {
    const logger = new Logger('Test', './');
    it('should log info', () => {
        logger.log.info('This is a test info message')
    });
    it('should log an error message', () => {
        logger.log.error('this is a test error message')
    });
    it('should create log directory', () => {
        expect(fs.existsSync(`/var/log/Test`)).to.be.true;
    })
});
