import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_STITKY_BATCH = 'flexi-bee-stitky-batch';

export default class FlexiBeeStitkyBatch extends FlexiBeeSimpleIterator<FlexiBeeStitek> {

    protected endpoint = 'stitek';

    public getName(): string {
        return FLEXI_BEE_STITKY_BATCH;
    }

}

export interface FlexiBeeStitek {
    id: string;
    lastUpdate: string;
    kod: string;
    nazev: string;
}
