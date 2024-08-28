import { FlexiBeeSkladovyPohybBatchItem } from '../types/FlexiBeeSkladovyPohyb';
import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_GET_SKLADOVY_POHYB_BATCH = 'flexi-bee-get-skladovy-pohyb-batch';

export default class FlexiBeeGetSkladovyPohybBatch extends FlexiBeeSimpleIterator<FlexiBeeSkladovyPohybBatchItem> {

    protected override endpoint = 'skladovy-pohyb';

    public getName(): string {
        return FLEXI_BEE_GET_SKLADOVY_POHYB_BATCH;
    }

}

/* eslint-disable @typescript-eslint/naming-convention */

export type FlexiBeeGetSkladovyPohybBatchInput = object;

export type FlexiBeeGetSkladovyPohybBatchItemOutput = FlexiBeeSkladovyPohybBatchItem;

/* eslint-enable @typescript-eslint/naming-convention */
