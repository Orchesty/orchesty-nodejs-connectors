import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'marketo-create-email-connector';

export default class MarketoCreateEmailConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication().getRequestDto(
            dto,
            appInstall,
            HttpMethods.POST,
            '/asset/v1/emails.json',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IOutput>(req, [200]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    description: string;
    folder: {
        id: number;
        type: string;
    };
    fromEmail: string;
    fromName: string;
    name: string;
    operational: boolean;
    replyEmail: string;
    subject: string;
    template: number;
    textOnly: string;
}

export interface IOutput {
    errors: {
        code: string;
        message: string;
    }[];
    requestId: string;
    result: {
        createdAt: Date;
        description: string;
        folder: {
            id: 0;
            type: string;
        };
        fromEmail: {
            type: string;
            value: string;
        };
        fromName: {
            type: string;
            value: string;
        };
        id: number;
        name: string;
        operational: boolean;
        publishToMSI: boolean;
        replyEmail: {
            type: string;
            value: string;
        };
        status: string;
        subject: {
            type: string;
            value: string;
        };
        template: number;
        textOnly: boolean;
        updatedAt: Date;
        url: string;
        version: number;
        webView: boolean;
        workspace: string;
        autoCopyToText: boolean;
        isOpenTrackingDisabled: boolean;
        preHeader: string;
        ccFields: {
            attributeId: string;
            objectName: string;
            displayName: string;
            apiName: string;
        }[];
    }[];
    success: boolean;
    warnings: string[];
}
