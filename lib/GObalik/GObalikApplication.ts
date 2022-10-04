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
import { encode } from '@orchesty/nodejs-sdk/dist/lib/Utils/Base64';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'go-balik';
export const USER = 'user';
export const PASSWORD = 'password';

export default class GObalikApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'GO balik';
    }

    public getDescription(): string {
        return 'Transport service for parcels and pallets not only in the Czech Republic, but also export and import from neighbouring countries';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyBpZD0iVnJzdHZhXzEiIGRhdGEtbmFtZT0iVnJzdHZhIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDk5LjgzIDI0LjYzIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZlZDEzNzt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTgsNTdjLjA4LTMuMjkuMTYtNi41Ny4yLTkuODYsMC0xLjU5LDAtMS42OC0xLjU3LTEuNTJBNDYuNzMsNDYuNzMsMCwwLDAsNy4xLDQ4YTEuMjEsMS4yMSwwLDAsMC0uOTQsMS42M2MuMjUuODMsMSwuNzEsMS41OC42N2ExNy41OCwxNy41OCwwLDAsMCwzLjktMSw2LjE1LDYuMTUsMCwwLDEsMi41NS0uNTcsNC4zNSw0LjM1LDAsMCwxLS4xNC41MSwyNS4zNCwyNS4zNCwwLDAsMS01LjY4LDguMzhBMy42OSwzLjY5LDAsMCwxLDQuNiw1OC43M2EzLjgsMy44LDAsMCwxLTIuMTctMy42NywxOC44NSwxOC44NSwwLDAsMSw3LTE0QTQuMjQsNC4yNCwwLDAsMSwxMi40LDQwYzEsLjA1LjkzLDEuMDcsMS4zNywxLjYzLjE4LjIzLjMzLjQ1LjY3LjMxYS42Ni42NiwwLDAsMCwuNDktLjYxYzAtLjYzLjA2LTEuMjYsMC0xLjg5LS4wNi0xLjQxLS40LTEuNjYtMS44My0xLjczLTIuNjgtLjEyLTQuNzMsMS4wNS02LjY2LDIuODNBMTkuMzEsMTkuMzEsMCwwLDAsLjEzLDU2LjY5YTQuNzksNC43OSwwLDAsMCwyLjc5LDQuMzYsNS4zOCw1LjM4LDAsMCwwLDUuODQtLjcxLDE5LjMyLDE5LjMyLDAsMCwwLDUuNy02LjkxYy4xOC0uNC4yOS0uOTEuODUtMSwwLDEuOSwwLDMuNzUsMCw1LjZBNi42LDYuNiwwLDAsMCwxNiw2MS43MWMuNDIuNjksMSwuNjQsMS42Ny41NnMuNjYtLjcxLjYxLTEuMjFBMjguNDYsMjguNDYsMCwwLDEsMTgsNTdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4wOCAtMzcuNjgpIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMzEuOTQsNDAuMzRhOS4zMiw5LjMyLDAsMCwxLTMtLjYsMi42NywyLjY3LDAsMCwwLTMuMjYuNTFjLTMuMTIsMy01LjI0LDYuNTQtNSwxMC44NCwwLDQuMjYsMS44OCw2LjEzLDUuODgsNi4yNWE5LjE0LDkuMTQsMCwwLDAsNS42NS0xLjhjMy4zOS0yLjM1LDUuNDItNS40OCw1LjM3LTkuNzNhNCw0LDAsMCwwLTEtMi42MkE3LjYxLDcuNjEsMCwwLDAsMzEuOTQsNDAuMzRabTEuNDgsMTAuNzFjLTEuNDcsMS40NC0yLjc4LDMuMDYtNC45MSwzLjZhNi40MSw2LjQxLDAsMCwxLTMuNjMsMCwyLjExLDIuMTEsMCwwLDEtMS42LTIuMTFjMC0xLjQ2LDAtMi45MywwLTQuMzlhMi45LDIuOSwwLDAsMSwuNTQtMS41NWMuOC0xLjIzLDEuNjUtMi40MiwyLjQ3LTMuNjNhMS4yOSwxLjI5LDAsMCwxLDEuNTMtLjYyLDI3LjI3LDI3LjI3LDAsMCwwLDQuMS42M2MyLjQzLjQsMy4zMSwxLjQyLDMuMjcsMy44M0E1LjcyLDUuNzIsMCwwLDEsMzMuNDIsNTEuMDVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4wOCAtMzcuNjgpIi8+PHBhdGggZD0iTTU4LjE1LDQ3LjA2YTIuMTksMi4xOSwwLDAsMC0yLjM2LDAsOC4xNiw4LjE2LDAsMCwwLTIuMSwxLjU1bC0zLjExLDNjMC0yLjQ1LDAtNC43OSwwLTcuMTJhOS43OSw5Ljc5LDAsMCwwLS41LTMuMzksMSwxLDAsMCwwLTEtLjc1Yy0uNTMsMC0uNTQuNTQtLjU4LjlhNTIsNTIsMCwwLDAsLjg2LDE1LjU5Yy4zOCwxLjc5LDEuODksMi4zNCwzLjQ2LDEuMzdhMTQuMjIsMTQuMjIsMCwwLDAsNC0zLjcsMTEsMTEsMCwwLDAsMi4yOS01QTIuMzgsMi4zOCwwLDAsMCw1OC4xNSw0Ny4wNlpNNTcsNTAuNzhhMTMuMzIsMTMuMzIsMCwwLDEtNC4zNSw1Yy0uMzUuMjUtLjc5LjUzLTEuMTguMjFzLS4yLS43Ny0uMDgtMS4xMmExMS4xOCwxMS4xOCwwLDAsMSw0LjUtNS45Yy44My0uNTQsMS40MS0uMTgsMS4zOC44NkE1Ljg0LDUuODQsMCwwLDEsNTcsNTAuNzhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMC4wOCAtMzcuNjgpIi8+PHBhdGggZD0iTTkyLjEyLDUyLjY0YzItMS41MywzLjktMy4xLDYuNDgtMy41Mi43MS0uMTIsMS40Ni0uNTIsMS4yOS0xLjQycy0xLS44MS0xLjY0LS43NGE3Ljg5LDcuODksMCwwLDAtMy43OCwxLjYxYy0xLjExLjc5LTIuMTYsMS42Ny0zLjM4LDIuNjItLjEtMi4zMS0uMTctNC40Ni0uMjgtNi42MmExMS4yMSwxMS4yMSwwLDAsMC0uNDItM2MtLjEyLS4zNy0uMzMtLjY2LS43Ni0uNmEuOS45LDAsMCwwLS44LjYyLDMuMjIsMy4yMiwwLDAsMC0uMDkuODJjMCw0Ljc1LjE1LDkuNS40OCwxNC4yNGE0LjUzLDQuNTMsMCwwLDAsLjU4LDJjLjIxLjM3LjQ2Ljg0LDEsLjdzLjU0LS41NS41Ni0xYzAtLjIsMC0uNCwwLS42LjA5LTEuNjUuMzYtMS44NCwxLjgzLTFBOS44Miw5LjgyLDAsMCwwLDk4LjMyLDU4Yy40MywwLDEuMTIuMTgsMS4yMi0uMzlzLS41OS0uNTctMS0uNzRjLTIuMDktLjkzLTQuMjEtMS44LTYuMjktMi43NEM5MS4yLDUzLjY3LDkxLjE2LDUzLjM5LDkyLjEyLDUyLjY0WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDggLTM3LjY4KSIvPjxwYXRoIGQ9Ik02Ny43NSw0Ni45NGEyMC43NywyMC43NywwLDAsMC02LDcuMjksNy42Nyw3LjY3LDAsMCwwLS42LDEuNjYsMi4xOSwyLjE5LDAsMCwwLDMsMi42Nyw2LDYsMCwwLDAsMS45My0xLjEzYzEuNTEtMS4yMywyLjY5LTIuNzksNC4yOS00LjM1VjU1LjlhNC44Nyw0Ljg3LDAsMCwwLC4zOSwyYy4xNy40LjM3Ljg5LjkuNzdzLjYzLS41NC42NS0xYTMwLjg3LDMwLjg3LDAsMCwwLS45My05LjUzQzcwLjc0LDQ1LjgyLDY5LjYxLDQ1LjQ3LDY3Ljc1LDQ2Ljk0Wm0xLjg3LDNBMTMsMTMsMCwwLDEsNjQuNSw1Ni41Yy0uMjguMTgtLjY0LjQ2LTEsLjE4cy0uMTgtLjY4LS4wNS0xYTE4LjEzLDE4LjEzLDAsMCwxLDQuODYtN2MuMjgtLjI1LjYyLS41NSwxLS4zMXMuMy42LjMyLDFBMi4yMSwyLjIxLDAsMCwxLDY5LjYyLDQ5Ljg5WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDggLTM3LjY4KSIvPjxwYXRoIGQ9Ik03Ny40NCw0MS4xNWMtLjg3LDAtLjc3LDEtLjg3LDEuNzEtLjM4LDIuNTktLjIsNS4yMi0uMzQsNy4xOS0uMSwyLjg5LDAsNS4xNS4wOSw3LjQsMCwuNTcuMjQsMS4xLjgyLDEuMTRzLjU1LS42LjU5LTFhMTAxLjgyLDEwMS44MiwwLDAsMCwuNDEtMTQuODJDNzguMTIsNDIuMiw3OC4zMyw0MS4xNCw3Ny40NCw0MS4xNVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjA4IC0zNy42OCkiLz48cGF0aCBkPSJNODMuNzgsNDguNDFjLS4xLS4zNi0uMTEtLjkyLS42Mi0uODdzLS4zNy41NC0uNDQuODhhMjYuMjcsMjYuMjcsMCwwLDAtLjE0LDYuNTEsOC4zMyw4LjMzLDAsMCwwLC44OSwzLjY1Yy4xMy4yNC4yMy41OC41Ni41MXMuMzQtLjQuMzgtLjY3QTE3Ljg3LDE3Ljg3LDAsMCwwLDg0LjU0LDU1LDMzLDMzLDAsMCwwLDgzLjc4LDQ4LjQxWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMDggLTM3LjY4KSIvPjxwYXRoIGQ9Ik04NS4yMyw0MmE4LjQ5LDguNDksMCwwLDAtMy4zNCwzLjYuNzMuNzMsMCwwLDAsLjE1Ljg4Yy4yNy4yNi41OS4xNC44OCwwQTguMzgsOC4zOCwwLDAsMCw4NS44MSw0NGExLjUzLDEuNTMsMCwwLDAsLjMxLTEuMTJDODYsNDIuNTMsODYsNDEuNSw4NS4yMyw0MloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjA4IC0zNy42OCkiLz48L3N2Zz4=';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, USER, 'user', undefined, true))
            .addField(new Field(FieldType.TEXT, PASSWORD, 'password', undefined, true));

        return new FormStack().addForm(form);
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const url = `https://go-balik.cz/api/v1/${_url}`;
        const request = new RequestDto(url, method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: encode(`${USER}:${PASSWORD}`),
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

}
