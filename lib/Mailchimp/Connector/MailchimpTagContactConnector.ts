import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { API_KEYPOINT, AUDIENCE_ID, SEGMENT_ID } from '../MailchimpApplication';

export default class MailchimpTagContactConnector extends AConnector {

    public getName(): string {
        return 'mailchimp-tag-contact';
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const apiEndpoint = applicationInstall.getSettings()[API_KEYPOINT];

        const output = await this.getSender().send(
            await this.getApplication()
                .getRequestDto(
                    dto,
                    applicationInstall,
                    HttpMethods.POST,

                    `${apiEndpoint}/3.0/lists/${applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][AUDIENCE_ID]}/segments/${applicationInstall.getSettings()[SEGMENT_ID]}/members`,
                    dto.getData(),
                ),
            { success: '200-201' },
        );
        const json = output.getJsonBody();

        dto.setJsonData(json);

        return dto;
    }

}
