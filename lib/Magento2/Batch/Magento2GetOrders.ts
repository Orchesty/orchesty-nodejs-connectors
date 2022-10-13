import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import ABatchNode from '@orchesty/nodejs-sdk/dist/lib/Batch/ABatchNode';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import BatchProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/BatchProcessDto';
import { IOrderJson } from '../Connector/Magento2GetOrder';
import Magento2Application, { MAGENTO_URL } from '../Magento2Application';

// eslint-disable-next-line max-len
export const GET_ORDERS_ENDPOINT = 'index.php/rest/default/V1/orders?searchCriteria[page_size]={items_per_page}&searchCriteria[currentPage]={current_page}';

const ITEMS_PER_PAGE = 100;

export default class Magento2GetOrders extends ABatchNode {

    public getName(): string {
        return 'shoptet-get-order-pages';
    }

    public async processAction(dto: BatchProcessDto): Promise<BatchProcessDto> {
        const app = this.getApplication<Magento2Application>();
        const currentPage = Number(dto.getBatchCursor('1'));
        const appInstall = await this.getApplicationInstallFromProcess(dto);
        const host = appInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][MAGENTO_URL];
        const url = `${host}/${GET_ORDERS_ENDPOINT}`
            .replace('{items_per_page}', ITEMS_PER_PAGE.toString())
            .replace('{current_page}', currentPage.toString());

        const requestDto = await app.getRequestDto(
            dto,
            appInstall,
            HttpMethods.GET,
            url,
        );

        const res = await this.getSender().send<IResponseJson>(requestDto, [200, 404]);
        const {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            total_count,
            items,
        } = res.getJsonBody();

        if (currentPage < total_count) {
            dto.setBatchCursor((currentPage + 1).toString());
        }
        dto.setItemList(items);

        return dto;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
interface IResponseJson {
    items: IOrderJson[];
    total_count: number;
}

/* eslint-enable @typescript-eslint/naming-convention */
