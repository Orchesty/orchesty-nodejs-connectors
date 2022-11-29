import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';

export default abstract class AAzureObjectConnector extends AConnector {

    protected abstract getCustomId(): string;

    protected checkParameters(parameters: string[], content: Record<string, unknown>): void {
        parameters.forEach((parameter) => {
            if (!(parameter in content)) {
                throw Error(`Required parameter [${parameter}] is not provided!`);
            }
        });
    }

}
