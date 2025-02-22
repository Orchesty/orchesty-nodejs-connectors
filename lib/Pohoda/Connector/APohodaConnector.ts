import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { StatusCodes } from 'http-status-codes';
import { checkErrorInResponse, ICO, jsonToXml, xmlToJson } from '../PohodaApplication';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export default abstract class APohodaConnector<IInput, IOutput, IResponse extends object> extends AConnector {

    protected abstract getSchema(): string;

    protected abstract createItemData(dto: ProcessDto<IInput>): Promise<object>;

    protected abstract getItemData(data: IResponse): IOutput;

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const requestDto = await this.getApplication().getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            'xml',
            jsonToXml(await this.createData(dto, applicationInstall)),
        );

        const responseDto = await this.getSender().send(requestDto, [StatusCodes.OK]);
        const response = xmlToJson<IBaseResponse<IResponse>>(responseDto.getBuffer());

        const { responsePack } = response;
        checkErrorInResponse(responsePack);

        const { responsePackItem } = responsePack;
        checkErrorInResponse(responsePackItem);

        return dto.setNewJsonData(this.getItemData(responsePackItem));
    }

    protected async createData(dto: ProcessDto<IInput>, applicationInstall: ApplicationInstall): Promise<object> {
        const ico = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][ICO];

        return {
            /* eslint-disable @typescript-eslint/naming-convention */
            'data:dataPack': {
                '@_xmlns:data': 'http://www.stormware.cz/schema/version_2/data.xsd',
                '@_xmlns:filter': 'http://www.stormware.cz/schema/version_2/filter.xsd',
                '@_xmlns:itemData': this.getSchema(),
                '@_id': 'Orchesty',
                '@_ico': ico,
                '@_application': 'Orchesty',
                '@_note': 'Orchesty',
                '@_version': '2.0',
                ...await this.getCustomDataPackAttributes(dto),
                'data:dataPackItem': {
                    '@_id': 'Orchesty',
                    '@_version': '2.0',
                    ...await this.getCustomDataPackItemAttributes(dto),
                    ...await this.createItemData(dto),
                },
            },
            /* eslint-enable @typescript-eslint/naming-convention */
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getCustomDataPackAttributes(dto: ProcessDto<IInput>): Promise<object> {
        return {};
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getCustomDataPackItemAttributes(dto: ProcessDto<IInput>): Promise<object> {
        return {};
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
    protected async getCustomRequestAttributes(dto: ProcessDto<IInput>): Promise<object> {
        return {};
    }

}

interface IBaseResponse<IResponse> {
    responsePack: {
        responsePackItem: IResponse;
    };
}
