import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';

export const QUERY = 'query';

export const RESULT = 'result';

export const BUCKET = 'Bucket';

export const KEY = 'Key';

export const SOURCE = 'SourceFile';

export const TARGET = 'SaveAs';

export const NAME = 'name';

export const CONTENT = 'content';

export abstract class AAwsObjectConnector extends AConnector {

    protected abstract getCustomId(): string;

    protected checkParameters(parameters: string[], content: Record<string, unknown>): void {
        parameters.forEach((parameter) => {
            if (!(parameter in content)) {
                throw Error(`Required parameter [${parameter}] is not provided!`);
            }
        });
    }

}
