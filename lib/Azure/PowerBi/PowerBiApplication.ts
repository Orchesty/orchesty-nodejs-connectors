import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import AAzureApplication from '../AAzureApplication';

export const NAME = 'power-bi';

export default class PowerBiApplication extends AAzureApplication {

    public getDescription(): string {
        return 'Execute event-driven serverless code with an end-to-end development experience';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Microsoft Azure';
    }

    public getRequestDto(
    /* eslint-disable @typescript-eslint/no-unused-vars */
        dto: ProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ): Promise<RequestDto> | RequestDto {
        throw new Error(`Method [${this.getRequestDto.name}] is not supported! Use getConnection method instead!`);
    }

}
