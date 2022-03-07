import { LogContext, logInfo, logWarn, logError, logAudit, logDebug } from '../src/logger';
const chai = require('chai')
    , spies = require('chai-spies');
const expect = chai.expect
chai.use(spies);

const logContext: LogContext = {

};

describe('logger tests', () => { // the tests container

    it('log info ', async () => {
        chai.spy.restore();
        chai.spy.on(console, ['info', 'error', 'debug', 'warn']);
        logInfo('message', logContext, {});
        expect(console.info).to.have.been.called.once;
    });

    it('log audit ', async () => {
        chai.spy.restore();
        chai.spy.on(console, ['info', 'error', 'debug', 'warn']);
        logAudit('message', logContext, {});
        expect(console.info).to.have.been.called.once;
    });

    it('log warn ', async () => {
        chai.spy.restore();
        chai.spy.on(console, ['info', 'error', 'debug', 'warn']);
        logWarn('message', logContext, {});
        expect(console.warn).to.have.been.called.once;
    });

    it('log error ', async () => {
        chai.spy.restore();
        chai.spy.on(console, ['info', 'error', 'debug', 'warn']);
        logError('message', logContext, {});
        expect(console.error).to.have.been.called.once;
    });

    it('log debug ', async () => {
        chai.spy.restore();
        chai.spy.on(console, ['info', 'error', 'debug', 'warn']);
        logDebug('message', logContext, {});
        expect(console.debug).to.have.been.called.once;
    });


})