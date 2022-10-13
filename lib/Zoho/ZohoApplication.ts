import CoreFormsEnum from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import ScopeSeparatorEnum from '@orchesty/nodejs-sdk/dist/lib/Authorization/ScopeSeparatorEnum';
import { TOKEN } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';

const API_PATH = '/api/v2';

export const NAME = 'zoho';
export const API_DOMAIN = 'api_domain';
export const CREATOR_FORM = 'creator_form';
export const ACCOUNT_OWNER_NAME = 'account_owner_name';
export const APP_LINK_NAME = 'app_link_name';
export const FORM_LINK_NAME = 'form_link_name';
export const REPORT_LINK_NAME = 'report_link_name';

export default class ZohoApplication extends AOAuth2Application {

    public getAuthUrl(): string {
        return 'https://accounts.zoho.eu/oauth/v2/auth';
    }

    public getDescription(): string {
        return 'Zoho is a provider of a Customer Relationship Management (CRM) solution';
    }

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Zoho';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IlZyc3R2YV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTAwIDEwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNFNzkyMjQ7fQoJLnN0MXtmaWxsOnVybCgjU1ZHSURfMV8pO30KCS5zdDJ7ZmlsbDojRkVGMjZGO30KCS5zdDN7ZmlsbDojOTFDOUVEO30KCS5zdDR7ZmlsbDp1cmwoI1NWR0lEXzJfKTt9Cgkuc3Q1e2ZpbGw6IzBCOUFENjt9Cgkuc3Q2e2NsaXAtcGF0aDp1cmwoI1NWR0lEXzRfKTt9Cgkuc3Q3e2ZpbGw6dXJsKCNTVkdJRF81Xyk7fQoJLnN0OHtmaWxsOiM5OEQwQTA7fQoJLnN0OXtmaWxsOiM2OEJGNkI7fQoJLnN0MTB7ZmlsbDp1cmwoI1NWR0lEXzZfKTt9Cgkuc3QxMXtmaWxsOiNFRjQ2M0Q7fQoJLnN0MTJ7ZmlsbDojNzYxMTE2O30KCS5zdDEze2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxnIHRyYW5zZm9ybT0ibWF0cml4KDEuMzMzMyAwIDAgLTEuMzMzMyAwIDEwMC4wOCkiPgoJPGcgdHJhbnNmb3JtPSJtYXRyaXgoLjI5Mzc4IDAgMCAuMjkzNzggMCAuMDQyMzczKSI+CgkJPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzQwLjM4IDIwMC44NCkiPgoJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNLTQ4NS4yLTQ3LjF2LTYyLjZsLTguNC04LjR2NjEuMkwtNDg1LjItNDcuMSIvPgoJCTwvZz4KCQkKCQkJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItNjE1LjQ1MjkiIHkxPSItOTUwLjEzOTUiIHgyPSItNjE1LjA5NjUiIHkyPSItOTUwLjEzOTUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoLTIuNzQxODc4ZS0wNiAtNjQuMzU1OCAtNjQuMzU1OCAyLjc0MTg3OGUtMDYgLTYwOTI3LjY5MTQgLTM5NDY0LjgzOTgpIj4KCQkJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRTUwMCIvPgoJCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkNCODIyIi8+CgkJPC9saW5lYXJHcmFkaWVudD4KCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjQ2LjksMTQ0aC01NS4zVjgyLjdoNTUuM1YxNDR6Ii8+CgkJPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTgxLjEgMjAwLjcyKSI+CgkJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0tMzgwLjgtNDdsLTguNy05LjhoNTUuM2w4LjIsOS44TC0zODAuOC00NyIvPgoJCTwvZz4KCQk8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzODIuMjMgMTkzLjE5KSI+CgkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0tMjUwLjQtNDIuMWw1NC40LDcuOGwtNC42LTEzLjVsLTUxLjUtOC41bDAuMiw5LjZMLTI1MC40LTQyLjEiLz4KCQk8L2c+CgkJCgkJCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMl8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iLTYxOS40Njc3IiB5MT0iLTk0MC40Nzg4IiB4Mj0iLTYxOS4xMTg4IiB5Mj0iLTk0MC40Nzg4IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDYzLjA5NDUgLTUwLjY2OTkgLTUwLjY2OTkgLTYzLjA5NDUgLTg0MzguMjQ1MSAtOTA1OTEpIj4KCQkJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzE2OENDQyIvPgoJCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMDA2NDlFIi8+CgkJPC9saW5lYXJHcmFkaWVudD4KCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTgxLjcsMTQ1LjRsNy41LTU0LjlsLTUzLjYtNy44bC03LjIsNTMuMWwzLjEsMi41TDE4MS43LDE0NS40Ii8+CgkJPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTQwLjE4IDIxNS4xNSkiPgoJCQk8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNLTM1NC01Ni4zbDAtMC4zbDcuMS01Ni4ybC00LjEtMTEuOGwtNy41LDU0LjkiLz4KCQk8L2c+CgkJPGc+CgkJCTxkZWZzPgoJCQkJPHBvbHlsaW5lIGlkPSJTVkdJRF8zXyIgcG9pbnRzPSI4NS44LDE1NS43IDEzNCwxMzMuMyAxMTIuMyw4Mi4yIDY0LjEsMTA0LjcgODUuOCwxNTUuNyAJCQkJIi8+CgkJCTwvZGVmcz4KCQkJPGNsaXBQYXRoIGlkPSJTVkdJRF80XyI+CgkJCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8zXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJCQk8L2NsaXBQYXRoPgoJCQk8ZyBjbGFzcz0ic3Q2Ij4KCQkJCQoJCQkJCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfNV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iLTYxMy41NiIgeTE9Ii05NTUuMTc0NiIgeDI9Ii02MTMuMjAzNiIgeTI9Ii05NTUuMTc0NiIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgtMi4zNTAxODFlLTA2IC01Ni4zODA4IC01Ni4zODA4IDIuMzUwMTgxZS0wNiAtNTM3MjUuOTAyMyAtMzQ0NTcuNzE4OCkiPgoJCQkJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiMyNUExNDkiLz4KCQkJCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMDA4QTUyIi8+CgkJCQk8L2xpbmVhckdyYWRpZW50PgoJCQkJPHBhdGggY2xhc3M9InN0NyIgZD0iTTAuMSwxNzMuMmgyNTV2LTkxSDAuMVYxNzMuMnoiLz4KCQkJPC9nPgoJCTwvZz4KCQk8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMzQuMzEgMjU1LjM2KSI+CgkJCTxwYXRoIGNsYXNzPSJzdDgiIGQ9Ik0tMTUzLjUtODIuMWw1LTE3LjVsNDguMi0yMi41bC00LDE2LjdMLTE1My41LTgyLjEiLz4KCQk8L2c+CgkJPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjM0LjMxIDI1NS4zNikiPgoJCQk8cGF0aCBjbGFzcz0ic3Q5IiBkPSJNLTE1My41LTgyLjFsLTE5LjQtNDcuNmwyLjctMjAuOWwyMS43LDUxTC0xNTMuNS04Mi4xIi8+CgkJPC9nPgoJCQoJCQk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzZfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9Ii02MTIuODc2NyIgeTE9Ii05NTMuNzc4OCIgeDI9Ii02MTIuNTIyNiIgeTI9Ii05NTMuNzc4OCIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCg5LjY5NjEgLTU4LjUzNTIgLTU4LjUzNTIgLTkuNjk2MSAtNDk4NjAuMTA5NCAtNDQ5ODIuNTgyKSI+CgkJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNEOTIyMzEiLz4KCQkJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0JBMjIzNCIvPgoJCTwvbGluZWFyR3JhZGllbnQ+CgkJPHBhdGggY2xhc3M9InN0MTAiIGQ9Ik01NCwxNDUuNWw3LjktNTRMOC43LDgyLjhsLTguNSw1NC4xTDU0LDE0NS41Ii8+CgkJPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxNTMuNTcpIj4KCQkJPHBhdGggY2xhc3M9InN0MTEiIGQ9Ik0wLjEtMTYuNkwzLjksMi43bDUzLjcsOC45TDU0LTguMUwwLjEtMTYuNiIvPgoJCTwvZz4KCQk8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNjYuODggMjMyLjcpIj4KCQkJPHBhdGggY2xhc3M9InN0MTIiIGQ9Ik0tMTA5LjMtNjcuNmw3LjktNTQuNWwtMy42LTE5LjFsLTcuOSw1NEwtMTA5LjMtNjcuNiIvPgoJCTwvZz4KCQk8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MDAuNDcgMTQ3Ljc2KSI+CgkJCTxwYXRoIGNsYXNzPSJzdDEzIiBkPSJNLTMyNy45LTEyLjljLTAuMiwxLjctMC44LDMtMS43LDMuOWMtMC43LDAuNy0xLjYsMS0yLjcsMWMtMC4zLDAtMC41LDAtMC44LTAuMWMtMS40LTAuMi0yLjUtMC45LTMuMS0yCgkJCQljLTAuNS0wLjgtMC43LTEuOC0wLjctMi45YzAtMC40LDAtMC45LDAuMS0xLjNsMi0xNC4zbC0xNS40LTIuM2wtMiwxNC4zYy0wLjIsMS43LTAuOCwyLjktMS43LDMuOGMtMC43LDAuNy0xLjYsMS4xLTIuNywxLjEKCQkJCWMtMC4yLDAtMC41LDAtMC43LTAuMWMtMS41LTAuMi0yLjYtMC45LTMuMi0yYy0wLjUtMC44LTAuNy0xLjctMC43LTIuOWMwLTAuNCwwLTAuOSwwLjEtMS40bDUuMy0zNy4xYzAuMi0xLjcsMC44LTMsMS44LTMuOAoJCQkJYzAuNy0wLjcsMS43LTEsMi43LTFjMC4zLDAsMC42LDAsMC45LDAuMWMxLjMsMC4yLDIuNCwwLjksMywyYzAuNCwwLjgsMC43LDEuNywwLjcsMi44YzAsMC40LDAsMC45LTAuMSwxLjRsLTIuMiwxNC43bDE1LjQsMi4zCgkJCQlsMi4yLTE0LjdjMC4yLTEuNywwLjgtMywxLjctMy44YzAuNy0wLjcsMS43LTEsMi43LTFjMC4zLDAsMC41LDAsMC44LDAuMWMxLjQsMC4yLDIuNSwwLjksMy4xLDJjMC41LDAuOCwwLjcsMS43LDAuNywyLjgKCQkJCWMwLDAuNCwwLDAuOS0wLjEsMS40TC0zMjcuOS0xMi45eiBNLTM5MC43LTMzLjRjLTEuOC00LjQtNC4yLTcuNS03LjItOS4xYy0xLjYtMC45LTMuMi0xLjMtNC45LTEuM2MtMS41LDAtMywwLjMtNC41LDEKCQkJCWMtMy40LDEuNS01LjUsMy45LTYuNCw3LjJjLTAuMywxLjEtMC41LDIuMy0wLjUsMy42YzAsMi41LDAuNiw1LjIsMS44LDguMWMxLjksNC41LDQuMyw3LjYsNy4yLDkuM2MxLjYsMC45LDMuMiwxLjQsNC45LDEuNAoJCQkJYzEuNSwwLDMtMC4zLDQuNi0xYzMuMy0xLjUsNS40LTMuOSw2LjMtNy4zYzAuMy0xLjEsMC40LTIuMywwLjQtMy41Qy0zODguOC0yNy42LTM4OS40LTMwLjQtMzkwLjctMzMuNHogTS0zODUuNC0xMS4yCgkJCQljLTEuOSwyLjEtNC4yLDMuNy02LjksNC45Yy0yLjcsMS4yLTUuNCwxLjgtOC4xLDEuOGwtMC4xLDBjLTIuOCwwLTUuNS0wLjctOC4yLTEuOXYwYy0yLjgtMS4zLTUuMy0zLTcuNC01LjMKCQkJCWMtMi4xLTIuMy0zLjgtNS01LjEtOC4yYy0xLjMtMy4yLTItNi4zLTIuMS05LjVjMC0wLjQsMC0wLjcsMC0xLjFjMC0yLjgsMC41LTUuNSwxLjQtOC4yYzEtMi44LDIuNC01LjMsNC4zLTcuMwoJCQkJYzEuOS0yLjEsNC4zLTMuNyw3LTQuOXYwYzIuNy0xLjIsNS4zLTEuOCw4LjEtMS43aDAuMWMyLjgsMCw1LjUsMC42LDguMiwxLjhsMCwwbDAsMGMyLjgsMS4zLDUuMywzLjEsNy40LDUuNAoJCQkJYzIuMSwyLjMsMy44LDUsNS4xLDguMmMxLjMsMy4yLDIsNi4zLDIuMSw5LjVjMCwwLjMsMCwwLjYsMCwwLjljMCwyLjgtMC41LDUuNi0xLjUsOC4zQy0zODItMTUuNy0zODMuNS0xMy4zLTM4NS40LTExLjJ6CgkJCQkgTS00NTIuMi00Ny43Yy0wLjQsMC41LTEsMC45LTEuNywxLjJjLTAuNywwLjMtMS42LDAuNC0yLjYsMC40Yy0wLjksMC0yLTAuMS0zLjMtMC4zbC0xNC0yLjVjMC4xLDEuMSwwLjcsMi42LDEuNiw0LjQKCQkJCWMxLjEsMiwyLjYsNC40LDQuNyw3LjJsMCwwYzAuNywxLDEuMiwxLjcsMS42LDIuMmMwLjMsMC4zLDAuNiwwLjgsMS4xLDEuNWMzLjIsNC40LDUuMiw3LjksNiwxMC43YzAuNCwxLjYsMC43LDMuMiwwLjgsNC44CgkJCQljMCwwLjQsMCwwLjksMCwxLjNjMCwxLjEtMC4xLDIuMy0wLjMsMy40Yy0wLjIsMS0wLjQsMS45LTAuNywyLjVjLTAuMywwLjctMC43LDEuMi0xLjIsMS41Yy0wLjYsMC40LTEuNCwwLjUtMi40LDAuNQoJCQkJYy0wLjksMC0xLjktMC4xLTMuMS0wLjNsLTE2LjItMi45Yy0yLTAuMy0zLjQtMC45LTQuMy0xLjhjLTAuNy0wLjctMS4xLTEuNi0xLjEtMi43YzAtMC4zLDAtMC42LDAuMS0wLjljMC4yLTEuNCwwLjktMi41LDIuMS0zCgkJCQljMC43LTAuMywxLjUtMC41LDIuNS0wLjVjMC43LDAsMS40LDAuMSwyLjIsMC4ybDEzLjYsMi40YzAtMC4yLDAtMC41LDAtMC43YzAtMC45LTAuMS0xLjctMC40LTIuNmMtMC40LTEuMi0xLjQtMi44LTMtNC45CgkJCQljLTAuNS0wLjYtMS4yLTEuNS0yLjEtMi43Yy0zLjctNC42LTYuMy04LjUtNy45LTExLjhjMCwwLDAsMCwwLDBjMCwwLDAsMCwwLDBjLTEuMS0yLjItMS45LTQuNS0yLjMtNi42CgkJCQljLTAuMy0xLjMtMC40LTIuNS0wLjQtMy43YzAtMC44LDAuMS0xLjYsMC4yLTIuNGMwLjItMS4xLDAuNS0yLjEsMC44LTIuOGMwLjQtMC43LDAuOC0xLjMsMS40LTEuNmMwLjUtMC4zLDEuMy0wLjQsMi40LTAuNAoJCQkJYzEuNCwwLDMuMiwwLjIsNS41LDAuNmwxNC43LDIuNmMyLjYsMC41LDQuNCwxLjEsNS41LDJjMC44LDAuNywxLjMsMS43LDEuMywyLjljMCwwLjMsMCwwLjYtMC4xLDAuOQoJCQkJQy00NTEuNS00OC45LTQ1MS44LTQ4LjItNDUyLjItNDcuN0wtNDUyLjItNDcuN3ogTS00NjQuNy0zMy42TC00NjQuNy0zMy42Qy00NjQuNy0zMy42LTQ2NC43LTMzLjYtNDY0LjctMzMuNkwtNDY0LjctMzMuNgoJCQkJTC00NjQuNy0zMy42eiBNLTI3My4zLTQ2Yy0yLjEtMi42LTUtNC04LjctNGMtMy43LDAtNi42LDEuMy04LjcsNGMtMi4xLDIuNi0zLjIsNi4zLTMuMiwxMC45YzAsNC43LDEuMSw4LjQsMy4yLDExLjEKCQkJCWMyLjEsMi43LDUsNCw4LjcsNGMzLjcsMCw2LjUtMS4zLDguNy00YzIuMS0yLjcsMy4yLTYuMywzLjItMTEuMUMtMjcwLjEtMzkuOC0yNzEuMi00My40LTI3My4zLTQ2eiBNLTI2Mi0yNS44CgkJCQljLTEuMSwyLjgtMi43LDUuNC00LjksNy42Yy0yLjEsMi4yLTQuNCwzLjgtNi45LDQuOWMtMi41LDEuMS01LjMsMS42LTguMywxLjZjLTMsMC01LjgtMC41LTguMy0xLjZjLTIuNi0xLjEtNC45LTIuNy02LjktNC45CgkJCQljLTIuMS0yLjItMy44LTQuOC00LjgtNy42Yy0xLjEtMi44LTEuNi02LTEuNi05LjNjMC0zLjMsMC41LTYuNCwxLjYtOS4zYzEuMS0yLjksMi43LTUuNCw0LjgtNy43YzItMi4xLDQuMy0zLjcsNi44LTQuOAoJCQkJYzIuNi0xLjEsNS40LTEuNiw4LjQtMS42YzIuOSwwLDUuNywwLjUsOC4yLDEuNmMyLjYsMS4xLDQuOSwyLjcsNi45LDQuOGMyLjEsMi4zLDMuOCw0LjgsNC45LDcuN2MxLjEsMi45LDEuNiw2LDEuNiw5LjMKCQkJCVMtMjYwLjktMjguNy0yNjItMjUuOCIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8L3N2Zz4K';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        uri?: string,
        data?: unknown,
    ): Promise<RequestDto> | RequestDto {
        const domain = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][TOKEN][API_DOMAIN];
        const url = `${domain}${API_PATH}${uri}`;

        const request = new RequestDto(url ?? '', method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `Zoho-oauthtoken ${this.getAccessToken(applicationInstall)}`,
        });

        if (data) {
            request.setJsonBody(data);
        }

        return request;
    }

    public getScopes(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        applicationInstall: ApplicationInstall,
    ): string[] {
        return ['ZohoCRM.modules.ALL', 'ZohoCRM.settings.ALL', 'ZohoCreator.form.ALL', 'ZohoCreator.report.ALL'];
    }

    public getFormStack(): FormStack {
        const form = new Form(CoreFormsEnum.AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true));

        const creatorForm = new Form(CREATOR_FORM, 'Creator settings')
            .addField(new Field(FieldType.TEXT, ACCOUNT_OWNER_NAME, 'Account owner name', undefined, true))
            .addField(new Field(FieldType.TEXT, APP_LINK_NAME, 'App link name', undefined, true))
            .addField(new Field(FieldType.TEXT, FORM_LINK_NAME, 'Form link name', undefined, true))
            .addField(new Field(FieldType.TEXT, REPORT_LINK_NAME, 'report_link_name', undefined, true));

        return new FormStack()
            .addForm(form)
            .addForm(creatorForm);
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        const authorizationForm = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];
        const creatorForm = applicationInstall.getSettings()[CREATOR_FORM];
        return authorizationForm?.[CLIENT_ID]
          && authorizationForm?.[CLIENT_SECRET]
          && creatorForm?.[ACCOUNT_OWNER_NAME]
          && creatorForm?.[APP_LINK_NAME]
          && creatorForm?.[FORM_LINK_NAME]
          && creatorForm?.[REPORT_LINK_NAME];
    }

    public getTokenUrl(): string {
        return 'https://accounts.zoho.eu/oauth/v2/token';
    }

    protected getScopesSeparator(): string {
        return ScopeSeparatorEnum.SPACE;
    }

}
