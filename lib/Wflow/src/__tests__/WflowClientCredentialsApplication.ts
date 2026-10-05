import { appInstall, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET, DEFAULT_SDK, DEFAULT_USER } from '@orchesty/nodejs-connectors/test/DataProvider';
import { cacheService, container, db, redis } from '@orchesty/nodejs-connectors/test/TestAbstract';
import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import {
    ApplicationInstall,
    IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { mockAdapter, mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';
import WflowGetDocumentConnector from '../Connector/WflowGetDocumentConnector';
import { NAME, ORGANIZATION, ORGANIZATION_FORM } from '../WflowApplication';
import WflowClientCredentialsApplication, { getTokenCacheKey } from '../WflowClientCredentialsApplication';

const TOKEN_URL = 'https://account.wflow.com/connect/token';
const DOCUMENT_ID = 'doc-1';
const DOCUMENT_URL = `https://api.wflow.com/api/test/documents/${DOCUMENT_ID}`;
const OTHER_CLIENT_SECRET = 'OtherClientSecret';

let app: WflowClientCredentialsApplication;
let connector: WflowGetDocumentConnector;

function settings(clientId = DEFAULT_CLIENT_ID, clientSecret = DEFAULT_CLIENT_SECRET): IApplicationSettings {
    return {
        [CoreFormsEnum.AUTHORIZATION_FORM]: {
            [CLIENT_ID]: clientId,
            [CLIENT_SECRET]: clientSecret,
        },
        [ORGANIZATION_FORM]: {
            [ORGANIZATION]: 'test',
        },
    };
}

function install(clientId = DEFAULT_CLIENT_ID, clientSecret = DEFAULT_CLIENT_SECRET): ApplicationInstall {
    return appInstall(NAME, DEFAULT_USER, settings(clientId, clientSecret));
}

function mockToken(token: string): void {
    mockOnce([
        {
            request: { method: HttpMethods.POST, url: TOKEN_URL },
            response: {
                code: 200,
                body: Buffer.from(JSON.stringify({ access_token: token, expires_in: 3600, token_type: 'Bearer' })),
            },
        },
    ]);
}

function mockDocument(): void {
    mockOnce([
        {
            request: { method: HttpMethods.GET, url: DOCUMENT_URL },
            response: { code: 200, body: Buffer.from(JSON.stringify({ id: DOCUMENT_ID })) },
        },
    ]);
}

async function getDocument(clientSecret = DEFAULT_CLIENT_SECRET): Promise<void> {
    db.getApplicationRepository().clearCache();
    install(DEFAULT_CLIENT_ID, clientSecret);
    mockDocument();

    const dto = new ProcessDto();
    dto.setJsonData({ documentId: DOCUMENT_ID });
    dto.setHeaders({ user: DEFAULT_USER, sdk: DEFAULT_SDK });

    await connector.processAction(dto);
}

function tokenRequests(): { data?: unknown }[] {
    return mockAdapter.history.post.filter((request) => request.url === TOKEN_URL);
}

function documentAuthorizations(): unknown[] {
    return mockAdapter.history.get
        .filter((request) => request.url === DOCUMENT_URL)
        .map((request) => request.headers?.Authorization);
}

describe('Tests for WflowClientCredentialsApplication', () => {
    beforeAll(() => {
        app = new WflowClientCredentialsApplication(cacheService);
        connector = new WflowGetDocumentConnector();
        container.setApplication(app);
        container.setNode(connector, app);
    });

    beforeEach(async () => {
        mockAdapter.resetHistory();
        await redis.remove(getTokenCacheKey(DEFAULT_USER, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET));
        await redis.remove(getTokenCacheKey(DEFAULT_USER, DEFAULT_CLIENT_ID, OTHER_CLIENT_SECRET));
    });

    afterAll(async () => {
        await redis.close();
    });

    it('should share name and metadata with WflowApplication', () => {
        expect(app.getName()).toEqual('wflow');
        expect(app.getPublicName()).toEqual('wflow');
        expect(app.getTokenUrl()).toEqual(TOKEN_URL);
        expect(app.getWebhookSubscriptions()).toEqual([]);
    });

    it('should be authorized only with client id and secret', () => {
        expect(app.isAuthorized(new ApplicationInstall().setSettings(settings()))).toBe(true);
        expect(app.isAuthorized(new ApplicationInstall().setSettings(settings(DEFAULT_CLIENT_ID, '')))).toBe(false);
        expect(app.isAuthorized(new ApplicationInstall().setSettings(settings('', DEFAULT_CLIENT_SECRET)))).toBe(false);
    });

    it('should have client credentials and organization fields', () => {
        const fields = app.getFormStack().getForms().flatMap((form) => form.getFields());

        expect(fields.find((field) => field.getKey() === CLIENT_SECRET)?.getType()).toEqual(FieldType.TEXT);
        expect(fields.find((field) => field.getKey() === ORGANIZATION)?.getType()).toEqual(FieldType.TEXT);
    });

    it('should send connector request with client credentials token', async () => {
        mockToken('token-1');

        await getDocument();

        expect(documentAuthorizations()).toEqual(['Bearer token-1']);
        expect(tokenRequests().map((request) => request.data)).toEqual([
            `grant_type=client_credentials&client_id=${DEFAULT_CLIENT_ID}&client_secret=${DEFAULT_CLIENT_SECRET}&scope=uccl_common_api`,
        ]);
    });

    it('should reuse cached token', async () => {
        mockToken('token-1');

        await getDocument();
        await getDocument();

        expect(documentAuthorizations()).toEqual(['Bearer token-1', 'Bearer token-1']);
        expect(tokenRequests()).toHaveLength(1);
    });

    it('should request new token when credentials change', async () => {
        const key = getTokenCacheKey(DEFAULT_USER, DEFAULT_CLIENT_ID, DEFAULT_CLIENT_SECRET);

        expect(getTokenCacheKey(DEFAULT_USER, DEFAULT_CLIENT_ID, OTHER_CLIENT_SECRET)).not.toEqual(key);
        expect(getTokenCacheKey(DEFAULT_USER, 'OtherClientId', DEFAULT_CLIENT_SECRET)).not.toEqual(key);
        expect(key).not.toContain(DEFAULT_CLIENT_SECRET);

        mockToken('token-1');
        mockToken('token-2');

        await getDocument();
        await getDocument(OTHER_CLIENT_SECRET);

        expect(documentAuthorizations()).toEqual(['Bearer token-1', 'Bearer token-2']);
        expect(tokenRequests()).toHaveLength(2);
    });
});
