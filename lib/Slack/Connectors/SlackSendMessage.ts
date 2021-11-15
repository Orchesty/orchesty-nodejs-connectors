import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';

export default class SlackSendMessage extends AConnector {
  public getName = (): string => 'slack-send-message';
  
  public processAction(dto: ProcessDto): Promise<ProcessDto> | ProcessDto {
    const _dto = dto;
    
    return dto;
  }
  
}
