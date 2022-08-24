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
        return 'YouTube allows billions of people to discover, watch and share originally-created videos. YouTube provides a forum for people to connect, inform, and inspire others across the globe and acts as a distribution platform for original content creators and advertisers large and small.';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIEFkb2JlIElsbHVzdHJhdG9yIDI0LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE1MCAxNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojRkYwMDAwO30KCS5zdDF7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTQ2LjksMzguN2MtMS43LTYuNS02LjgtMTEuNi0xMy4zLTEzLjNDMTIxLjksMjIuMiw3NSwyMi4yLDc1LDIyLjJzLTQ2LjksMC01OC42LDMuMgoJCUM5LjksMjcsNC45LDMyLjIsMy4xLDM4LjdDMCw1MC40LDAsNzUsMCw3NXMwLDI0LjYsMy4xLDM2LjNjMS43LDYuNSw2LjgsMTEuNiwxMy4zLDEzLjNjMTEuNywzLjIsNTguNiwzLjIsNTguNiwzLjIKCQlzNDYuOSwwLDU4LjYtMy4yYzYuNS0xLjcsMTEuNS02LjksMTMuMy0xMy4zQzE1MCw5OS42LDE1MCw3NSwxNTAsNzVTMTUwLDUwLjQsMTQ2LjksMzguNyIvPgoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTU5LjcsOTcuM0w5OC45LDc1TDU5LjcsNTIuN1Y5Ny4zeiIvPgo8L2c+Cjwvc3ZnPgo=';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['https://www.googleapis.com/auth/calendar'];
    }

}
