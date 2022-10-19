import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import OracleDB from 'oracledb';
import ASqlApplication, { IDialect } from './Common/ASqlApplication';

export default class OracleDbApplication extends ASqlApplication {

    public constructor() {
        super(IDialect.oracledb);
    }

    public async getConnection(appInstall: ApplicationInstall): Promise<OracleDB.Connection> {
        const appId = appInstall.getId();
        let oracleDb = this.cache[appId] as OracleDB.Pool;

        if (oracleDb === undefined) {
            oracleDb = await OracleDB.createPool(this.getConfig(appInstall));
            this.cache[appId] = oracleDb;
        }

        return oracleDb.getConnection();
    }

    public getPublicName(): string {
        return 'OracleDB';
    }

    public getDescription(): string {
        return 'Commercial relational or SQL database that backs many critical operations and is in wide use amongst the enterprise.';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNDNzQ2MzQ7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDMuNCw1MS45aDYuNWwtMy40LTUuNWwtNi4zLDEwaC0yLjlsNy43LTEyYzAuNi0wLjgsMS43LTEsMi41LTAuNWMwLjIsMC4xLDAuMywwLjMsMC40LDAuNGw3LjcsMTJoLTIuOQoJbC0xLjMtMi4yaC02LjZMNDMuNCw1MS45IE03My4xLDU0LjJWNDMuN2gtMi40djExLjRjMCwwLjMsMC4xLDAuNiwwLjQsMC45YzAuMiwwLjIsMC42LDAuNCwwLjksMC40SDgzbDEuNC0yLjJMNzMuMSw1NC4yCgkgTTMyLjksNTIuM2MyLjQsMCw0LjMtMS45LDQuMy00LjNzLTEuOS00LjMtNC4zLTQuM0gyMi4ydjEyLjdoMi40VjQ2aDguMWMxLjEsMCwyLDAuOSwyLDJjMCwxLjEtMC45LDItMiwyaC02LjlsNy4zLDYuM2gzLjUKCWwtNC45LTQuMUgzMi45IE03LjMsNTYuNGg3LjRjMy41LTAuMSw2LjMtMyw2LjItNi41Yy0wLjEtMy40LTIuOC02LjEtNi4yLTYuMkg3LjNjLTMuNS0wLjEtNi40LDIuNy02LjUsNi4yCgljLTAuMSwzLjUsMi43LDYuNCw2LjIsNi41QzcuMSw1Ni40LDcuMiw1Ni40LDcuMyw1Ni40IE0xNC41LDU0LjJoLTdjLTIuMy0wLjEtNC0yLTQtNC4yYzAuMS0yLjIsMS44LTMuOSw0LTRoNwoJYzIuMy0wLjEsNC4yLDEuNyw0LjIsNGMwLjEsMi4zLTEuNyw0LjItNCw0LjJDMTQuNiw1NC4yLDE0LjYsNTQuMiwxNC41LDU0LjIgTTYwLjcsNTYuNGg3LjVsMS40LTIuMmgtOC44Yy0yLjMsMC4xLTQuMi0xLjctNC4yLTQKCWMtMC4xLTIuMywxLjctNC4yLDQtNC4yYzAuMSwwLDAuMiwwLDAuMywwSDY4bDEuNC0yLjJoLTguN2MtMy41LTAuMS02LjQsMi43LTYuNSw2LjJjLTAuMSwzLjUsMi43LDYuNCw2LjIsNi41CglDNjAuNCw1Ni40LDYwLjUsNTYuNCw2MC43LDU2LjQgTTkwLjQsNTQuMmMtMS44LDAtMy40LTEuMi0zLjktM2gxMC40bDEuNC0yLjJIODYuNWMwLjUtMS44LDIuMS0zLDMuOS0zaDcuMWwxLjQtMi4yaC04LjcKCWMtMy41LDAuMS02LjMsMy02LjIsNi41YzAuMSwzLjQsMi44LDYuMSw2LjIsNi4yaDcuNWwxLjQtMi4yTDkwLjQsNTQuMiIvPgo8L3N2Zz4K';
    }

}
