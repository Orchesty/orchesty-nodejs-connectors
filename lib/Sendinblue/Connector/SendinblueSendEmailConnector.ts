import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'sendinblue-send-email-connector';

export default class SendinblueSendEmailConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const body = dto.getJsonData();

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const url = 'smtp/email';
        const req = await this.getApplication().getRequestDto(dto, appInstall, HttpMethods.POST, url, body);
        const resp = await this.getSender().send<IOutput>(req, [201]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export interface IInput {
    sender: {
        name: string;
        email: string;
        id: number;
    };
    to: {
        email: string;
        name: string;
    }[];
    bcc: {
        email: string;
        name: string;
    }[];
    cc: {
        email: string;
        name: string;
    }[];
    htmlContent: string;
    textContent: string;
    subject: string;
    replyTo: {
        email: string;
        name: string;
    };
    attachment: {
        url: string;
        content: string;
        name: string;
    }[];
    templateId: number;
    params: {
        FNAME: string;
        LNAME: string;
    };
    messageVersions: {
        to: {
            email: string;
            name: string;
        }[];
        params: {
            FNAME: string;
            LNAME: string;
        };
        bcc: {
            email: string;
            name: string;
        }[];
        cc: {
            email: string;
            name: string;
        }[];
        replyTo: {
            email: string;
            name: string;
        };
        subject: string;
    }[];
    tags: string[];
    scheduledAt: Date;
    batchId: string;
}

export interface IOutput {
    messageId: string;
}
