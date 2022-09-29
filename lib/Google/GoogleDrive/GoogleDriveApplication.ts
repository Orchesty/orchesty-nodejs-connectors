import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AGoogle from '../AGoogle';

export const BASE_URL = 'https://www.googleapis.com';

export default class GoogleDriveApplication extends AGoogle {

    public getName(): string {
        return 'google-drive';
    }

    public getPublicName(): string {
        return 'GoogleDrive';
    }

    public getBaseUrl(): string {
        return BASE_URL;
    }

    public getDescription(): string {
        return 'Cloud storage to store and access your photos, videos or documents from anywhere';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzAwNjZEQSIgZD0iTTExLjM0LDEyNC41bDYuNjE1LDExLjgyYzEuMzc1LDIuNDg4LDMuMzUxLDQuNDQzLDUuNjcsNS44NjVsMjMuNjI1LTQyLjMwMkgwDQoJCWMwLDIuNzU1LDAuNjg3LDUuNTEsMi4wNjIsNy45OThMMTEuMzQsMTI0LjV6Ii8+DQoJPHBhdGggZmlsbD0iIzAwQUM0NyIgZD0iTTc1LDUwLjExN0w1MS4zNzUsNy44MTVjLTIuMzIsMS40MjItNC4yOTYsMy4zNzctNS42Nyw1Ljg2NUwyLjA2Miw5MS44ODUNCgkJQzAuNzEzLDk0LjMyLDAuMDAyLDk3LjA3NywwLDk5Ljg4M2g0Ny4yNTFMNzUsNTAuMTE3eiIvPg0KCTxwYXRoIGZpbGw9IiNFQTQzMzUiIGQ9Ik0xMjYuMzc1LDE0Mi4xODVjMi4zMi0xLjQyMiw0LjI5Ni0zLjM3Nyw1LjY3LTUuODY1bDIuNzQ5LTQuODg4bDEzLjE0NC0yMy41NQ0KCQljMS4zNzUtMi40ODgsMi4wNjItNS4yNDMsMi4wNjItNy45OThoLTQ3LjI1NGwxMC4wNTUsMjAuNDRMMTI2LjM3NSwxNDIuMTg1eiIvPg0KCTxwYXRoIGZpbGw9IiMwMDgzMkQiIGQ9Ik03NSw1MC4xMTdMOTguNjI1LDcuODE1Yy0yLjMyLTEuNDIyLTQuOTgzLTIuMTMzLTcuNzMyLTIuMTMzSDU5LjEwN2MtMi43NDksMC01LjQxMiwwLjgtNy43MzIsMi4xMzMNCgkJTDc1LDUwLjExN3oiLz4NCgk8cGF0aCBmaWxsPSIjMjY4NEZDIiBkPSJNMTAyLjc0OSw5OS44ODNINDcuMjUxbC0yMy42MjUsNDIuMzAyYzIuMzIsMS40MjIsNC45ODMsMi4xMzMsNy43MzIsMi4xMzNoODcuMjg1DQoJCWMyLjc0OSwwLDUuNDEyLTAuOCw3LjczMi0yLjEzM0wxMDIuNzQ5LDk5Ljg4M3oiLz4NCgk8cGF0aCBmaWxsPSIjRkZCQTAwIiBkPSJNMTI2LjExNyw1Mi43ODNMMTA0LjI5NiwxMy42OGMtMS4zNzUtMi40ODgtMy4zNTEtNC40NDMtNS42Ny01Ljg2NUw3NSw1MC4xMTdsMjcuNzQ5LDQ5Ljc2N2g0Ny4xNjUNCgkJYzAtMi43NTUtMC42ODctNS41MS0yLjA2Mi03Ljk5OEwxMjYuMTE3LDUyLjc4M3oiLz4NCjwvZz4NCjwvc3ZnPg0K';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['https://www.googleapis.com/auth/drive.file'];
    }

}
