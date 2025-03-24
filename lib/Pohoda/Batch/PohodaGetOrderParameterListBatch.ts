import { NAME as APPLICATION_NAME } from '../PohodaApplication';
import APohodaGetParameterListBatch, { ParameterType } from './APohodaGetParameterListBatch';

export const NAME = `${APPLICATION_NAME}-get-order-parameter-list-batch`;

export const LAST_RUN_KEY = ParameterType.ORDER;

export default class PohodaGetOrderParameterListBatch extends APohodaGetParameterListBatch {

    public getName(): string {
        return NAME;
    }

    protected getType(): ParameterType {
        return ParameterType.ORDER;
    }

}
