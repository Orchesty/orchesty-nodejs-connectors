import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import TrelloApplication from '../TrelloApplication';

const TRELLO_CREATE_CARD_ENDPOINT = '/1/cards';

interface ITrelloCard {
    idList: string;
    name: string;
    desc: string;
}

export default class TrelloCreateCardConnector extends AConnector {

    public getName(): string {
        return 'trello-create-card';
    }

    public async processAction(dto: ProcessDto<ITrelloCard>): Promise<ProcessDto> {
        checkParams(
            dto.getJsonData(),
            ['idList', 'desc', 'name'],
        );

        const {
            idList,
            desc,
            name,
        } = dto.getJsonData();
        const query = new URLSearchParams({ idList, desc, name });

        const application = this.getApplication<TrelloApplication>();
        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const request = await application.getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            `${TRELLO_CREATE_CARD_ENDPOINT}?${query.toString()}`,
        );

        const response = await this.getSender().send(request, [200]);
        dto.setData(response.getBody());

        return dto;
    }

}
