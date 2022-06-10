import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import ACommonNode from 'pipes-nodejs-sdk/dist/lib/Commons/ACommonNode';

interface IInputJson {
  company: { name: string }
  email: string,
  name: string,
  website: string,
}

export default class HubSpotCreateContactMapper extends ACommonNode {
  public getName = (): string => 'hub-spot-create-contact-mapper';

  public processAction = (_dto: ProcessDto): Promise<ProcessDto> | ProcessDto => {
    const dto = _dto;
    const body = (dto.jsonData as IInputJson);
    const name = body.name.split(' ');

    dto.jsonData = {
      properties: {
        company: body.company.name,
        email: body.email,
        firstname: name[0] ?? '',
        lastname: name[1] ?? '',
        website: body.website,
      },
    };

    return dto;
  };
}
