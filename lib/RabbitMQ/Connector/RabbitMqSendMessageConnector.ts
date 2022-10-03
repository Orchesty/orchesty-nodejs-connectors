import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import RabbitMqApplication from '../RabbitMqApplication';

export const NAME = 'rabbitmq-send-message-connector';

export default class RabbitMqSendMessageConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        // const a = new Promise((resolve, reject) => {
        //     connect('amqp://guest:guest@172.29.0.3', (err, conn) => {
        //         if (err) throw err;
        //
        //         // Sender
        //         conn.createChannel((err, ch1) => {
        //             if (err) throw err;
        //
        //             ch1.checkQueue(queue, (err) => {
        //                 if (err) {
        //                     conn.createChannel((err, ch2) => {
        //                         ch2.assertQueue(queue);
        //                         ch2.sendToQueue(queue, Buffer.from('something to do'));
        //                         resolve(true);
        //                     });
        //                 } else {
        //                     ch1.sendToQueue(queue, Buffer.from('something to do'));
        //                     resolve(true);
        //                 }
        //             });
        //         });
        //     });
        // });
        //
        // await a;

        // const ch1 = await conn.createChannel();
        // await ch1.checkQueue(queue);

        // const ch2 = await conn.createChannel();
        //
        // try {
        //     await ch2.checkQueue(queue);
        // } catch (e) {
        //     return dto;
        // }
        // // Sender
        //
        // setInterval(() => {
        //     ch2.sendToQueue(queue, Buffer.from('something to do'));
        // }, 1000);

        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const { queue, ...res } = dto.getJsonData();
        const q = await this.getApplication<RabbitMqApplication>().getQueue(appInstall, queue);
        await q.publish(JSON.stringify(res));

        return dto;
    }

}

export interface IInput {
    queue: string;
}
