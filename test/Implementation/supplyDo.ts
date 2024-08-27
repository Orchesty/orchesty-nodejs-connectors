import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import SupplyDoGetOrderHistory from '../../lib/SupplyDo/Batch/SupplyDoGetOrderHistory';
import SupplyDoGetProducts from '../../lib/SupplyDo/Batch/SupplyDoGetProducts';
import SupplyDoGetProductsStocks from '../../lib/SupplyDo/Batch/SupplyDoGetProductsStocks';
import SupplyDoGetPurchaseOrders from '../../lib/SupplyDo/Batch/SupplyDoGetPurchaseOrders';
import SupplyDoGetSellingOrders from '../../lib/SupplyDo/Batch/SupplyDoGetSellingOrders';
import SupplyDoCreateOrderHistory from '../../lib/SupplyDo/Connector/SupplyDoCreateOrderHistory';
import SupplyDoCreateProductBatchWarehouse from '../../lib/SupplyDo/Connector/SupplyDoCreateProductBatchWarehouse';
import SupplyDoCreatePurchaseOrderHistory from '../../lib/SupplyDo/Connector/SupplyDoCreatePurchaseOrderHistory';
import SupplyDoCreateReturn from '../../lib/SupplyDo/Connector/SupplyDoCreateReturn';
import SupplyDoGetCarriers from '../../lib/SupplyDo/Connector/SupplyDoGetCarriers';
import { SupplyDoGetSellingOrder } from '../../lib/SupplyDo/Connector/SupplyDoGetSellingOrder';
import SupplyDoGetWarehouses from '../../lib/SupplyDo/Connector/SupplyDoGetWarehouses';
import { SupplyDoSetTrackingNumber } from '../../lib/SupplyDo/Connector/SupplyDoSetTrackingNumber';
import SupplyDoUpdateEcommerce from '../../lib/SupplyDo/Connector/SupplyDoUpdateEcommerce';
import SupplyDoUpdateProductBatchWarehouse from '../../lib/SupplyDo/Connector/SupplyDoUpdateProductBatchWarehouse';
import SupplyDoUpsertOrders from '../../lib/SupplyDo/Connector/SupplyDoUpsertOrders';
import SupplyDoUpsertProduct from '../../lib/SupplyDo/Connector/SupplyDoUpsertProduct';
import SupplyDoApplication, {
    BASE_URL,
    BEARER_TOKEN,
    NAME as SUPPLY_DO_APP,
} from '../../lib/SupplyDo/SupplyDoApplication';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

export function mock(): void {
    appInstall(SUPPLY_DO_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [BEARER_TOKEN]: 'Token',
            [BASE_URL]: 'https://supply.do',
        },
    });
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
    container.setNode(new SupplyDoCreateOrderHistory(), supplyDoApplication);
    container.setNode(new SupplyDoGetWarehouses(), supplyDoApplication);
    container.setNode(new SupplyDoGetPurchaseOrders(), supplyDoApplication);
    container.setNode(new SupplyDoCreatePurchaseOrderHistory(), supplyDoApplication);
    container.setNode(new SupplyDoCreateReturn(), supplyDoApplication);
    container.setNode(new SupplyDoGetSellingOrder(), supplyDoApplication);
    container.setNode(new SupplyDoSetTrackingNumber(), supplyDoApplication);
}
