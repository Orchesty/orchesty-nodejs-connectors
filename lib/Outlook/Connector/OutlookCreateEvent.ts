import AConnector from '@orchesty/nodejs-sdk/dist/lib/Connector/AConnector';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';

export const NAME = 'outlook-create-event';

export enum ShowAsEnum {
    FREE = 'free',
    TENTATIVE = 'tentative',
    BUSY = 'busy',
    OOF = 'oof',
    WORKING_ELSEWHERE = 'workingElsewhere',
    UNKNOWN = 'unknown',
}

export enum ImportanceEnum {
    LOW = 'low',
    NORMAL = 'normal',
    HIGH = 'high',
}

export enum OnlineMeetingProviderEnum {
    TEAMS_FOR_BUSINESS = 'teamsForBusiness',
    SKYPE_FOR_BUSINESS = 'skypeForBusiness',
    SKYPE_FOR_CONSUMER = 'skypeForConsumer',
    UNKNOWN = 'unknown',
}

export enum SensitivityEnum {
    NORMAL = 'normal',
    PERSONAL = 'personal',
    PRIVATE = 'private',
    CONFIDENTIAL = 'confidential',
}

export enum TypeEnum {
    SINGLE_INSTANCE = 'singleInstance',
    OCCURRENCE = 'occurrence',
    EXCEPTION = 'exception',
    SERIES_MASTER = 'seriesMaster',
}

export enum LocationTypeEnum {
    DEFAULT = 'default',
    CONFERENCE_ROOM = 'conferenceRoom',
    HOME_ADDRESS = 'homeAddress',
    BUSINESS_ADDRESS = 'businessAddress',
    GEO_COORDINATES = 'geoCoordinates',
    STREET_ADDRESS = 'streetAddress',
    HOTEL = 'hotel',
    RESTAURANT = 'restaurant',
    LOCAL_BUSINESS = 'localBusiness',
    POSTAL_ADDRESS = 'postalAddress',
}

export enum PhoneType {
    HOME = 'home',
    BUSINESS = 'business',
    MOBILE = 'mobile',
    OTHER = 'other',
    ASSISTANT = 'assistant',
    HOME_FAX = 'homeFax',
    BUSINESS_FAX = 'businessFax',
    OTHER_FAX = 'otherFax',
    PAPER = 'pager',
    RADIO = 'radio',
}

export default class OutlookCreateEvent extends AConnector {

    public getName(): string {
        return NAME;
    }

    public async processAction(dto: ProcessDto<IInput>): Promise<ProcessDto<IInput>> {
        const req = await this.getApplication().getRequestDto(
            dto,
            await this.getApplicationInstallFromProcess(dto),
            HttpMethods.POST,
            '/me/events',
            dto.getJsonData(),
        );
        const resp = await this.getSender().send<IInput>(req, [201]);

        return dto.setNewJsonData(resp.getJsonBody());
    }

}

export interface IInput {
    id?: string;
    allowNewTimeProposals?: boolean;
    attendees?: {
        emailAddress?: IEmailAddress,
        proposedNewTime?: {
            start?: IDateTimeZone;
            end?: IDateTimeZone;
        }
        status?: IResponseStatus,
        type?: string;
    }[];
    body?: {
        content?: string;
        contentType?: string;
    };
    bodyPreview?: string;
    categories?: string;
    changeKey?: string;
    createdDateTime?: string;
    end?: IDateTimeZone;
    hasAttachments?: boolean;
    hideAttendees?: boolean;
    iCalUId?: string;
    importance?: ImportanceEnum;
    isAllDay?: boolean;
    isCancelled?: boolean;
    isDraft?: boolean;
    isOnlineMeeting?: boolean;
    isOrganizer?: boolean;
    isReminderOn?: boolean;
    lastModifiedDateTime?: string;
    location?: ILocation;
    locations?: ILocation[];
    onlineMeeting?: {
        conferenceId?: string;
        joinUrl?: string;
        phones?: {
            number?: string;
            type?: PhoneType;
        }[];
        quickDial?: string;
        tollFreeNumbers?: string[];
        tollNumber?: string;
    };
    onlineMeetingProvider?: OnlineMeetingProviderEnum;
    onlineMeetingUrl?: string;
    organizer?: {
        emailAddress?: IEmailAddress;
    };
    originalEndTimeZone?: string;
    originalStart?: string;
    originalStartTimeZone?: string;
    recurrence?: {
        pattern?: {
            dayOfMonth?: number;
            daysOfWeek?: string[];
            firstDayOfWeek?: string;
            index?: string;
            interval?: number;
            month?: number;
            type?: string;
        },
        range?: {
            endDate?: IDateTimeZone;
            numberOfOccurrences?: number;
            recurrenceTimeZone?: string;
            startDate?: IDateTimeZone;
            type?: string;
        },
    };
    reminderMinutesBeforeStart?: number;
    responseRequested?: boolean;
    responseStatus?: IResponseStatus;
    sensitivity?: SensitivityEnum;
    seriesMasterId?: string;
    showAs?: ShowAsEnum;
    start?: IDateTimeZone;
    subject?: string;
    transactionId?: string;
    type?: TypeEnum;
    webLink?: string;
}

export interface IDateTimeZone {
    dateTime: string;
    timeZone?: string;
}

export interface ILocation {
    address?: {
        city?: string;
        countryOrRegion?: string;
        postalCode?: string;
        state?: string;
        street?: string;
    },
    coordinates?: {
        accuracy?: number;
        altitude?: number;
        altitudeAccuracy?: number;
        latitude?: number;
        longitude?: number;
    },
    displayName?: string;
    locationEmailAddress?: string;
    locationUri?: string;
    locationType?: LocationTypeEnum;
    uniqueId?: string;
    uniqueIdType?: string;
}

export interface IEmailAddress {
    address?: string;
    name?: string;
}

export interface IResponseStatus {
    response?: string;
    time?: string;
}
