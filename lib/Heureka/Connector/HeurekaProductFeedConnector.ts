import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { XMLParser } from 'fast-xml-parser';
import { PRODUCT_FEED_URL } from '../HeurekaApplication';

export const NAME = 'heureka-product-feed-connector';

export default class HeurekaProductFeedConnector extends AConnector {

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
                appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][PRODUCT_FEED_URL],
            );
        const resp = await this.getSender()
            .send(req, [200]);

        const parser = new XMLParser();
        const shopItems = parser.parse(resp.getBody()) as IOutput;

        return dto.setNewJsonData<IOutput>(shopItems);
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IOutput {
    SHOPITEM: IShopItem[];
}

interface IShopItem {
    ITEM_ID: string;
    PRODUCTNAME: string;
    PRODUCT: string;
    DESCRIPTION: string;
    URL: string;
    IMGURL: string;
    IMGURL_ALTERNATIVE: string;
    VIDEO_URL: string;
    PRICE_VAT: number;
    HEUREKA_CPC: number;
    MANUFACTURER: string;
    CATEGORYTEXT: string;
    EAN: string;
    PRODUCTNO: string;
    PARAM: IParam[];
    DELIVERY_DATE: number;
    DELIVERY: IDelivery[];
    ITEMGROUP_ID: string;
    ACCESSORY: string;
    GIFT: string;
    EXTENDED_WARRANTY: IExtendedWarranty;
    SPECIAL_SERVICE: string;
    SALES_VOUCHER: ISalesVoucher;

}

interface IParam {
    PARAM_NAME: string;
    VAL: string;
}

interface IDelivery {
    DELIVERY_ID: string;
    DELIVERY_PRICE: string;
    DELIVERY_PRICE_COD: string;
}

interface IExtendedWarranty {
    VAL: number;
    DESC: string;
}

interface ISalesVoucher {
    CODE: string;
    DESC: string;
}
/* eslint-enable @typescript-eslint/naming-convention */
