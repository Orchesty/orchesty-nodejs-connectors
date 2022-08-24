import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { USER } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { checkParams } from '@orchesty/nodejs-sdk/dist/lib/Utils/Validations';
import FormData from 'form-data';
import { BASE_URL } from '../TwilioApplication';

const TWILIO_SEND_MESSAGE_ENDPOINT = 'Accounts/{AccountSid}/Messages';

interface ITwilioMessage {
    body: string;
    from: string;
    statusCallback: string;
    to: string;
}

export default class TwilioSendMessage extends AConnector {

    public getName(): string {
        return 'twilio-send-message';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE1MCAxNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojQ0YyNzJEO30KPC9zdHlsZT4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNzUsMTMwLjJjLTMwLjUsMC01NS4yLTI0LjctNTUuMi01NS4yYzAtMzAuNSwyNC43LTU1LjIsNTUuMi01NS4yYzMwLjUsMCw1NS4yLDI0LjcsNTUuMiw1NS4yCgkJQzEzMC4yLDEwNS41LDEwNS41LDEzMC4yLDc1LDEzMC4yTDc1LDEzMC4yeiBNNzUsMEMzMy42LDAsMCwzMy42LDAsNzVjMCw0MS40LDMzLjYsNzUsNzUsNzVjNDEuNCwwLDc1LTMzLjYsNzUtNzUKCQlDMTUwLDMzLjYsMTE2LjQsMCw3NSwwTDc1LDB6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNzguMSw1Ni4zYzAtOC42LDctMTUuNiwxNS42LTE1LjZzMTUuNiw3LDE1LjYsMTUuNmMwLDguNi03LDE1LjYtMTUuNiwxNS42Uzc4LjEsNjQuOSw3OC4xLDU2LjMgTTc4LjEsOTMuNwoJCWMwLTguNiw3LTE1LjYsMTUuNi0xNS42czE1LjYsNywxNS42LDE1LjZjMCw4LjYtNywxNS42LTE1LjYsMTUuNlM3OC4xLDEwMi4zLDc4LjEsOTMuNyBNNDAuNyw5My43YzAtOC42LDctMTUuNiwxNS42LTE1LjYKCQljOC42LDAsMTUuNiw3LDE1LjYsMTUuNmMwLDguNi03LDE1LjYtMTUuNiwxNS42QzQ3LjcsMTA5LjMsNDAuNywxMDIuMyw0MC43LDkzLjcgTTQwLjcsNTYuM2MwLTguNiw3LTE1LjYsMTUuNi0xNS42CgkJYzguNiwwLDE1LjYsNywxNS42LDE1LjZjMCw4LjYtNywxNS42LTE1LjYsMTUuNkM0Ny43LDcxLjksNDAuNyw2NC45LDQwLjcsNTYuMyIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    public async processAction(dto: ProcessDto<ITwilioMessage>): Promise<ProcessDto> {
        checkParams(
            dto.getJsonData(),
            ['body', 'from', 'to'],
        );

        const {
            body,
            from,
            to,
        } = dto.getJsonData();

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);

        const form = new FormData();
        form.append('From', from);
        form.append('To', to);
        form.append('Body', body);

        const request = await this.getApplication().getRequestDto(
            dto,
            applicationInstall,
            HttpMethods.POST,
            `${BASE_URL}/${TWILIO_SEND_MESSAGE_ENDPOINT.replace(
                '{AccountSid}',
                applicationInstall.getSettings()[AUTHORIZATION_FORM][USER],
            )}`,
            form,
        );

        const response = await this.getSender().send(request, [201]);
        dto.setData(response.getBody());

        return dto;
    }

}
