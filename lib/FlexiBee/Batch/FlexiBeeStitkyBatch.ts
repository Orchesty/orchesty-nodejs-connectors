import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_STITKY_BATCH = 'flexi-bee-stitky-batch';

export class FlexiBeeStitkyBatch extends FlexiBeeSimpleIterator<Stitek> {

    protected endpoint = 'stitek';

    public getName(): string {
        return FLEXI_BEE_STITKY_BATCH;
    }

}

interface Stitek {
    id: string;
    lastUpdate: string;
    kod: string;
    nazev: string;
}
