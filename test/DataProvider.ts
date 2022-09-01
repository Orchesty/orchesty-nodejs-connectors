import {
    ApplicationInstall,
    IApplicationSettings,
} from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import { db } from './TestAbstract';

export const DEFAULT_USER = 'TestUser';
export const DEFAULT_CLIENT_ID = 'ClientId';
export const DEFAULT_CLIENT_SECRET = 'ClientSecret';
export const DEFAULT_ACCESS_TOKEN = 'AccessToken';
export const DEFAULT_PASSWORD = 'Password';

export async function appInstall(
    name: string,
    user: string,
    settings: IApplicationSettings,
    nonEncryptedSettings: IApplicationSettings = {},
): Promise<ApplicationInstall> {
    const repo = await db.getApplicationRepository();
    const app = new ApplicationInstall();
    const test = await repo.findByNameAndUser(name, user);

    if (test) {
        await repo.remove(test);
    }
    app
        .setName(name)
        .setUser(user)
        .setSettings(settings)
        .setNonEncryptedSettings(nonEncryptedSettings);
    await repo.insert(app);

    return app;
}
