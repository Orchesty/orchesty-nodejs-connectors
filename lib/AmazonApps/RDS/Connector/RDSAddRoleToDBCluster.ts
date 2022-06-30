import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AddRoleToDBClusterCommand, AddRoleToDBClusterCommandInput } from '@aws-sdk/client-rds';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ARDSObjectConnector from './ARDSObjectConnector';
import RDSApplication from '../RDSApplication';

export default class RDSAddRoleToDBCluster extends ARDSObjectConnector {
  protected _getCustomId = (): string => 'add-role-to-db-cluster';

  public async processAction(_dto: ProcessDto): Promise<ProcessDto> {
    const dto = _dto;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const content = dto.jsonData as { RoleArn: string, DBClusterIdentifier: string, FeatureName: string | undefined};
    this._checkParameters(['DBClusterIdentifier', 'RoleArn'], content);

    const applicationInstall = await this._getApplicationInstallFromProcess(dto);
    const application = this._application as RDSApplication;
    const client = application.getRDSClient(applicationInstall);

    const input: AddRoleToDBClusterCommandInput = {
      /* eslint-disable @typescript-eslint/naming-convention */
      RoleArn: content.RoleArn,
      DBClusterIdentifier: content.DBClusterIdentifier,
      FeatureName: content.FeatureName,
      /* eslint-enable @typescript-eslint/naming-convention */
    };
    const command = new AddRoleToDBClusterCommand(input);
    try {
      await client.send(command);
    } catch (e) {
      throw new OnRepeatException(60, 10, (e as Error)?.message ?? 'Unknown error.');
    }
    return dto;
  }
}
