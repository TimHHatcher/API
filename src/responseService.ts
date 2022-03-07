import { ReturnValue, ResponseBody, RETURN_HEADER } from './types';
import { logInfo, logError, LogContext } from './logger';

export class ResponseService {
    returnValue: ReturnValue;
    responseBody: ResponseBody;
    isValid: boolean;
    logContext: LogContext;

    constructor(logContext: LogContext) {
        this.logContext = logContext;
        this.initializeResponseBody();
        this.initializeResponse();
        this.isValid = true;
    }

    private initializeResponseBody() {
        this.responseBody = {
            success: true,
            memberId: null,
            errorMessage: null
        };
    }

    private initializeResponse() {
        this.returnValue = {
            statusCode: 200,
            headers: RETURN_HEADER,
            body: JSON.stringify(this.responseBody, null, 2)
        };
    }

    set400Response(invalidMessage: string, error: unknown) {
        this.returnValue.statusCode = 400;
        this.responseBody.success = false;
        this.responseBody.errorMessage = invalidMessage;
        this.responseBody.memberId = null;
        this.isValid = false;

        logError(`Invalid request received: ${invalidMessage}`, this.logContext, error);
        this.returnValue.body = JSON.stringify(this.responseBody, null, 2);
    }

    set500Response(errorMessage: string, error: unknown) {
        this.returnValue.statusCode = 500;
        this.responseBody.success = false;
        this.responseBody.errorMessage = errorMessage;
        this.responseBody.memberId = null;
        logError(`Error: ${errorMessage}`, this.logContext, error);
        this.returnValue.body = JSON.stringify(this.responseBody, null, 2);
    }

    getReturnValue(): ReturnValue {
        this.returnValue.body = JSON.stringify(this.responseBody, null, 2);
        return this.returnValue;
    }
}