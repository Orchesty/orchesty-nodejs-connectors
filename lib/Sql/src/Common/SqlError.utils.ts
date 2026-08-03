const MAX_DEPTH = 3;
const MAX_REASON_LENGTH = 500;
const REASON_SEPARATOR = ' | ';
const TRUNCATION_MARK = '...';
const FALLBACK_REASON = 'Unknown SQL error without any detail from the driver';

interface ISqlDriverError {
    code?: number | string;
    errors?: unknown[];
    message?: string;
    number?: number | string;
    original?: unknown;
    parent?: unknown;
}

function asSqlDriverError(error: unknown): ISqlDriverError | undefined {
    if (typeof error !== 'object' || error === null) {
        return undefined;
    }

    return error;
}

function getErrorIdentifier(error: ISqlDriverError): string | undefined {
    if (error.number !== undefined && error.number !== null) {
        return String(error.number);
    }

    if (error.code !== undefined && error.code !== null) {
        return String(error.code);
    }

    return undefined;
}

function formatError(error: unknown): string {
    if (typeof error === 'string') {
        return error.trim();
    }

    const driverError = asSqlDriverError(error);

    if (!driverError) {
        return '';
    }

    const identifier = getErrorIdentifier(driverError);
    const message = driverError.message?.trim() ?? '';

    if (identifier === undefined) {
        return message;
    }

    return message ? `[${identifier}] ${message}` : `[${identifier}]`;
}

function collectReasons(error: unknown, depth: number): string[] {
    const nested = asSqlDriverError(error)?.errors;

    if (Array.isArray(nested) && depth < MAX_DEPTH) {
        return nested.flatMap((item) => collectReasons(item, depth + 1));
    }

    const formatted = formatError(error);

    return formatted ? [formatted] : [];
}

export function getSqlErrorReason(error: unknown): string {
    const source = asSqlDriverError(error);
    const reason = collectReasons(source?.parent ?? source?.original ?? error, 0)
        .join(REASON_SEPARATOR)
        .trim();

    if (!reason) {
        return FALLBACK_REASON;
    }

    if (reason.length > MAX_REASON_LENGTH) {
        return `${reason.slice(0, MAX_REASON_LENGTH - TRUNCATION_MARK.length)}${TRUNCATION_MARK}`;
    }

    return reason;
}
