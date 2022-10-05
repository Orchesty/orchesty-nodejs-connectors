import ACommonNode from '@orchesty/nodejs-sdk/dist/lib/Commons/ACommonNode';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import RabbitMqApplication, { IQueueArguments } from '../RabbitMqApplication';

export const NAME = 'rabbitmq-send-message-custom-node';

export default class RabbitMqSendMessageCustomNode extends ACommonNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { queue, queueParams, ...res } = dto.getJsonData();
        const q = await this.getApplication<RabbitMqApplication>().getQueue(appInstall, queue, queueParams);
        await q.publish(JSON.stringify(res));
        return dto;
    }

}

export interface IInput {
    queue: string;
    queueParams?: IQueueArguments;
}
