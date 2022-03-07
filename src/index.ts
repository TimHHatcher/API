import { ResponseService } from './responseService';

export const handler = async (event: any = {}): Promise<any> => {
    let responseService: ResponseService = new ResponseService(null);
    try {
    } catch (err) {
        responseService.set500Response('Error in index.handler', err);
    } finally {
        return responseService.getReturnValue();
    }
}