import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFlexiBeeTest } from '../../../../test/Implementation/flexiBee';
import { container } from '../../../../test/TestAbstract';
import { FLEXI_BEE_CREATE_OBJEDNAVKA_VYDANA } from '../FlexiBeeCreateObjednavkaVydanaConnector';

let tester: NodeTester;

describe('Tests for FlexiBeeCreateObjednavkaVydanaConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFlexiBeeTest();
    });

    it('process - ok', async () => {
        await tester.testConnector(FLEXI_BEE_CREATE_OBJEDNAVKA_VYDANA);
    });
});
