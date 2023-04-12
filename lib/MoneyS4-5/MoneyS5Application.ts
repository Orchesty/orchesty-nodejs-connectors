import MoneyS45BaseApplication from './MoneyS4-5BaseApplication';

export const NAME = 'moneys5';

export default class MoneyS5Application extends MoneyS45BaseApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Money S5';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGQzRDMDI7fQo8L3N0eWxlPgo8Zz4KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iNTguMywzOC42IDc5LjIsMjEuMSA2MS42LDAuMiA0MC43LDE3LjcgMTkuOCwzNS4zIDM3LjQsNTYuMiAJIi8+Cgk8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjYyLjYsNDMuOCA0MS43LDYxLjQgMjAuOCw3OC45IDM4LjQsOTkuOCA1OS4zLDgyLjMgODAuMiw2NC43IAkiLz4KPC9nPgo8L3N2Zz4K';
    }

}
