import { appInstall, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import BaseApplication, { NAME as BASE_APP } from '../src/BaseApplication';
import InventoryProductsData from '../src/Batch/InventoryProductsData';
import InventoryProductsList from '../src/Batch/InventoryProductsList';
import JournalList from '../src/Batch/JournalList';
import OrderExtraFields from '../src/Batch/OrderExtraFields';
import CourierFields from '../src/Connector/CourierFields';
import CouriersList from '../src/Connector/CouriersList';
import CreatePackage from '../src/Connector/CreatePackage';
import CreatePackageManual from '../src/Connector/CreatePackageManual';
import GetLabel from '../src/Connector/GetLabel';
import Inventories from '../src/Connector/Inventories';
import InventoryWarehouses from '../src/Connector/InventoryWarehouses';
import OrderPaymentsHistory from '../src/Connector/OrderPaymentsHistory';
import Orders from '../src/Connector/Orders';
import OrderStatusList from '../src/Connector/OrderStatusList';
import SetOrderStatus from '../src/Connector/SetOrderStatus';
import UpdateInventoryProductsStock from '../src/Connector/UpdateInventoryProductsStock';

export default function init(): void {
    appInstall(BASE_APP, DEFAULT_USER, {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [TOKEN]: 'api-token',
        },
    });

    const app = new BaseApplication();
    container.setApplication(app);

    container.setNode(new CouriersList(), app);
    container.setNode(new CourierFields(), app);
    container.setNode(new Inventories(), app);
    container.setNode(new InventoryWarehouses(), app);
    container.setNode(new OrderStatusList(), app);
    container.setNode(new InventoryProductsData(), app);
    container.setNode(new OrderPaymentsHistory(), app);
    container.setNode(new SetOrderStatus(), app);
    container.setNode(new CreatePackage(), app);
    container.setNode(new CreatePackageManual(), app);
    container.setNode(new GetLabel(), app);
    container.setNode(new UpdateInventoryProductsStock(), app);
    container.setNode(new Orders(), app);
    container.setNode(new InventoryProductsList(), app);
    container.setNode(new JournalList(), app);
    container.setNode(new OrderExtraFields(), app);
}
