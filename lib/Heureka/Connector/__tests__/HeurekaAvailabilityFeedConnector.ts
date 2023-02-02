import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { readFileSync } from 'fs';
import init from '../../../../test/Implementation/heureka';
import { container } from '../../../../test/TestAbstract';
import { NAME as HEUREKA_AVAILABILITY_FEED_CONNECTOR } from '../HeurekaAvailabilityFeedConnector';

let tester: NodeTester;

describe('Tests for HeurekaAvailabilityFeedConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename, false, ['']);
        init();
    });

    it('process - ok', async () => {
        mockOnce([
            {
                request: {
                    method: HttpMethods.GET, url: /https:\/\/path\.to\/xml*/,
                },
                response: {
                    code: 200,
                    body: readFileSync(
                        `${__dirname}/Data/HeurekaAvailabilityFeedConnector/heurekaAvailabilityResponseMock.xml`,
                    ),
                },
            }]);
        await tester.testConnector(HEUREKA_AVAILABILITY_FEED_CONNECTOR);
    });
});
