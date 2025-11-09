import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import BaseApplication, { NAME as BASE_APP } from '../../lib/Base/BaseApplication';
import InventoryProductsData from '../../lib/Base/Batch/InventoryProductsData';
import InventoryProductsList from '../../lib/Base/Batch/InventoryProductsList';
import JournalList from '../../lib/Base/Batch/JournalList';
import CourierFields from '../../lib/Base/Connector/CourierFields';
import CouriersList from '../../lib/Base/Connector/CouriersList';
import CreatePackage from '../../lib/Base/Connector/CreatePackage';
import CreatePackageManual from '../../lib/Base/Connector/CreatePackageManual';
import GetLabel from '../../lib/Base/Connector/GetLabel';
import Inventories from '../../lib/Base/Connector/Inventories';
import InventoryWarehouses from '../../lib/Base/Connector/InventoryWarehouses';
import OrderPaymentsHistory from '../../lib/Base/Connector/OrderPaymentsHistory';
import Orders from '../../lib/Base/Connector/Orders';
import OrderStatusList from '../../lib/Base/Connector/OrderStatusList';
import SetOrderStatus from '../../lib/Base/Connector/SetOrderStatus';
import UpdateInventoryProductsStock from '../../lib/Base/Connector/UpdateInventoryProductsStock';
import { appInstall, DEFAULT_USER } from '../DataProvider';
import { container } from '../TestAbstract';

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
}
