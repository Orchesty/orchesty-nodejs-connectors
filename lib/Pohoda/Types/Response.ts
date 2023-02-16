export enum PohodaResponseState {
    ERROR = 'error',
    OK = 'ok',
    WARNING = 'warning',
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IResponse<IOutput = unknown> {
    '?xml': { version: string; encoding: string };
    responsePack: {
        id: string;
        state: PohodaResponseState;
        version: string;
        responsePackItem: {
            state: PohodaResponseState;
            version: string;
            note?: string;
            listInvoice?: IOutput;
            invoiceResponse?: IOutput;
        };
    };
}
