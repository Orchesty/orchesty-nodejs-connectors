import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';

export default abstract class AAzureObjectConnector extends AConnector {
    protected abstract _getCustomId(): string;

    protected _checkParameters = (parameters: string[], content: Record<string, unknown>): void => {
      parameters.forEach((parameter) => {
        if (!(parameter in content)) {
          throw Error(`Required parameter [${parameter}] is not provided!`);
        }
      });
    };
}
