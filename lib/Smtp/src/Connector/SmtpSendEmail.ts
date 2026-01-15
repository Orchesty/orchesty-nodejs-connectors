import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { MailOptions as IInput } from 'nodemailer/lib/sendmail-transport';
import SmtpApplication from '../SmtpApplication';

export const NAME = 'smtp-send-email';

export default class SmtpSendEmail extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const conn = this.getApplication<SmtpApplication>().getConnection(appInstall);

        const res = await conn.sendMail(dto.getJsonData());

        return dto.setNewJsonData(res);
    }

}
