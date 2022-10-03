import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const SUBDOMAIN = 'subdomain';
export const NAME = 'sage-hr';
export const API_KEY = 'api_key';
export default class SageHrApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'SageHR';
    }

    public getDescription(): string {
        return 'Cloud based human resources management solution that helps you remotely track, manage and engage your employees as easily as you do in the office';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIKCSBpZD0ic3ZnMjYyMyIgaW5rc2NhcGU6dmVyc2lvbj0iMC45Mi4wIHIxNTI5OSIgc29kaXBvZGk6ZG9jbmFtZT0ic2FnZS5zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIKCSBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgMTAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzAwREMwNjt9Cjwvc3R5bGU+CjxnPgoJCgkJPHNvZGlwb2RpOm5hbWVkdmlldyAgYm9yZGVyY29sb3I9IiM2NjY2NjYiIGJvcmRlcm9wYWNpdHk9IjEuMCIgZml0LW1hcmdpbi1ib3R0b209IjAiIGZpdC1tYXJnaW4tbGVmdD0iMCIgZml0LW1hcmdpbi1yaWdodD0iMCIgZml0LW1hcmdpbi10b3A9IjAiIGlkPSJiYXNlIiBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiIGlua3NjYXBlOmN4PSIxNDEuNzM2MTIiIGlua3NjYXBlOmN5PSI1My45NTU2NDMiIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJtbSIgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iNzQ0IiBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIiBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEyODAiIGlua3NjYXBlOndpbmRvdy14PSItNCIgaW5rc2NhcGU6d2luZG93LXk9Ii00IiBpbmtzY2FwZTp6b29tPSIzLjE2NDMzMTEiIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIgc2hvd2dyaWQ9ImZhbHNlIj4KCQk8L3NvZGlwb2RpOm5hbWVkdmlldz4KCTxnIGlkPSJsYXllcjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDg1LjEyNjAxNCwtMTk4LjU2OTQ3KSIgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiPgoJCTxnIGlkPSJnMjY1OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC41MDAwMDA5OCwtMC40OTk5OTgyMSkiPgoJCQk8cGF0aCBpZD0icGF0aDI2MjkiIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIGNsYXNzPSJzdDAiIGQ9Ik0xLjIsMjM0LjVjLTcuNywwLTEyLjcsNS4zLTEyLjcsMTQKCQkJCWMwLDEwLjgsNy43LDEzLjksMTMuMiwxMy45YzQuMSwwLDguMS0xLjcsMTAuOS00LjdsLTMuNS0zLjVjLTEuOSwxLjctNC4xLDIuNy03LjMsMi43Yy00LjMsMC03LjItMi41LTcuMi01LjloMTkuMQoJCQkJQzEzLjcsMjUwLjksMTcsMjM0LjUsMS4yLDIzNC41IE0tNS40LDI0Ni4yYzAtNC42LDMuNS02LjgsNy4zLTYuOHM3LjIsMi4zLDcuMiw2LjhILTUuNHoiLz4KCQkJPHBhdGggaWQ9InBhdGgyNjMxIiBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiBjbGFzcz0ic3QwIiBkPSJNLTY5LDI0NS44Yy0yLjUtMC4zLTkuNSwwLTkuNS0zLjNjMC0xLjksMy0yLjksNS43LTIuOQoJCQkJYzIuOSwwLDUuNywwLjgsOC4xLDIuM2wzLjctMy42Yy0xLjEtMC45LTUuMS0zLjctMTEuNy0zLjdjLTYsMC0xMS41LDMuMi0xMS41LDguMmMwLDcuOCw5LjQsNy44LDEzLjMsOC4xCgkJCQljMi40LDAuMiw0LjUsMC40LDQuNSwyLjdjMCwyLjItMy4zLDMuNC01LjksMy40Yy00LjIsMC02LjctMS40LTkuMS0zLjZsLTMuOSw0YzMuNCwzLjMsOCw1LjEsMTIuNyw1LjFjNywwLDEyLjEtMy4xLDEyLjEtOS4zCgkJCQlDLTYwLjYsMjQ4LjktNjMuNCwyNDYuNS02OSwyNDUuOCIvPgoJCQk8cGF0aCBpZD0icGF0aDI2MzMiIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIGNsYXNzPSJzdDAiIGQ9Ik0tNDguOSwyMzQuNWMtMy45LDAtNy43LDEuMy0xMC44LDMuN2wzLjcsMy43CgkJCQljMi4xLTEuNSw0LjYtMi4zLDcuMS0yLjNjNC43LDAsNi4xLDEuOSw2LjEsNHYyLjZoLTguM2MtMy4xLDAtOS4xLDAuOC05LjEsNy41YzAsNSwyLjgsOC42LDkuNiw4LjZjMy40LDAsNi0xLjEsNy44LTMuMnYyLjdoNgoJCQkJVjI0NEMtMzYuOCwyMzcuNy00MC42LDIzNC41LTQ4LjksMjM0LjUgTS00Mi44LDI1Mi4xYzAsNS4yLTMuNyw0LjktNi45LDQuOWMtMy4zLDAtNS40LTAuOS01LjQtMy4yYzAtMi4xLDEuNy0yLjksNS4zLTIuOWg3LjEKCQkJCVYyNTIuMXoiLz4KCQkJPHBhdGggaWQ9InBhdGgyNjM1IiBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiBjbGFzcz0ic3QwIiBkPSJNLTE4LjEsMjM1LjF2M2MtMi4xLTIuMy00LjUtMy41LTcuOS0zLjUKCQkJCWMtNS43LDAtOC43LDMuMi05LjYsNi42Yy0wLjQsMS4zLTAuNSwzLjctMC41LDcuM2MwLDMuNCwwLDYuNSwxLjIsOC44YzEuNiwzLjMsNS42LDUuMiw4LjksNS4yYzMuMiwwLDYtMS4zLDcuOS0zLjR2MS43CgkJCQljMCwyLTAuNywzLjMtMS45LDQuM2MtMS4zLDEtMi44LDEuNi01LjEsMS42Yy0yLDAtMy45LTEuMS01LTEuOWwtNC4xLDQuMWMyLjYsMi4xLDUuOCwzLjYsOS4yLDMuNmMzLjMsMC4xLDYuNS0xLDktMy4xCgkJCQljMi40LTEuOSw0LTUuNSw0LTkuM3YtMjQuOUwtMTguMSwyMzUuMXogTS0xOC4xLDI0OC40YzAsMi4xLDAsMy42LTAuMiw0LjRjLTAuNCwxLjctMi4zLDQtNS45LDRjLTAuOSwwLTUuNS0wLjUtNi00LjUKCQkJCWMtMC4xLTEuMy0wLjItMi42LTAuMi0zLjljMC0zLjEsMC4xLTQuMSwwLjMtNC44YzAuMy0xLjUsMi4zLTMuOSw1LjktMy45YzQuMywwLDUuNywyLjksNS45LDQuMQoJCQkJQy0xOC4yLDI0NS4zLTE4LjEsMjQ2LjgtMTguMSwyNDguNCIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8L3N2Zz4K';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        uri?: string,
        data?: unknown,
    ): RequestDto {
        const settings = applicationInstall.getSettings();
        const key = settings[AUTHORIZATION_FORM][API_KEY];
        const subdomain = settings[AUTHORIZATION_FORM][SUBDOMAIN];
        const url = `https://${subdomain}.sage.hr/api/${uri}`;
        const request = new RequestDto(url ?? '', method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            'X-Auth-Token': key, // eslint-disable-line
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, SUBDOMAIN, 'Subdomain', undefined, true))
            .addField(new Field(FieldType.TEXT, API_KEY, 'API key', undefined, true));

        return new FormStack().addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[SUBDOMAIN] && authorizationForm?.[API_KEY];
    }

}
