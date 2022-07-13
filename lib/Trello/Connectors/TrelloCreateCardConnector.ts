import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import HttpMethods from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import TrelloApplication from '../TrelloApplication';

const TRELLO_CREATE_CARD_ENDPOINT = '/1/cards';

interface ITrelloCard {
  idList: string,
  name: string,
  desc: string,
}

export default class TrelloCreateCardConnector extends AConnector {
  public getName = (): string => 'trello-create-card';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;
    checkParams(
      dto.jsonData as Record<string, unknown>,
      ['idList', 'desc', 'name'],
    );

    const {
      idList,
      desc,
      name,
    } = dto.jsonData as ITrelloCard;
    const query = new URLSearchParams({ idList, desc, name });

    const application = this._application as TrelloApplication;
    const applicationInstall = await this._getApplicationInstallFromProcess(dto);

    const request = await application.getRequestDto(
      dto,
      applicationInstall,
      HttpMethods.POST,
      `${TRELLO_CREATE_CARD_ENDPOINT}?${query.toString()}`,
    );

    const response = await this._sender.send(request, [200]);
    dto.data = response.body;
    return dto;
  }
}
