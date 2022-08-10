import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'sendinblue-send-email-connector';

export default class SendinblueSendEmailConnector extends AConnector {
    public getName = (): string => NAME;

    public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
        const dto = _dto;

        return dto;
    }
}
