import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ZendeskTrigger } from '../types/trigger.types';

export const ZENDESK_CREATE_TRIGGER = 'zendesk-create-trigger-connector';

export default class ZendeskCreateTriggerConnector extends AConnector {

    public getName(): string {
        return ZENDESK_CREATE_TRIGGER;
    }

    public async processAction(
        dto: ProcessDto<ZendeskCreateTriggerInput>,
    ): Promise<ProcessDto<ZendeskCreateTriggerOutput>> {
        const data = this.getData(dto);

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            '/triggers',
            data,
        );
        const resp = await this.getSender().send<Response>(req);

        return this.setResponse(dto, resp.getJsonBody());
    }

    protected getData(dto: ProcessDto<ZendeskCreateTriggerInput>): ZendeskCreateTriggerInput {
        return dto.getJsonData();
    }

    protected setResponse(dto: ProcessDto, data: Response): ProcessDto<ZendeskCreateTriggerOutput> {
        return dto.setNewJsonData(data.trigger);
    }

}

interface Response {
    trigger: ZendeskTrigger;
}

export type ZendeskCreateTriggerInput = Pick<ZendeskTrigger, 'actions' | 'category_id' | 'conditions' | 'title'>

export type ZendeskCreateTriggerOutput = ZendeskTrigger;
