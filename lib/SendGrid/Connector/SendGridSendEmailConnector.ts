import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import SendGridApplication, { BASE_URL } from '../SendGridApplication';

interface IInput {
    email: string;
    name: string;
    subject: string;
}

export default class SendGridSendEmailConnector extends AConnector {

    public getName(): string {
        return 'send-grid-send-email';
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const data = dto.getJsonData();
        if (!(data.email && data.name && data.subject)) {
            throw new Error('Some data is missing. Keys [email, name, subject] is required.');
        }

        const body = {
            personalizations: [
                {
                    to: [{
                        email: data.email,
                        name: data.name,
                    }],
                    subject: data.subject,
                },
            ],
            from:
                {
                    email: 'noreply@johndoe.com',
                    name: 'John Doe',
                },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            reply_to:
                {
                    email: 'noreply@johndoe.com',
                    name: 'John Doe',
                },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            template_id: '1',
        };

        const url = `${BASE_URL}/mail/send`;
        const request = await this.getApplication<SendGridApplication>()
            .getRequestDto(dto, applicationInstall, HttpMethods.POST, url, JSON.stringify(body));

        const response = await this.getSender().send(request);
        if (!this.evaluateStatusCode(response, dto)) {
            return dto;
        }

        return dto.setNewJsonData(response.getBody());
    }

}
