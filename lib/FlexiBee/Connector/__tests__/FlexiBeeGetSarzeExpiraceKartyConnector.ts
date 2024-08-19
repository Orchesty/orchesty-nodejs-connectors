import NodeTester from '@orchesty/nodejs-sdk/dist/test/Testers/NodeTester';
import { initFlexiBeeTest } from '../../../../test/Implementation/flexiBee';
import { container } from '../../../../test/TestAbstract';
import { FLEXI_BEE_GET_SARZE_EXPIRACE_KARTY_CONNECTOR } from '../FlexiBeeGetSarzeExpiraceKartyConnector';

let tester: NodeTester;

describe('Tests for FlexiBeeGetSarzeExpiraceKartyConnector', () => {
    beforeAll(() => {
        tester = new NodeTester(container, __filename);
        initFlexiBeeTest();
    });

    it('process - ok', async () => {
        await tester.testConnector(FLEXI_BEE_GET_SARZE_EXPIRACE_KARTY_CONNECTOR);
    });
});
