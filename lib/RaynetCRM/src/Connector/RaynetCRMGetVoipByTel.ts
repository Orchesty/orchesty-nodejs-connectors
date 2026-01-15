import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'raynet-crm-get-voip-by-tel';

export default class RaynetCRMGetVoipByTel extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IOutput>> {
        const tel = this.getData(dto);

        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.GET,
            `voip/searchByTel?query=${tel}`,
        );
        const resp = await this.getSender().send<IResponse>(req, [201]);

        return this.processResult(dto, resp);
    }

    protected getData(dto: ProcessDto<IInput>): string {
        return dto.getJsonData().tel;
    }

    protected processResult(dto: ProcessDto, resp: ResponseDto<IResponse>): ProcessDto<IOutput> {
        return dto.setNewJsonData(resp.getJsonBody()) as unknown as ProcessDto<IOutput>;
    }

}

export interface IInput {
    tel: string;
}

export interface IResponse {
    success: boolean;
    data: IOutput;
}

export interface IOutput {
    person: IContact[];
    company: IContact[];
    lead: IContact[];
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface IContact {
    id: number;
    _permission: number;
    _version: number;
    name: string;
    state: string;
    role: string;
    owner: {
        id: number;
        _permission: number;
        _version: number;
        gender?: unknown;
        fullName: string;
        fullNameWithoutTitles: string;
        firstName: string;
        lastName: string;
        titleBefore?: unknown;
        notice?: unknown;
        titleAfter?: unknown;
        photo?: unknown;
        category?: unknown;
        salutation?: unknown;
        personClassification1?: unknown;
        personClassification2?: unknown;
        personClassification3?: unknown;
        customFields?: unknown;
        'contactInfo.tel1': string;
        'contactInfo.tel1Type'?: unknown;
        'contactInfo.tel2'?: unknown;
        'contactInfo.tel2Type'?: unknown;
        'contactInfo.email': string;
        'contactInfo.email2'?: unknown;
        'contactInfo.www'?: unknown;
        'privateAddress.countryCode'?: unknown;
        activeUserAccount: boolean;
        extIds?: unknown;
        securityLevel: {
            id: number;
            _permission: number;
            name: string;
            locked: boolean;
            extIds?: unknown;
        };
    };
    rating: string;
    regNumber: string;
    taxNumber: string;
    paymentTerm: {
        id: number;
        _permission: number;
        code01: string;
        code02?: unknown;
        numValue01: number;
        numValue02: number;
        strValue01?: unknown;
        strValue02?: unknown;
        rowAccess?: unknown;
        extIds?: unknown;
    };
    logo: {
        id: number;
        _permission: number;
        _version: number;
        contentType: string;
        fileName: string;
        iconSmallSize: number;
        iconSmallUuid?: unknown;
        size: number;
        preview: boolean;
        uuid: string;
        iconMediumUuid: string;
        iconMediumSize: number;
        iconLargeUuid?: unknown;
        iconLargeSize: number;
    };
    birthday: string;
    birthdayMonthDay: string;
    primaryAddress: {
        id: number;
        _permission: number;
        _version: number;
        'address.name': string;
        'address.street': string;
        'address.province'?: unknown;
        'address.zipCode': string;
        'address.city': string;
        'address.countryCode': string;
        'address.countryName': string;
        'address.lat': number;
        'address.lng': number;
        territory?: unknown;
        'contactInfo.tel1': string;
        'contactInfo.tel1Normalized': string;
        'contactInfo.tel1Type'?: unknown;
        'contactInfo.tel2'?: unknown;
        'contactInfo.tel2Normalized'?: unknown;
        'contactInfo.tel2Type'?: unknown;
        'contactInfo.email': string;
        'contactInfo.email2'?: unknown;
        'contactInfo.www': string;
        'contactInfo.fax'?: unknown;
        'contactInfo.doNotSendMM': boolean;
        'contactInfo.otherContact'?: unknown;
        primary: boolean;
        extIds?: unknown;
        contactAddress: boolean;
    };
    contactAddress: {
        id: number;
        _permission: number;
        _version: number;
        'address.name': string;
        'address.street': string;
        'address.province'?: unknown;
        'address.zipCode': string;
        'address.city': string;
        'address.countryCode': string;
        'address.countryName': string;
        'address.lat': number;
        'address.lng': number;
        territory?: unknown;
        'contactInfo.tel1': string;
        'contactInfo.tel1Normalized': string;
        'contactInfo.tel1Type'?: unknown;
        'contactInfo.tel2'?: unknown;
        'contactInfo.tel2Normalized'?: unknown;
        'contactInfo.tel2Type'?: unknown;
        'contactInfo.email': string;
        'contactInfo.email2'?: unknown;
        'contactInfo.www': string;
        'contactInfo.fax'?: unknown;
        'contactInfo.doNotSendMM': boolean;
        'contactInfo.otherContact'?: unknown;
        primary: boolean;
        extIds?: unknown;
        contactAddress: boolean;
    };
    'rowInfo.createdAt': string;
    'rowInfo.createdBy': string;
    'rowInfo.lastModifiedAt': string;
    'rowInfo.lastModifiedBy': string;
    securityLevel: {
        id: number;
        _permission: number;
        name: string;
        locked: boolean;
        extIds?: unknown;
    };
    validFrom: string;
    person: boolean;
    'socialNetworkContact.facebook': string;
    'currentBusinessValue.businessValue': number;
    'currentBusinessValue.openBusinessValue': number;
    legalForm: {
        id: number;
        _permission: number;
        code01: string;
        strValue01?: unknown;
        rowAccess?: unknown;
    };
    category?: unknown;
    economyActivity?: unknown;
    turnover?: unknown;
    notice?: unknown;
    contactSource?: unknown;
    employeesNumber?: unknown;
    taxNumber2?: unknown;
    bankAccount?: unknown;
    taxPayer?: unknown;
    databox?: unknown;
    court?: unknown;
    originLead?: unknown;
    companyClassification1?: unknown;
    companyClassification2?: unknown;
    companyClassification3?: unknown;
    prevActivity?: unknown;
    nextActivity?: unknown;
    lastWonBc?: unknown;
    'rowInfo.rowAccess'?: unknown;
    'rowInfo.rowState'?: unknown;
    'rowInfo.updatedAt'?: unknown;
    'rowInfo.updatedBy'?: unknown;
    tags?: unknown;
    validTill?: unknown;
    customFields?: unknown;
    'socialNetworkContact.googleplus'?: unknown;
    'socialNetworkContact.twitter'?: unknown;
    'socialNetworkContact.linkedin'?: unknown;
    'socialNetworkContact.pinterest'?: unknown;
    'socialNetworkContact.instagram'?: unknown;
    'socialNetworkContact.skype'?: unknown;
    'socialNetworkContact.youtube'?: unknown;
    firstName?: unknown;
    lastName?: unknown;
    salutation?: unknown;
    titleAfter?: unknown;
    titleBefore?: unknown;
    fullName?: unknown;
    inlineGdpr?: unknown;
    inlineSign?: unknown;
    extIds?: unknown;
    noticeJson?: unknown;
}
/* eslint-enable @typescript-eslint/naming-convention */
