import { DeleteObjectCommand, DeleteObjectCommandInput } from '@aws-sdk/client-s3';
import { KEY } from '@orchesty/connector-amazon-apps-common/src/AAwsApplication';
import { NAME } from '@orchesty/connector-amazon-apps-common/src/AAwsObjectConnector';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import S3Application, { BUCKET } from '../S3Application';
import AS3ObjectConnector from './AS3ObjectConnector';

export default class S3DeleteObjectConnector extends AS3ObjectConnector {

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const content = dto.getJsonData();
        this.checkParameters([NAME], content as unknown as Record<string, unknown>);

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const application = this.getApplication<S3Application>();
        const client = application.getS3Client(applicationInstall);

        const input: DeleteObjectCommandInput = {
            [BUCKET]: this.getBucket(applicationInstall),
            [KEY]: content[NAME],
        };
        const command: DeleteObjectCommand = new DeleteObjectCommand(input);
        try {
            await client.send(command);
        } catch (e) {
            throw new OnRepeatException(60, 10, (e as Error)?.message ?? 'Unknown error.');
        }
        dto.setJsonData({ [NAME]: content[NAME] });

        return dto;
    }

    protected getCustomId(): string {
        return 'delete-object';
    }

}

export interface IInput {
    [NAME]: string;
}
