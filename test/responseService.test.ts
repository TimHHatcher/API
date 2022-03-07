import { ResponseService } from '../src/responseService'
import { ReturnValue, ResponseBody } from '../src/types';
import { expect } from 'chai';

let response: ResponseService;

beforeEach(async () => {
    response = new ResponseService({ apiCallerId: '12345' });
})
describe('Response tests', () => {

    it('default response', async () => {

        let returnValue: ReturnValue = response.returnValue;
        let responseBody: ResponseBody = JSON.parse(response.returnValue.body);

        expect(returnValue.statusCode).to.equal(200);
        expect(returnValue.headers["Content-Type"]).to.equal('application/json');
        expect(returnValue.headers["Access-Control-Allow-Origin"]).to.equal('*');
        expect(responseBody.success).to.equal(true);
        expect(responseBody.errorMessage).to.be.null;
    });

    it('invalid response', async () => {
        let invalidMessage: string = 'Details about invalid request.';
        response.set400Response(invalidMessage, new Error('test error'));

        let returnValue: ReturnValue = response.returnValue;
        let responseBody: ResponseBody = JSON.parse(response.returnValue.body);
        console.log(`Check status code: ${returnValue.statusCode}`);

        expect(returnValue.statusCode).to.equal(400);
        expect(returnValue.headers["Content-Type"]).to.equal('application/json');
        expect(returnValue.headers["Access-Control-Allow-Origin"]).to.equal('*');
        expect(responseBody.success).to.equal(false);
        expect(responseBody.errorMessage).to.equal(invalidMessage);
    });

    it('error response', async () => {
        let errorMessage: string = 'Details about captured error.';
        response.set500Response(errorMessage, new Error('test error'));

        let returnValue: ReturnValue = response.returnValue;
        let responseBody: ResponseBody = JSON.parse(response.returnValue.body);
        console.log(`Check status code: ${returnValue.statusCode}`);

        expect(returnValue.statusCode).to.equal(500);
        expect(returnValue.headers["Content-Type"]).to.equal('application/json');
        expect(returnValue.headers["Access-Control-Allow-Origin"]).to.equal('*');
        expect(responseBody.success).to.equal(false);
        expect(responseBody.errorMessage).to.equal(errorMessage);
    });

    it('getReturnValue', async () => {
        let errorMessage: string = 'Details about captured error.';
        response.set500Response(errorMessage, new Error('test error'));

        let returnValue: ReturnValue = response.getReturnValue();
        let responseBody: ResponseBody = JSON.parse(response.returnValue.body);
        console.log(`Check status code: ${returnValue.statusCode}`);

        expect(returnValue.statusCode).to.equal(500);
        expect(returnValue.headers["Content-Type"]).to.equal('application/json');
        expect(returnValue.headers["Access-Control-Allow-Origin"]).to.equal('*');
        expect(responseBody.success).to.equal(false);
        expect(responseBody.errorMessage).to.equal(errorMessage);
    });
})