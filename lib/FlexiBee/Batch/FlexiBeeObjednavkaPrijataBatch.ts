import { FlexiBeeObjednavkaPrijata } from '../types/FlexiBeeObjednavkaPrijata';
import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_OBJEDNAVKA_PRIJATA_BATCH = 'flexi-bee-objednavka-prijata-batch';

export default class FlexiBeeObjednavkaPrijataBatch extends FlexiBeeSimpleIterator<FlexiBeeObjednavkaPrijata> {

    protected endpoint = 'objednavka-prijata';

    public getName(): string {
        return FLEXI_BEE_OBJEDNAVKA_PRIJATA_BATCH;
    }

}

export type FlexiBeeObjednavkaPrijataBatchInput = object

export type FlexiBeeObjednavkaPrijataBatchItemOutput = FlexiBeeObjednavkaPrijata;
