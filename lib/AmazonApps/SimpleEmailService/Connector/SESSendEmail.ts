import { SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import SESApplication from '../SESApplication';

export const NAME = 'ses-send-email';

export default class SESSendEmail extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const content = dto.getJsonData();

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const application = this.getApplication<SESApplication>();
        const client = application.getSESClient(applicationInstall);
        const command = new SendEmailCommand(content);

        try {
            await client.send(command);
        } catch (e) {
            throw new OnRepeatException(60, 10, (e as Error)?.message ?? 'Unknown error.');
        }

        return dto;
    }

}

export type IInput = SendEmailCommandInput;
