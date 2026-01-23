import { GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { CONTENT, KEY, NAME } from '@orchesty/connector-amazon-apps-common';
import OnRepeatException from '@orchesty/nodejs-sdk/dist/lib/Exception/OnRepeatException';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import S3Application, { BUCKET } from '../S3Application';
import AS3ObjectConnector from './AS3ObjectConnector';

export default class S3GetObjectConnector extends AS3ObjectConnector {

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto> {
        const content = dto.getJsonData();
        this.checkParameters([NAME], content as unknown as Record<string, unknown>);

        const applicationInstall = await this.getApplicationInstallFromProcess(dto);
        const application = this.getApplication<S3Application>();
        const client = application.getS3Client(applicationInstall);
        const input: GetObjectCommandInput = {
            [BUCKET]: this.getBucket(applicationInstall),
            [KEY]: content[NAME],
        };
        const command = new GetObjectCommand(input);

        try {
            const response: GetObjectCommandOutput = await client.send(command);
            dto.setJsonData({
                [NAME]: content[NAME],
                [CONTENT]: response.Body,
            });
        } catch (e) {
            throw new OnRepeatException(60, 10, (e as Error)?.message ?? 'Unknown error.');
        }

        return dto;
    }

    protected getCustomId(): string {
        return 'get-object';
    }

}

export interface IInput {
    name: string;
}
