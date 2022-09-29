import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import ScopeSeparatorEnum from '@orchesty/nodejs-sdk/dist/lib/Authorization/ScopeSeparatorEnum';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

export const NAME = 'mergado';
export default class MergadoApplication extends AOAuth2Application {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Mergado';
    }

    public getDescription(): string {
        return 'Software with which you can automate the data flowing from your e-shop to search engines and other advertising systems';
    }

    public getAuthUrl(): string {
        return 'https://app.mergado.com/oauth2/authorize/';
    }

    public getTokenUrl(): string {
        return 'https://app.mergado.com/oauth2/token/';
    }

    public getLogo(): string {
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEX///9/uS9EqLdCeyet1dw8diXD3aVDqr1soDxSm4dBdxCCvC8uobJ0tAuCvS1Adgp6uAuSwJswpLo2cAD5cL30AAAFM0lEQVR4nN3UCXYcNxADUCpSEidy7Cz3v2s8bo26Z5pLsQpAk8QN/nsA0m9p7bylv9Ymvn1NL0sT377+kl5WJv4A3oTrEm/An8JViT+Bm3BN4gb8EK5I/ADehesR78BP4WrET+AuXIu4Aw/ClYgH4FG4DvEIfBCuQnwAPgrXID4Cn4QrEJ+Az8L5ic/Ak3B24gl4Fs5NPAMzwpmJGWBOOC8xB8wKZyVmgXnhnMQ8sCCckVgAloTzEUvAonA2YhFYFs5FLAMrwpmIFWBNOA+xBqwKZyFWgXXhHMQ6sCGcgdgAtoTjE1vApnB0YhPYFo5NbAMNwpGJBqBFOC7RAjQJRyWagDbhmEQb0CgckWgEWoXjEa1As3A0ohloF45FtAM7hCMRO4A9wnGIPcAu4SjELmCfcAxiH7BTOAKxE9grvJ7YC+wWXk3sBvYLryX2Ax3CK4kOoEd4HdEDdAmvIrqAPuE1RB/QKbyC6AR6hXqiF+gWqoluoF+oJfqBAaGSGABGhDpiBBgSqoghYEyoIcaAQaGCGARGhXxiFBgWsolhYFzIJcaBACGTCAAihDwiAggRsogQIEbIIWKAICGDCAKihHgiCggTookwIE6IJeKAQCGSCAQihTgiEggVoohQIFaIIWKBYCGCCAaihXEiGggXRolwIF4YI+KBBGGESAAyhH4iA0gReokUIEfoI3KAJKGHSAKyhP1EFpAm7CXSgDxhH5EHJAp7iEQgU2gnMoFUoZVIBXKFNiIXSBZaiGQgW9gmsoF0YYtIB/KFdSIfKBDWiAKgQlgmKoASYYkoAWqEeaIGKBLmiCKgSngmqoAy4TNRBtQJH4k6oFB4JAqBSuFOVAKlwjtRCtQKN6IWKBbeiGKgWvjy9z//aoFq4fuX//74fWXh+5dfX/8UE6XCG/BVTVQKN6CaKBR++wCKiTrhDnx9/S4kyoTvB6CUqBI+ApVFFQmfgUKiRngG6ogS4bcMUEZUCPNA1d0IhLmKCol8YRmoKSpdWANKiGxhHaggkoWlkxESucI2kH83VGGrohIiU2gDsotKFFqBZCJPaAdyiTSh5WT2ELfIEvYBmUSSsKeiZCJH2A/kbZEi9ABpRIbQB2QRCcLek9lD2SJe6AdyiHCht6I0IloYAzK2CBZGgQQiVhjZIIsIFSKA8C0ihRggmggUxjdIIeKEOCB2izAhEgglooSoDeKJICEaCNwiRogH4ogQIXaDYCJCyAGitggQsoAgYlzI2CCSGBYygZAtRoW8iqKIQSEbCCDGhHxgfIshoQIYJkaE3JNBEQNCFTC4Rb9QU9E40S1UAkNF9Qq1wAjRKVQDA0SfUHcycaJLeAXQfTceob6iEaJDeBXQWdR+4XVAH7FbeCXQRewVXnMyEWKn8Gqg4276hNdW1EfsEo4A7C5qj3AMYC+xQzgKsJNoF15/Mnt6iGbhSMCuu7EKx6noFjvRKBwN2FFUm3A8oJ1oEo4INBMtwrFOZo+NaBCOCjTeTVs4ZkW3WIhN4chAU1FbwrGBFmJDODrQQKwLxz2ZPS1iVTgDsHk3NeH4Fd1SJ1aEswAbRS0L5wHWiUXhTMAqsSSc42T2lIkF4WzAyt3khXNVdEuJmBXOCCwWNSecE1giZoSzAgvEs3C+k9mTI56EMwOzd/MsnLeiW87EtBYwU9S0GPBMTKsBT8SjcO6T2fO4xbQe8ImYFqvoliMxrQh82GJaEngkpjWBB2Ja7GT23LeYVgV+EtOSFd2yEdO6wI8tpoWBGzGtucF7fhDT0sDbFv8HQ1BHYyZxEboAAAAASUVORK5CYII=';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: unknown,
    ): RequestDto {
        const url = `https://api.mergado.com/${_url}`;
        const request = new RequestDto(url ?? '', method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,

        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', null, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', null, true));

        return new FormStack()
            .addForm(form);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[AUTHORIZATION_FORM];
        return authorizationForm?.[CLIENT_ID] && authorizationForm?.[CLIENT_SECRET];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return [
            'shop.read',
            'user.read',
            'project.read',
            'project.elements.write',
        ];
    }

    protected _getScopesSeparator(): string {
        return ScopeSeparatorEnum.SPACE;
    }

}
