import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import AGoogle from '../AGoogle';

export const BASE_URL = 'https://www.googleapis.com';

export default class YoutubeApplication extends AGoogle {

    public getName(): string {
        return 'youtube';
    }

    public getPublicName(): string {
        return 'Youtube';
    }

    public getBaseUrl(): string {
        return BASE_URL;
    }

    public getDescription(): string {
        return 'Discover, watch and share originally-created videos';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRjAwMDA7fQoJLnN0MXtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05Ny43LDI2Yy0xLjItNC4zLTQuNS03LjctOC44LTguOGMtNS44LTIuMi02MS43LTMuMy03OCwwLjFjLTQuMywxLjItNy43LDQuNS04LjgsOC44CgkJQy0wLjUsMzcuNS0wLjcsNjIuMywyLjIsNzRjMS4yLDQuMyw0LjUsNy43LDguOCw4LjhjMTEuNCwyLjYsNjUuOCwzLDc4LDBjNC4zLTEuMiw3LjctNC41LDguOC04LjhDMTAwLjYsNjEuNSwxMDAuOCwzOC4zLDk3LjcsMjZ6CgkJIi8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNjYuNCw1MEw0MC4zLDM1VjY1TDY2LjQsNTB6Ii8+CjwvZz4KPC9zdmc+Cg==';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['https://www.googleapis.com/auth/calendar'];
    }

}
