import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { IInput as IEvent } from '../Connector/OutlookCreateEvent';
import OutlookApplication from '../OutlookApplication';

export const NAME = 'outlook-get-events';
export const LAST_RUN_KEY = 'lastRunListEvents';
const LIMIT = 1000;

export default class OutlookGetEvents extends ABatchNode {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const lastRun = appInstall.getNonEncryptedSettings()[LAST_RUN_KEY];
        let page = Number(dto.getBatchCursor('0'));

        let url = `/me/events?$count=true&top=${LIMIT}&$skip=${page * LIMIT}`;

        if (lastRun) {
            url = `${url}&$filter=lastModifiedDateTime gt ${lastRun}`;
        }

        const app = this.getApplication<OutlookApplication>();
        const requestDto = app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );

        const res = await this.getSender().send<IResponseJson>(requestDto);
        const { '@odata.count': count, value } = res.getJsonBody();

        if (count > ++page * LIMIT) {
            dto.setBatchCursor(page.toString());
        } else {
            appInstall.addNonEncryptedSettings({ [LAST_RUN_KEY]: new Date() });
            await this.getDbClient().getApplicationRepository().update(appInstall);
        }

        dto.setItemList(value);

        return dto;
    }

}

export interface IResponseJson {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '@odata.count': number;
    value: IEvent[];
}
