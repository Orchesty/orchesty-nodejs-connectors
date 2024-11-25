import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFlexiBeeTest } from '../../../../test/Implementation/flexiBee';
import { container } from '../../../../test/TestAbstract';
import { FLEXI_BEE_GET_OBJEDNAVKA_VYDANA_CONNECTOR } from '../FlexiBeeGetObjednavkaVydanaConnector';

let tester: NodeTester;

describe('Tests for FlexiBeeGetObjednavkaVydanaConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFlexiBeeTest();
    });

    it('process - ok', async () => {
        await tester.testConnector(FLEXI_BEE_GET_OBJEDNAVKA_VYDANA_CONNECTOR);
    });
});
