import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import {
    ApplicationInstall,
    IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import Redis from '@orchesty/nodejs-sdk/dist/lib/Storage/Redis/Redis';
import ShoptetGetOrderChangesList from '../../lib/Shoptet/Batch/ShoptetGetOrderChangesList';
import ShoptetGetProductChangesList from '../../lib/Shoptet/Batch/ShoptetGetProductChangesList';
import ShoptetParseJsonLines from '../../lib/Shoptet/Batch/ShoptetParseJsonLines';
import ShoptetGetAllOrders from '../../lib/Shoptet/Connector/ShoptetGetAllOrders';
import ShoptetGetAllProducts from '../../lib/Shoptet/Connector/ShoptetGetAllProducts';
import ShoptetGetEshopInfo from '../../lib/Shoptet/Connector/ShoptetGetEshopInfo';
import ShoptetGetListOfStocks from '../../lib/Shoptet/Connector/ShoptetGetListOfStocks';
import ShoptetGetProductDetail from '../../lib/Shoptet/Connector/ShoptetGetProductDetail';
import ShoptetGetShippingMethods from '../../lib/Shoptet/Connector/ShoptetGetShippingMethods';
import ShoptetJobFinishedWebhook from '../../lib/Shoptet/Connector/ShoptetJobFinishedWebhook';
import ShoptetUpdateStockMovements from '../../lib/Shoptet/Connector/ShoptetUpdateStockMovements';
import APluginShoptetApplication from '../../lib/Shoptet/PluginShoptetApplication';
import { appInstall, DEFAULT_ACCESS_TOKEN, DEFAULT_USER } from '../DataProvider';
import { cacheService, container, db, sender } from '../TestAbstract';

const NAME = 'shoptet';

class ImplPluginShoptetApplication extends APluginShoptetApplication {

    protected shoptetHost = 'www.test.cz';

    public getName(): string {
        return NAME;
    }

    public getFormStack(): FormStack {
        return new FormStack();
    }

}

export function mock(callCount = 1, extraNonEncryptedSettings?: IApplicationSettings): ApplicationInstall {
    let applicationInstall: ApplicationInstall = new ApplicationInstall();
    let count = callCount;
    if (count < 1) {
        count = 1;
    }
    for (let i = 0; i < count; i++) {
        applicationInstall = appInstall(
            NAME,
            DEFAULT_USER,
            {
                [CoreFormsEnum.AUTHORIZATION_FORM]: {
                    [TOKEN]: DEFAULT_ACCESS_TOKEN,
                },
            },
            {
                eshopId: '222651',
                ...extraNonEncryptedSettings,
            },
        );
    }
    return applicationInstall;
}

export async function init(): Promise<void> {
    const implPluginShoptetApplication = new ImplPluginShoptetApplication(cacheService);

    const cacheKey = `${NAME}ApiKey_TestUser`;

    const redisService = container.get(Redis);
    await redisService.set(
        cacheKey,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        JSON.stringify({ expires_in: 55, access_token: 'testToken' }),
        10,
    );

    const shoptetGetAllOrders = new ShoptetGetAllOrders()
        .setSender(sender)
        .setDb(db)
        .setApplication(implPluginShoptetApplication);
    container.setConnector(shoptetGetAllOrders);

    const shoptetGetAllProducts = new ShoptetGetAllProducts()
        .setSender(sender)
        .setDb(db)
        .setApplication(implPluginShoptetApplication);
    container.setConnector(shoptetGetAllProducts);

    const shoptetJobFinishedWebhook = new ShoptetJobFinishedWebhook()
        .setSender(sender)
        .setDb(db)
        .setApplication(implPluginShoptetApplication);
    container.setConnector(shoptetJobFinishedWebhook);

    const shoptetGetProductDetail = new ShoptetGetProductDetail()
        .setSender(sender)
        .setDb(db)
        .setApplication(implPluginShoptetApplication);
    container.setConnector(shoptetGetProductDetail);

    const shoptetParseJsonLines = new ShoptetParseJsonLines()
        .setSender(sender)
        .setDb(db)
        .setApplication(implPluginShoptetApplication);
    container.setBatch(shoptetParseJsonLines);

    const shoptetGetShippingMethods = new ShoptetGetShippingMethods()
        .setSender(sender)
        .setDb(db)
        .setApplication(implPluginShoptetApplication);
    container.setConnector(shoptetGetShippingMethods);

    const shoptetGetEshopInfo = new ShoptetGetEshopInfo()
        .setSender(sender)
        .setDb(db)
        .setApplication(implPluginShoptetApplication);
    container.setConnector(shoptetGetEshopInfo);

    const shoptetGetOrderChangesList = new ShoptetGetOrderChangesList()
        .setSender(sender)
        .setDb(db)
        .setApplication(implPluginShoptetApplication);
    container.setBatch(shoptetGetOrderChangesList);

    const shoptetGetProductChangesList = new ShoptetGetProductChangesList()
        .setSender(sender)
        .setDb(db)
        .setApplication(implPluginShoptetApplication);
    container.setBatch(shoptetGetProductChangesList);

    const shoptetGetListOfStocks = new ShoptetGetListOfStocks()
        .setSender(sender)
        .setDb(db)
        .setApplication(implPluginShoptetApplication);
    container.setConnector(shoptetGetListOfStocks);

    const shoptetUpdateStockMovements = new ShoptetUpdateStockMovements()
        .setApplication(implPluginShoptetApplication)
        .setDb(db)
        .setSender(sender);
    container.setConnector(shoptetUpdateStockMovements);
}
