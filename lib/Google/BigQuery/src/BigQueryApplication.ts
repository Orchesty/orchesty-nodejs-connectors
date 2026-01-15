import AGoogle from '@orchesty/connector-google-common/src/AGoogle';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';

export const BASE_URL = 'https://bigquery.googleapis.com';

export default class BigQueryApplication extends AGoogle {

    public getBaseUrl(): string {
        return BASE_URL;
    }

    public getDescription(): string {
        return 'Serverless, highly scalable, and cost-effective multicloud data warehouse designed for business agility';
    }

    public getName(): string {
        return 'bigQuery';
    }

    public getPublicName(): string {
        return 'BigQuery';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiM0Mzg2RkE7fQoJLnN0MXtvcGFjaXR5OjAuMTtlbmFibGUtYmFja2dyb3VuZDpuZXcgICAgO30KCS5zdDJ7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjIuOCw4OC45TDEuMSw1My4xYy0xLjItMS45LTEuMi00LjMsMC02LjJsMjEuNi0zNS44QzIzLjksOS4yLDI2LDgsMjguNCw4aDQzLjNjMi4zLDAsNC40LDEuMiw1LjYsMy4xCgkJbDIxLjYsMzUuOGMxLjIsMS45LDEuMiw0LjMsMCw2LjJMNzcuMiw4OC45Qzc2LjEsOTAuOCw3NCw5Miw3MS42LDkySDI4LjNDMjYsOTIsMjMuOSw5MC44LDIyLjgsODguOUwyMi44LDg4Ljl6Ii8+Cgk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNjMuNSwzOC41YzAsMCw2LDEzLjgtMi4yLDIxLjZzLTIzLjEsMi44LTIzLjEsMi44TDY4LjYsOTJoMy4xYzIuMywwLDQuNC0xLjIsNS42LTMuMWwxNC4zLTIzLjdMNjMuNSwzOC41eiIKCQkvPgoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTcwLjYsNjYuN0w2NCw2MC4zYy0wLjEtMC4xLTAuMi0wLjEtMC4yLTAuMmM2LjEtNy41LDQuNy0xOC40LTMuMi0yNC4yUzQxLjMsMzEuNCwzNS4yLDM5cy00LjcsMTguNCwzLjIsMjQuMgoJCWM2LjUsNC44LDE1LjcsNC44LDIyLjIsMGMwLDAuMSwwLjEsMC4yLDAuMiwwLjJsNi42LDYuNGMwLjQsMC40LDEuMSwwLjQsMS41LDBsMS43LTEuN0M3MSw2Ny43LDcxLDY3LjEsNzAuNiw2Ni43eiBNNDkuNCw2Mi42CgkJYy03LjUsMC0xMy42LTUuOC0xMy42LTEzczYuMS0xMywxMy42LTEzUzYzLDQyLjQsNjMsNDkuNmMwLDAsMCwwLDAsMEM2Myw1Ni44LDU3LDYyLjYsNDkuNCw2Mi42eiBNNDAuNyw0OC45djUuNAoJCWMwLjksMS41LDIuMSwyLjcsMy42LDMuNXYtOC45TDQwLjcsNDguOXogTTQ3LjUsNDQuNHYxNC41YzEuMiwwLjIsMi40LDAuMiwzLjYsMFY0NC40TDQ3LjUsNDQuNHogTTU4LjEsNTQuMnYtMy4yaC0zLjZ2Ni43CgkJQzU1LjksNTYuOSw1Ny4yLDU1LjcsNTguMSw1NC4yTDU4LjEsNTQuMnoiLz4KPC9nPgo8L3N2Zz4K';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return ['https://www.googleapis.com/auth/bigquery'];
    }

}
