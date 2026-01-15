import {
    ApplicationInstall,
    IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { orchestyOptions } from '@orchesty/nodejs-sdk/dist/lib/Config/Config';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import { mockOnce } from '@orchesty/nodejs-sdk/dist/test/MockServer';

export const DEFAULT_USER = 'TestUser';
export const DEFAULT_CLIENT_ID = 'ClientId';
export const DEFAULT_CLIENT_SECRET = 'ClientSecret';
export const DEFAULT_ACCESS_TOKEN = 'AccessToken';
export const DEFAULT_PASSWORD = 'Password';

export function appInstall(
    name: string,
    user: string,
    settings: IApplicationSettings,
    nonEncryptedSettings: IApplicationSettings = {},
): ApplicationInstall {
    const app = new ApplicationInstall()
        .setEnabled(true)
        .setName(name)
        .setUser(user)
        .setSettings(settings)
        .setNonEncryptedSettings(nonEncryptedSettings);

    mockOnce([
        {
            request: {
                method: HttpMethods.GET, url: new RegExp(`${orchestyOptions.workerApi}/document/ApplicationInstall.*`),
            },
            response: {
                code: 200,
                body: [{ ...app.toArray(), settings }],
            },
        }]);

    return app;
}
