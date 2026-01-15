import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import GmailApplication from '../GmailApplication';

export const NAME = 'gmail-get-profile';
const GET_PROFILE_ENDPOINT = 'gmail/v1/users/{userId}/profile';

export default class GmailGetProfile extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        checkParams(
            dto.getJsonData(),
            ['userId'],
        );

        const { userId } = dto.getJsonData();

        const application = this.getApplication<GmailApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.GET,
            GET_PROFILE_ENDPOINT.replace('{userId}', userId),
        );

        const response = await this.getSender().send(request, [200]);
        dto.setData(response.getBody());

        return dto;
    }

}

export interface IInput {
    userId: string;
}
