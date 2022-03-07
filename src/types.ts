export interface ResponseBody {
    success: boolean,
    memberId?: any,
    errorMessage?: any
}

export interface ReturnValue {
    statusCode: number;
    headers: ReturnHeader;
    body: string;
}

export interface ReturnHeader {
    'Content-Type': string;
    'Access-Control-Allow-Origin': string;
}

export const RETURN_HEADER: ReturnHeader = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
};
