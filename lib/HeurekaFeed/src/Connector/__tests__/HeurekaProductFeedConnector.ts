import { container } from '@orchesty/nodejs-connectors/test/TestAbstract';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { readFileSync } from 'fs';
import init from '../../../test/dataProvider';
import { NAME as HEUREKA_PRODUCT_FEED_CONNECTOR } from '../HeurekaProductFeedConnector';

let tester: NodeTester;

describe('Tests for HeurekaProductFeedConnector', () => {
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
                        `${__dirname}/Data/HeurekaProductFeedConnector/heurekaProductResponseMock.xml`,
                    ),
                },
            }]);
        await tester.testConnector(HEUREKA_PRODUCT_FEED_CONNECTOR);
    });
});
