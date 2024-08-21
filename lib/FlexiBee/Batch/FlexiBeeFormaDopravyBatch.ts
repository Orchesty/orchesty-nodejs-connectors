import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_FORMA_DOPRAVY_BATCH = 'flexi-bee-forma-dopravy-batch';

export default class FlexiBeeFormaDopravyBatch extends FlexiBeeSimpleIterator<FormaDopravy> {

    protected endpoint = 'forma-dopravy';

    public getName(): string {
        return FLEXI_BEE_FORMA_DOPRAVY_BATCH;
    }

}

interface FormaDopravy {
    id: string;
    lastUpdate: string;
    kod: string;
    nazev: string;
}
