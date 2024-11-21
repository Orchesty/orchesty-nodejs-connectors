import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const ZENDESK_DELETE_TRIGGER = 'zendesk-delete-trigger-connector';

export default class ZendeskDeleteTriggerConnector extends AConnector {

    public getName(): string {
        return ZENDESK_DELETE_TRIGGER;
    }

    public async processAction(
        dto: ProcessDto<ZendeskDeleteTriggerInput>,
    ): Promise<ProcessDto<ZendeskDeleteTriggerOutput>> {
        const data = this.getData(dto);

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.DELETE,
            `triggers/${data.id}`,
            {
                trigger: data,
            },
        );
        await this.getSender().send(req);

        return this.setResponse(dto);
    }

    protected getData(dto: ProcessDto<ZendeskDeleteTriggerInput>): ZendeskDeleteTriggerInput {
        return dto.getJsonData();
    }

    protected setResponse(dto: ProcessDto<ZendeskDeleteTriggerInput>): ProcessDto<ZendeskDeleteTriggerOutput> {
        return dto;
    }

}

export interface ZendeskDeleteTriggerInput {
    id: string | number;
}

export type ZendeskDeleteTriggerOutput = ZendeskDeleteTriggerInput;
