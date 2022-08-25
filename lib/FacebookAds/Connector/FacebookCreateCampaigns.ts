import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import FacebookAdsApplication from '../FacebookAdsApplication';

const FACEBOOK_CREATE_CAMPAINGS = '/v12.0/act_REPLACE_ME/campaigns';

interface IFacebookCampaigns {
    name: string;
    objective: string;
    status: number;
    specialAdCategories: string[];
    accountId: string;
}

export default class FacebookCreateCampaigns extends AConnector {

    public getName(): string {
        return 'facebook-create-campaigns';
    }

    public async processAction(dto: ProcessDto<IFacebookCampaigns>): Promise<ProcessDto> {
        checkParams(
            dto.getJsonData(),
            ['name', 'objective', 'status', 'specialAdCategories', 'accountId'],
        );

        const {
            name,
            objective,
            status,
            specialAdCategories,
            accountId,
        } = dto.getJsonData();

        const application = this.getApplication<FacebookAdsApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const data = {
            name,
            objective,
            status,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            special_ad_categories: specialAdCategories,
        };

        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            FACEBOOK_CREATE_CAMPAINGS.replace('REPLACE_ME', accountId),
            JSON.stringify(data),
        );

        const response = await this.getSender().send(request, [200]);
        dto.setData(response.getBody());

        return dto;
    }

}
