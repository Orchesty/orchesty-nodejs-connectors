import { QUERY } from '@orchesty/connector-amazon-apps-common/src/AAwsObjectConnector';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import RedshiftApplication from '../RedshiftApplication';
import ARedshiftObjectConnector from './ARedshiftObjectConnector';

export default class RedshiftExecuteQueryConnector extends ARedshiftObjectConnector {

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const content = dto.getJsonData();
        this.checkParameters([QUERY], content as unknown as Record<string, unknown>);

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const application = this.getApplication<RedshiftApplication>();
        const connection = await application.getConnection(applicationInstall);
        dto.setJsonData(connection.query(content[QUERY]));

        return dto;
    }

    protected getCustomId(): string {
        return 'query';
    }

}

export interface IInput {
    query: string;
}
