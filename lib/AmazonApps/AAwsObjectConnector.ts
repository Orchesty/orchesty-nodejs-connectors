import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';

export default abstract class AAwsObjectConnector extends AConnector {
  /* eslint-disable @typescript-eslint/naming-convention */
  protected _QUERY = 'query';

  protected _RESULT = 'result';

  protected _BUCKET = 'Bucket';

  protected _KEY = 'Key';

  protected _SOURCE = 'SourceFile';

  protected _TARGET = 'SaveAs';

  protected _NAME = 'name';

  protected _CONTENT = 'content';

  /* eslint-enable @typescript-eslint/naming-convention */

  protected abstract _getCustomId(): string;

  protected _checkParameters = (parameters: string[], content: []): void => {
    parameters.forEach((parameter) => {
      if (!(parameter in content)) {
        throw Error(`Required parameter [${parameter}] is not provided!`);
      }
    });
  };
}
