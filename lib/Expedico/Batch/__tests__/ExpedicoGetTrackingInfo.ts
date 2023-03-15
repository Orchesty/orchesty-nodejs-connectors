import { container } from '@orchesty/nodejs-sdk';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { appInstall, DEFAULT_USER } from '../../../../test/DataProvider';
import init from '../../../../test/Implementation/expedico';
import { CLIENT_ID } from '../../../Tableau/TableauApplication';
import { NAME as EXPEDICO_NAME } from '../../ExpedicoApplication';
import { NAME as EXPEDICO_GET_TRACKING_INFO } from '../ExpedicoGetTrackingInfo';

let tester: NodeTester;

describe('Tests for ActiveCampaignListAccountsBatch', () => {
    beforeEach(() => {
        tester = new NodeTester(container, __filename);
        init();
    });

    it('process - ok', async () => {
        appInstall(EXPEDICO_NAME, DEFAULT_USER, {
            [CoreFormsEnum.AUTHORIZATION_FORM]: {
                [CLIENT_ID]: 'testId',
                [CLIENT_SECRET]: 'testSecret',
            },
        });
        await tester.testBatch(EXPEDICO_GET_TRACKING_INFO);
    });
});
