import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import SupplyDoGetOrderHistory from '../../lib/SupplyDo/Batch/SupplyDoGetOrderHistory';
import SupplyDoGetProductsStocks from '../../lib/SupplyDo/Batch/SupplyDoGetProductsStocks';
import SupplyDoGetCarriers from '../../lib/SupplyDo/Connector/SupplyDoGetCarriers';
import SupplyDoUpdateEcommerce from '../../lib/SupplyDo/Connector/SupplyDoUpdateEcommerce';
import SupplyDoUpsertOrders from '../../lib/SupplyDo/Connector/SupplyDoUpsertOrders';
import SupplyDoUpsertProduct from '../../lib/SupplyDo/Connector/SupplyDoUpsertProduct';
import SupplyDoApplication, {
    BASE_URL,
    BEARER_TOKEN,
    NAME as SUPPLY_DO_APP,
} from '../../lib/SupplyDo/SupplyDoApplication';
import {
    appInstall,
    DEFAULT_USER,
} from '../DataProvider';
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
}
