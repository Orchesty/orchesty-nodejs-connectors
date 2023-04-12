import MoneyS45BaseApplication from './MoneyS4-5BaseApplication';

export const NAME = 'moneys4';

export default class MoneyS4Application extends MoneyS45BaseApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Money S4';
    }

}
