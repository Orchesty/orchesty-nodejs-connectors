import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import SupplyDoGetCacheProductDetail from '../src/Batch/SupplyDoGetCacheProductDetail';
import SupplyDoGetOrderHistory from '../src/Batch/SupplyDoGetOrderHistory';
import SupplyDoGetProducts from '../src/Batch/SupplyDoGetProducts';
import SupplyDoGetProductsStocks from '../src/Batch/SupplyDoGetProductsStocks';
import SupplyDoGetPurchaseOrders from '../src/Batch/SupplyDoGetPurchaseOrders';
import SupplyDoGetSellingOrders from '../src/Batch/SupplyDoGetSellingOrders';
import SupplyDoCreateOrderHistory from '../src/Connector/SupplyDoCreateOrderHistory';
import SupplyDoCreateProductBatchWarehouse from '../src/Connector/SupplyDoCreateProductBatchWarehouse';
import SupplyDoCreatePurchaseOrderHistory from '../src/Connector/SupplyDoCreatePurchaseOrderHistory';
import SupplyDoCreateReturn from '../src/Connector/SupplyDoCreateReturn';
import SupplyDoGetCarriers from '../src/Connector/SupplyDoGetCarriers';
import SupplyDoGetProductBatchWarehouse from '../src/Connector/SupplyDoGetProductBatchWarehouse';
import SupplyDoGetSellingOrder from '../src/Connector/SupplyDoGetSellingOrder';
import SupplyDoGetWarehouses from '../src/Connector/SupplyDoGetWarehouses';
import SupplyDoSetTrackingNumber from '../src/Connector/SupplyDoSetTrackingNumber';
import SupplyDoUpdateEcommerce from '../src/Connector/SupplyDoUpdateEcommerce';
import SupplyDoUpdateProductBatchWarehouse from '../src/Connector/SupplyDoUpdateProductBatchWarehouse';
import SupplyDoUpsertOrders from '../src/Connector/SupplyDoUpsertOrders';
import SupplyDoUpsertProduct from '../src/Connector/SupplyDoUpsertProduct';
import SupplyDoApplication, {
    BASE_URL,
    BEARER_TOKEN,
    NAME as SUPPLY_DO_APP,
} from '../src/SupplyDoApplication';

export function mock(): void {
    appInstall(SUPPLY_DO_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [BEARER_TOKEN]: 'Token',
            [BASE_URL]: 'https://supply.do',
        },
    });
}

class MockDate extends Date {

    public constructor() {
        super('2022-01-01T11:12:58.135Z');
    }

}

export function mockDate(): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.Date = MockDate;
}

export function init(): void {
    const supplyDoApplication = new SupplyDoApplication();

    container.setNode(new SupplyDoUpsertProduct(), supplyDoApplication);
    container.setNode(new SupplyDoUpsertOrders(), supplyDoApplication);
    container.setNode(new SupplyDoGetProductsStocks(), supplyDoApplication);
    container.setNode(new SupplyDoGetOrderHistory(), supplyDoApplication);
    container.setNode(new SupplyDoGetCarriers(), supplyDoApplication);
    container.setNode(new SupplyDoUpdateEcommerce(), supplyDoApplication);
    container.setNode(new SupplyDoGetSellingOrders(), supplyDoApplication);
    container.setNode(new SupplyDoGetProducts(), supplyDoApplication);
    container.setNode(new SupplyDoCreateProductBatchWarehouse(), supplyDoApplication);
    container.setNode(new SupplyDoUpdateProductBatchWarehouse(), supplyDoApplication);
    container.setNode(new SupplyDoGetProductBatchWarehouse(), supplyDoApplication);
    container.setNode(new SupplyDoCreateOrderHistory(), supplyDoApplication);
    container.setNode(new SupplyDoGetWarehouses(), supplyDoApplication);
    container.setNode(new SupplyDoGetPurchaseOrders(), supplyDoApplication);
    container.setNode(new SupplyDoCreatePurchaseOrderHistory(), supplyDoApplication);
    container.setNode(new SupplyDoCreateReturn(), supplyDoApplication);
    container.setNode(new SupplyDoGetSellingOrder(), supplyDoApplication);
    container.setNode(new SupplyDoSetTrackingNumber(), supplyDoApplication);
    container.setNode(new SupplyDoGetCacheProductDetail(), supplyDoApplication);
}
