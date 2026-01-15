import {
    IInput as IErrorOutput,
} from '@orchesty/connector-digitoo/src/Connector/DigitooMarkAsExportErrored';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { IResultRanges, StatusRange } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { IContact } from './XeroFindContactConnector';

export const NAME = 'xero-post-contacts-connector';

export default class XeroPostContactsConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IContact>): Promise<ProcessDto<IErrorOutput | IOutput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            'contacts',
            this.getJsonData(dto),
        );
        const resp = await this.getSender().send<IResponse>(req, this.getCodeRange());

        return this.setNewJsonData(dto, resp);
    }

    protected getJsonData(dto: ProcessDto): unknown {
        return dto.getJsonData();
    }

    protected setNewJsonData(dto: ProcessDto, resp: ResponseDto<IResponse>): ProcessDto<IErrorOutput | IOutput> {
        return dto.setNewJsonData({ contact: resp.getJsonBody().Contacts.shift() ?? null });
    }

    protected getCodeRange(): IResultRanges | StatusRange {
        return { success: 200 };
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    contact: IContact | null;
}

export interface IResponse {
    Contacts: IContact[];
    DateTimeUTC: string;
    Id: string;
    ProviderName: string;
    Status: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
