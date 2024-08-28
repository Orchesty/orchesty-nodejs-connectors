import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_FORMA_UHRADY_BATCH = 'flexi-bee-forma-uhrady-batch';

export default class FlexiBeeFormaUhradyBatch extends FlexiBeeSimpleIterator<FlexiBeeFormaDopravy> {

    protected endpoint = 'forma-uhrady';

    public getName(): string {
        return FLEXI_BEE_FORMA_UHRADY_BATCH;
    }

}

export interface FlexiBeeFormaDopravy {
    id: string;
    lastUpdate: string;
    kod: string;
    nazev: string;
    mena: string;
}
