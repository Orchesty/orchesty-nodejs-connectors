import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import APluginShoptetApplication from '../../lib/Shoptet/APluginShoptetApplication';

export const NAME = 'shoptet';

export default class ImplPluginShoptetApplication extends APluginShoptetApplication {
  getName = (): string => NAME;

  protected _pluginHost = 'www.test.cz';

  getFormStack = (): FormStack => new FormStack();
}
