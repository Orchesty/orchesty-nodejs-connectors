import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { IRangeObject } from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import {
    IInput as IErrorOutput,
} from '../../Digitoo/Connector/DigitooMarkAsExportErrored';
import { IContact } from './XeroFindContactConnector';

export const NAME = 'xero-put-contacts-connector';

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
            JSON.stringify(this.getJsonData(dto)),
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

    protected getCodeRange(): IRangeObject[] | number[] | undefined {
        return [200];
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
