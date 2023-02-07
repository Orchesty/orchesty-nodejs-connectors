import {
    createFailRange,
    createRepeatRange,
    createSuccessRange,
    ResultCodeRange,
} from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResultCodeRange';

export function commonResponseCodeRange(): ResultCodeRange[] {
    return [createSuccessRange(200, 399), createFailRange(400, 499), createRepeatRange(500, 599)];
}
