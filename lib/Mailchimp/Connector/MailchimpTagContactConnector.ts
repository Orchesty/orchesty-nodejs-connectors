import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
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
                    // eslint-disable-next-line max-len
                    `${apiEndpoint}/3.0/lists/${applicationInstall.getSettings()[AUTHORIZATION_FORM][AUDIENCE_ID]}/segments/${applicationInstall.getSettings()[SEGMENT_ID]}/members`,
                    dto.getData(),
                ),
        );
        const json = output.getJsonBody();
        this.evaluateStatusCode(output, dto);

        dto.setJsonData(json);

        return dto;
    }

}
