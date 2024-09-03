import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import assert from 'node:assert';
import { container } from '../../../test/TestAbstract';
import ShopifyApplication from '../ShopifyApplication';

describe('Tests for ShopifyApplication', () => {
    let app: ShopifyApplication;

    beforeEach(() => {
        app = new ShopifyApplication(container.get(CurlSender), container.get(OAuth2Provider));
    });

    it('process - parse nextLink', () => {
        const headers: Record<string, string> = {
            link: '<https://store.myshopify.com/admin/api/2024-01/orders.json?limit=250&page_info=abcdefgh98746632154>; rel="previous", <https//store.myshopify.com/admin/api/2024-01/orders.json?limit=250&page_info=abcdefgh1523898651>; rel="next"',

        };
        const link = app.getNextPageFromHeaders(headers);

        assert.deepEqual(link, 'https//store.myshopify.com/admin/api/2024-01/orders.json?limit=250&page_info=abcdefgh1523898651');
    });
});
