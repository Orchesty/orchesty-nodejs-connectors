import { FlexiBeeObjednavkaVydana } from '../types/FlexiBeeObjednavkaVydana';
import { FlexiBeeSimpleIterator } from './FlexiBeeSimpleIterator';

export const FLEXI_BEE_OBJEDNAVKA_VYDANA_BATCH = 'flexi-bee-objednavka-vydana-batch';

export default class FlexiBeeObjednavkaVydanaBatch extends FlexiBeeSimpleIterator<FlexiBeeObjednavkaVydana> {

    protected endpoint = 'objednavka-vydana';

    protected override relations: string[] = ['polozkyObchDokladu'];

    public getName(): string {
        return FLEXI_BEE_OBJEDNAVKA_VYDANA_BATCH;
    }

}

export type FlexiBeeObjednavkaVydanaBatchInput = object

export type FlexiBeeObjednavkaVydanaBatchItemOutput = FlexiBeeObjednavkaVydana;
