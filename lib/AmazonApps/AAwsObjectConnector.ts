import AConnector from 'pipes-nodejs-sdk/dist/lib/Connector/AConnector';
import ApplicationInstallRepository from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstallRepository';

export default abstract class AAwsObjectConnector extends AConnector {
  protected _QUERY = 'query';

  protected _RESULT = 'result';

  protected _BUCKET = 'Bucket';

  protected _KEY = 'Key';

  protected _SOURCE = 'SourceFile';

  protected _TARGET = 'SaveAs';

  protected _NAME = 'name';

  protected _CONTENT = 'content';

  protected _repository: ApplicationInstallRepository<>;

  protected abstract _getCustomId(): string;

  protected _checkParameters = (parameters: [], content: []): void => {
    parameters.forEach((parameter) => {
      if (content.includes(parameter)) {
        throw Error(`Required parameter [${parameter}] is not provided!`);
      }
    });
  };
}
