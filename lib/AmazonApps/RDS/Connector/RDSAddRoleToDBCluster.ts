import { AddRoleToDBClusterCommand, AddRoleToDBClusterCommandInput } from '@aws-sdk/client-rds';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import RDSApplication from '../RDSApplication';
import ARDSObjectConnector from './ARDSObjectConnector';

export default class RDSAddRoleToDBCluster extends ARDSObjectConnector {

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const content = dto.getJsonData();
        this.checkParameters(['DBClusterIdentifier', 'RoleArn'], content as unknown as Record<string, unknown>);

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const application = this.getApplication<RDSApplication>();
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

    protected getCustomId(): string {
        return 'add-role-to-db-cluster';
    }

}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IInput {
    RoleArn: string;
    DBClusterIdentifier: string;
    FeatureName: string | undefined;
}

/* eslint-enable @typescript-eslint/naming-convention */
