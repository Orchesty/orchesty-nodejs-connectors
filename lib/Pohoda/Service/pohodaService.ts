import { IResponse, PohodaResponseState } from '../Types/Response';

export function hasResponseErrorMessage(response: IResponse): string | null {
    const responseStatus = response.responsePack.responsePackItem;

    if (responseStatus.state === PohodaResponseState.ERROR) {
        return responseStatus.note as string;
    }

    return null;
}
