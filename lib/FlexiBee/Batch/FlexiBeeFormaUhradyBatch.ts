import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_FORMA_UHRADY_BATCH = 'flexi-bee-forma-uhrady-batch';

export class FlexiBeeFormaUhradyBatch extends FlexiBeeSimpleIterator<FormaDopravy> {

    protected endpoint = 'forma-uhrady';

    public getName(): string {
        return FLEXI_BEE_FORMA_UHRADY_BATCH;
    }

}

interface FormaDopravy {
    id: string;
    lastUpdate: string;
    kod: string;
    nazev: string;
    mena: string;
}
