import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AGoogle from '../AGoogle';

export const BASE_URL = 'https://gmail.googleapis.com';
export const NAME = 'google-gmail';

export default class GmailApplication extends AGoogle {

    public getBaseUrl(): string {
        return BASE_URL;
    }

    public getDescription(): string {
        return 'The Gmail application lets you view and manage Gmail mailbox data like threads, messages, and labels.';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Gmail';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiM0Mjg1RjQ7fQoJLnN0MXtmaWxsOiMzNEE4NTM7fQoJLnN0MntmaWxsOiNGQkJDMDQ7fQoJLnN0M3tmaWxsOiNFQTQzMzU7fQoJLnN0NHtmaWxsOiNDNTIyMUY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03LDg3LjRoMTUuOVY0OC45bC0yMi43LTE3djQ4LjdDMC4yLDg0LjQsMy4yLDg3LjQsNyw4Ny40Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNzcuMiw4Ny40SDkzYzMuOCwwLDYuOC0zLDYuOC02LjhWMzEuOWwtMjIuNywxNyIvPgoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTc3LjIsMTkuNHYyOS41bDIyLjctMTd2LTkuMWMwLTguNC05LjYtMTMuMi0xNi4zLTguMiIvPgoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTIyLjgsNDguOVYxOS40TDUwLDM5LjhsMjcuMi0yMC40djI5LjVMNTAsNjkuMyIvPgoJPHBhdGggY2xhc3M9InN0NCIgZD0iTTAuMiwyMi44djkuMWwyMi43LDE3VjE5LjRsLTYuMy00LjhDOS43LDkuNiwwLjIsMTQuNCwwLjIsMjIuOCIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['https://www.googleapis.com/auth/gmail.compose'];
    }

}
