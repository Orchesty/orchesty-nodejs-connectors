import { DatabaseError } from 'sequelize';
import { getSqlErrorReason } from '../SqlError.utils';

type SqlErrorParent = Error & { sql: string };

const KILL_STATE_MESSAGE = 'Cannot continue the execution because the session is in the kill state.';
const SEVERE_ERROR_MESSAGE = 'A severe error occurred on the current command. '
    + 'Results, if any, should be discarded.';

function createRequestError(errorNumber: number, message: string): SqlErrorParent {
    return Object.assign(new Error(message), { code: 'EREQUEST', number: errorNumber, sql: '' });
}

function createAggregateError(errors: Error[]): SqlErrorParent {
    return Object.assign(new AggregateError(errors), { sql: '' });
}

describe('Tests for getSqlErrorReason', () => {
    it('should build reason from a single request error', () => {
        const error = new DatabaseError(createRequestError(8134, 'Divide by zero error encountered.'));

        expect(getSqlErrorReason(error)).toEqual('[8134] Divide by zero error encountered.');
    });

    it('should join every error of an aggregate error', () => {
        const error = new DatabaseError(createAggregateError([
            createRequestError(50000, 'a'),
            createRequestError(50000, 'b'),
        ]));

        expect(error.message).toEqual('');
        expect(getSqlErrorReason(error)).toEqual('[50000] a | [50000] b');
    });

    it('should build reason for a killed session', () => {
        const error = new DatabaseError(createRequestError(596, KILL_STATE_MESSAGE));

        expect(getSqlErrorReason(error)).toEqual(`[596] ${KILL_STATE_MESSAGE}`);
    });

    it('should fall back to code when number is missing', () => {
        const parent = Object.assign(new Error('read ECONNRESET'), { code: 'ECONNRESET', sql: '' });

        expect(getSqlErrorReason(new DatabaseError(parent))).toEqual('[ECONNRESET] read ECONNRESET');
    });

    it('should fall back to a non empty reason for an aggregate error without errors', () => {
        const reason = getSqlErrorReason(new DatabaseError(createAggregateError([])));

        expect(reason).toEqual('Unknown SQL error without any detail from the driver');
        expect(reason).toBeTruthy();
    });

    it('should keep error number zero', () => {
        const error = new DatabaseError(createAggregateError([
            createRequestError(596, KILL_STATE_MESSAGE),
            createRequestError(0, SEVERE_ERROR_MESSAGE),
        ]));

        expect(getSqlErrorReason(error)).toEqual(`[596] ${KILL_STATE_MESSAGE} | [0] ${SEVERE_ERROR_MESSAGE}`);
    });

    it('should cap the reason length', () => {
        const error = new DatabaseError(createAggregateError(
            Array.from({ length: 20 }, (unused, index) => createRequestError(index, KILL_STATE_MESSAGE)),
        ));

        const reason = getSqlErrorReason(error);

        expect(reason).toBeTruthy();
        expect(reason).toHaveLength(500);
        expect(reason.endsWith('...')).toBeTruthy();
    });
});
