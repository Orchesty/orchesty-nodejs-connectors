import AGoogle from '@orchesty/connector-google-common/src/AGoogle';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';

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
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMwMDY2REE7fQoJLnN0MXtmaWxsOiMwMEFDNDc7fQoJLnN0MntmaWxsOiNFQTQzMzU7fQoJLnN0M3tmaWxsOiMwMDgzMkQ7fQoJLnN0NHtmaWxsOiMyNjg0RkM7fQoJLnN0NXtmaWxsOiNGRkJBMDA7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03LjYsODEuOWw0LjQsNy42YzAuOSwxLjYsMi4yLDIuOSwzLjgsMy44TDMxLjUsNjZIMGMwLDEuOCwwLjUsMy42LDEuNCw1LjJMNy42LDgxLjl6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTAsMzRMMzQuMyw2LjdjLTEuNSwwLjktMi45LDIuMi0zLjgsMy44TDEuNCw2MC45QzAuNSw2Mi40LDAsNjQuMiwwLDY2aDMxLjVMNTAsMzR6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNODQuMiw5My4zYzEuNS0wLjksMi45LTIuMiwzLjgtMy44bDEuOC0zLjFsOC44LTE1LjJjMC45LTEuNiwxLjQtMy40LDEuNC01LjJINjguNWw2LjcsMTMuMkw4NC4yLDkzLjN6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNTAsMzRMNjUuNyw2LjdjLTEuNS0wLjktMy4zLTEuNC01LjItMS40SDM5LjRjLTEuOCwwLTMuNiwwLjUtNS4yLDEuNEw1MCwzNHoiLz4KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik02OC41LDY2aC0zN0wxNS44LDkzLjNjMS41LDAuOSwzLjMsMS40LDUuMiwxLjRoNTguMmMxLjgsMCwzLjYtMC41LDUuMi0xLjRMNjguNSw2NnoiLz4KCTxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik04NC4xLDM1LjdMNjkuNSwxMC41Yy0wLjktMS42LTIuMi0yLjktMy44LTMuOEw1MCwzNEw2OC41LDY2aDMxLjRjMC0xLjgtMC41LTMuNi0xLjQtNS4yTDg0LjEsMzUuN3oiLz4KPC9nPgo8L3N2Zz4K';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['https://www.googleapis.com/auth/drive.file'];
    }

}
