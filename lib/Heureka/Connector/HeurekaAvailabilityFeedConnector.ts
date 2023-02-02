import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { XMLParser } from 'fast-xml-parser';
import { AVAILABILITY_FEED_URL } from '../HeurekaApplication';

export const NAME = 'heureka-availability-feed-connector';

export default class HeurekaAvailabilityFeedConnector extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto): Promise<ProcessDto<IOutput>> {
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const req = await this.getApplication()
            .getRequestDto(
                dto,
                await this.getApplicationInstallFromProcess(dto),
                HttpMethods.GET,
                appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][AVAILABILITY_FEED_URL],
            );
        const resp = await this.getSender()
            .send(req, [200]);

        const parser = new XMLParser({ attributeNamePrefix: '', ignoreAttributes: false, textNodeName: 'value' });
        const shopItems = parser.parse(resp.getBody()) as IOutput;

        return dto.setNewJsonData<IOutput>(shopItems);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IOutput {
    item_list: IList[];
}

interface IList {
    item: IItem[];
}

interface IItem {
    stock_quantity: number;
    delivery_time: IDeliveryTime;
    depot: IDepot[];
    id: string;
}

interface IDeliveryTime {
    value?: string;
    orderDeadline?: string;
}

interface IDepot {
    stock_quantity?: string;
    id?: string;
    pickup_time?: IPickupTime;
}

interface IPickupTime {
    value?: string;
    orderDeadline?: string;
}

/* eslint-enable @typescript-eslint/naming-convention */
