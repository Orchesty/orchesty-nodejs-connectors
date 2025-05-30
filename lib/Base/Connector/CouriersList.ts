import ABaseConnector from './ABaseConnector';

export const NAME = 'couriers-list';

export default class CouriersList extends ABaseConnector<undefined, IOutput> {

    public getName(): string {
        return NAME;
    }

    protected getMethod(): string {
        return 'getCouriersList';
    }

}

interface IOutput {
    couriers: {
        code: string;
        name: string;
    }[];
}
