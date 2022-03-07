export const logInfo = (message: string, context: LogContext, data?: any) => {
    console.info({ message, logLevel: 'INFO', context, data });
};

export const logAudit = (message: string, context: LogContext, data?: any) => {
    console.info({ message, logLevel: 'AUDIT', context, data });
};

export const logWarn = (message: string, context: LogContext, data?: any) => {
    console.warn({ message, logLevel: 'WARN', context, data });
};

export const logError = (message: string, context: LogContext, data?: any) => {
    console.error({ message, logLevel: 'ERROR', context, data });
};

export const logDebug = (message: string, context: LogContext, data?: any) => {
    console.debug({ message, logLevel: 'DEBUG', context, data });
};

/* istanbul ignore next */
export const logAPI = (apiLog: APILogContext[]) => {
    return new Promise(async function (resolve, reject) {
        let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("POST", process.env.SECURE_BASE_URL + '/api-log');
        xhr.setRequestHeader('x-api-key', process.env.SECURE_API_KEY);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = evt => {
            resolve(JSON.parse(xhr.responseText));
        }
        xhr.onerror = evt => {
            reject(evt);
        }
        xhr.send(JSON.stringify(apiLog));
    });
}

/* istanbul ignore next */
export interface APILogContext {
    logDate?: string;
    logGroupId?: number;
    loggingFunction: string;
    apiEndpoint: string;
    httpMethod: string;
    apiPartnerCode: string;
    direction: string; // inbound, outbound
    requestBody?: any;
    responseBody?: any;
    httpStatusCode: number;
    errorDescription?: string;
    httpHeaders?: any;
    pathParameters?: any;
    queryParameters?: any;
}

export interface LogContext {

}