import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { IWebhookApplication } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import { OAuth2Provider } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Provider/OAuth2/OAuth2Provider';
import AOAuth2Application from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import { CLIENT_ID, CLIENT_SECRET } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import CurlSender from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/CurlSender';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { BodyInit } from 'node-fetch';

export const MAILCHIMP_URL = 'https://login.mailchimp.com/oauth2/authorize';
export const MAILCHIMP_DATACENTER_URL = 'https://login.mailchimp.com';
export const AUDIENCE_ID = 'audience_id';
export const TOKEN_URL = 'https://login.mailchimp.com/oauth2/token';
export const API_KEYPOINT = 'api_keypoint';
export const SEGMENT_ID = 'segment_id';

export default class MailchimpApplication extends AOAuth2Application implements IWebhookApplication {

    public constructor(private readonly sender: CurlSender, private readonly inputProvider: OAuth2Provider) {
        super(inputProvider);
    }

    public getDescription(): string {
        return 'Mail marketing automation service that lets you send out professional-looking newsletters';
    }

    public getName(): string {
        return 'mailchimp';
    }

    public getPublicName(): string {
        return 'Mailchimp';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxnPg0KCQkJPGc+DQoJCQkJPHBhdGggZD0iTTExMC42NDYsNzAuODgyYzEuMDk1LTAuMTMxLDIuMTQ0LTAuMTM2LDMuMTA4LDBjMC41NTgtMS4yOCwwLjY1NC0zLjQ4NSwwLjE1Mi01Ljg4Nw0KCQkJCQljLTAuNzQ2LTMuNTctMS43NTUtNS43My0zLjg0MS01LjM5NGMtMi4wODYsMC4zMzYtMi4xNjMsMi45MjItMS40MTcsNi40OTJDMTA5LjA2Niw2OC4xMDIsMTA5LjgxNCw2OS44MTksMTEwLjY0Niw3MC44ODJ6Ii8+DQoJCQkJPHBhdGggZD0iTTkyLjczOCw3My43MDdjMS40OTMsMC42NTUsMi40MSwxLjA4OSwyLjc2OSwwLjcxYzAuMjMxLTAuMjM3LDAuMTYyLTAuNjg4LTAuMTk1LTEuMjcNCgkJCQkJYy0wLjczNi0xLjIwMi0yLjI1Mi0yLjQyMi0zLjg1OS0zLjEwN2MtMy4yODgtMS40MTUtNy4yMDgtMC45NDUtMTAuMjMzLDEuMjI5Yy0wLjk5OSwwLjczMS0xLjk0NSwxLjc0NS0xLjgxLDIuMzYNCgkJCQkJYzAuMDQ0LDAuMTk5LDAuMTkzLDAuMzQ5LDAuNTQ0LDAuMzk4YzAuODIzLDAuMDk0LDMuNy0xLjM2LDcuMDE0LTEuNTYzQzg5LjMwNyw3Mi4zMjEsOTEuMjQ1LDczLjA1Miw5Mi43MzgsNzMuNzA3eiIvPg0KCQkJCTxwYXRoIGQ9Ik04OS43MzUsNzUuNDJjLTEuOTQ0LDAuMzA3LTMuMDE2LDAuOTQ4LTMuNzA0LDEuNTQ0Yy0wLjU4OCwwLjUxNC0wLjk1MSwxLjA4MS0wLjk0OCwxLjQ4DQoJCQkJCWMwLjAwMiwwLjE5LDAuMDg0LDAuMjk5LDAuMTQ5LDAuMzU0YzAuMDg5LDAuMDc4LDAuMTk0LDAuMTIyLDAuMzIsMC4xMjJjMC40MzksMCwxLjQyMy0wLjM5NCwxLjQyMy0wLjM5NA0KCQkJCQljMi43MDUtMC45NjgsNC40OS0wLjg1MSw2LjI1OC0wLjY1YzAuOTc3LDAuMTEsMS40MzksMC4xNzEsMS42NTMtMC4xNjVjMC4wNjMtMC4wOTYsMC4xNC0wLjMwNC0wLjA1NS0wLjYyMQ0KCQkJCQlDOTQuMzc1LDc2LjM1MSw5Mi40MTIsNzUuMTAyLDg5LjczNSw3NS40MnoiLz4NCgkJCQk8cGF0aCBkPSJNMTA0LjU5OSw4MS43MDljMS4zMiwwLjY0OSwyLjc3MywwLjM5NCwzLjI0Ni0wLjU2OWMwLjQ3My0wLjk2My0wLjIxNC0yLjI2OS0xLjUzNC0yLjkxNw0KCQkJCQljLTEuMzItMC42NDgtMi43NzMtMC4zOTQtMy4yNDYsMC41NjlDMTAyLjU5Miw3OS43NTQsMTAzLjI3OSw4MS4wNiwxMDQuNTk5LDgxLjcwOXoiLz4NCgkJCQk8cGF0aCBkPSJNMTEzLjA4NCw3NC4yOTRjLTEuMDcyLTAuMDE4LTEuOTYyLDEuMTU5LTEuOTg3LDIuNjNjLTAuMDI1LDEuNDcsMC44MjQsMi42NzcsMS44OTYsMi42OTUNCgkJCQkJYzEuMDcyLDAuMDE4LDEuOTYyLTEuMTU5LDEuOTg3LTIuNjI5QzExNS4wMDYsNzUuNTE5LDExNC4xNTcsNzQuMzEyLDExMy4wODQsNzQuMjk0eiIvPg0KCQkJCTxwYXRoIGQ9Ik00MS4wNjIsMTAwLjgwOGMtMC4yNjctMC4zMzQtMC43MDUtMC4yMzItMS4xMjktMC4xMzRjLTAuMjk2LDAuMDY5LTAuNjMyLDAuMTQ3LTEsMC4xNDENCgkJCQkJYy0wLjc4OS0wLjAxNS0xLjQ1Ny0wLjM1Mi0xLjgzMi0wLjkyOGMtMC40ODgtMC43NS0wLjQ2LTEuODY4LDAuMDc5LTMuMTQ5YzAuMDczLTAuMTcyLDAuMTU4LTAuMzY0LDAuMjUxLTAuNTczDQoJCQkJCWMwLjg2LTEuOTI5LDIuMjk5LTUuMTU5LDAuNjgzLTguMjM2Yy0xLjIxNi0yLjMxNi0zLjItMy43NTgtNS41ODUtNC4wNjFjLTIuMjktMC4yOS00LjY0NywwLjU1OS02LjE1LDIuMjE4DQoJCQkJCWMtMi4zNzIsMi42MTctMi43NDMsNi4xNzgtMi4yODQsNy40MzZjMC4xNjgsMC40NjEsMC40MzEsMC41ODgsMC42MjIsMC42MTRjMC40MDQsMC4wNTUsMS0wLjIzOSwxLjM3NC0xLjI0NQ0KCQkJCQljMC4wMjctMC4wNzMsMC4wNjMtMC4xODUsMC4xMDctMC4zMjdjMC4xNjctMC41MzIsMC40NzctMS41MjIsMC45ODUtMi4zMTVjMC42MTMtMC45NTcsMS41NjctMS42MTYsMi42ODctMS44NTYNCgkJCQkJYzEuMTQxLTAuMjQ0LDIuMzA3LTAuMDI3LDMuMjgzLDAuNjEyYzEuNjYyLDEuMDg4LDIuMzAxLDMuMTI0LDEuNTkyLDUuMDY3Yy0wLjM2NywxLjAwNS0wLjk2MiwyLjkyNi0wLjgzMSw0LjUwNA0KCQkJCQljMC4yNjYsMy4xOTUsMi4yMzEsNC40NzgsMy45OTYsNC42MTVjMS43MTcsMC4wNjUsMi45MTctMC44OTksMy4yMi0xLjYwM0M0MS4zMTEsMTAxLjE3LDQxLjE2LDEwMC45MTYsNDEuMDYyLDEwMC44MDh6Ii8+DQoJCQkJPHBhdGggZD0iTTE0MC4xNCw5NC45NjVjLTAuMDY1LTAuMjMxLTAuNDkxLTEuNzg3LTEuMDc2LTMuNjYyYy0wLjU4NS0xLjg3NS0xLjE5LTMuMTk1LTEuMTktMy4xOTUNCgkJCQkJYzIuMzQ2LTMuNTEyLDIuMzg4LTYuNjU0LDIuMDc2LTguNDMyYy0wLjMzMy0yLjIwNS0xLjI1MS00LjA4NS0zLjEwMi02LjAyN2MtMS44NS0xLjk0My01LjYzNS0zLjkzMi0xMC45NTMtNS40MjUNCgkJCQkJYy0wLjYwOC0wLjE3MS0yLjYxNC0wLjcyMS0yLjc5MS0wLjc3NWMtMC4wMTQtMC4xMTUtMC4xNDctNi41NzktMC4yNjgtOS4zNTRjLTAuMDg4LTIuMDA2LTAuMjYtNS4xMzctMS4yMzItOC4yMjINCgkJCQkJYy0xLjE1OC00LjE3NS0zLjE3NS03LjgyOC01LjY5NC0xMC4xNjVjNi45NS03LjIwNCwxMS4yODgtMTUuMTQsMTEuMjc4LTIxLjk0OGMtMC4wMi0xMy4wOTItMTYuMDk5LTE3LjA1NC0zNS45MTMtOC44NDkNCgkJCQkJYy0wLjAyMSwwLjAwOS00LjE2OCwxLjc2Ny00LjE5OCwxLjc4MmMtMC4wMTktMC4wMTgtNy41OS03LjQ0Ny03LjcwNC03LjU0NkM1Ni43ODItMTYuNTU4LTEzLjg1Miw2MS45NTQsOC43MzEsODEuMDIyDQoJCQkJCWw0LjkzNSw0LjE4MWMtMS4yOCwzLjMxNi0xLjc4Myw3LjExNi0xLjM3MiwxMS4yMDJjMC41MjgsNS4yNDgsMy4yMzUsMTAuMjc5LDcuNjIyLDE0LjE2NmM0LjE2NSwzLjY5LDkuNjQxLDYuMDI2LDE0Ljk1NSw2LjAyMQ0KCQkJCQljOC43ODgsMjAuMjUyLDI4Ljg2NywzMi42NzUsNTIuNDExLDMzLjM3NWMyNS4yNTUsMC43NSw0Ni40NTUtMTEuMSw1NS4zMzgtMzIuMzg3YzAuNTgxLTEuNDk0LDMuMDQ3LTguMjI2LDMuMDQ3LTE0LjE2OA0KCQkJCQlDMTQ1LjY2Niw5Ny40MzksMTQyLjI5LDk0Ljk2NSwxNDAuMTQsOTQuOTY1eiBNMzYuODEzLDExMC45MDRjLTAuNzY3LDAuMTMxLTEuNTUsMC4xODMtMi4zMzksMC4xNjQNCgkJCQkJYy03LjYyOC0wLjIwNS0xNS44NjctNy4wNzItMTYuNjg2LTE1LjIxNWMtMC45MDUtOS4wMDEsMy42OTQtMTUuOTI5LDExLjgzOC0xNy41NzJjMC45NzMtMC4xOTYsMi4xNS0wLjMwOSwzLjQxOS0wLjI0NA0KCQkJCQljNC41NjMsMC4yNSwxMS4yODYsMy43NTQsMTIuODIyLDEzLjY5M0M0Ny4yMjcsMTAwLjUzMyw0NS4wNjYsMTA5LjQ5NiwzNi44MTMsMTEwLjkwNHogTTI4LjI5NCw3Mi44OTYNCgkJCQkJYy01LjA3LDAuOTg2LTkuNTM4LDMuODU5LTEyLjI3LDcuODI4Yy0xLjYzMy0xLjM2Mi00LjY3Ni0zLjk5OS01LjIxMy01LjAyNmMtNC4zNjItOC4yODMsNC43NjEtMjQuMzg3LDExLjEzMy0zMy40ODENCgkJCQkJQzM3LjY5NCwxOS43NDEsNjIuMzYyLDIuNzI5LDczLjc4MSw1LjgxNmMxLjg1NiwwLjUyNSw4LjAwNCw3LjY1NCw4LjAwNCw3LjY1NHMtMTEuNDE0LDYuMzMzLTIyLDE1LjE2MQ0KCQkJCQlDNDUuNTIzLDM5LjYxMywzNC43NDksNTUuNTc1LDI4LjI5NCw3Mi44OTZ6IE0xMDguMzU5LDEwNy41MzhjMC4xNjYtMC4wNywwLjI4LTAuMjYsMC4yNjEtMC40NDgNCgkJCQkJYy0wLjAyMy0wLjIzMS0wLjIzLTAuMzk5LTAuNDYxLTAuMzc2YzAsMC0xMS45NDksMS43NjktMjMuMjM3LTIuMzY0YzEuMjI5LTMuOTk2LDQuNDk5LTIuNTUzLDkuNDQtMi4xNTQNCgkJCQkJYzguOTA3LDAuNTMxLDE2Ljg5LTAuNzcsMjIuNzg5LTIuNDY0YzUuMTEyLTEuNDY3LDExLjgyNy00LjM2LDE3LjA0Mi04LjQ3NmMxLjc1OSwzLjg2NCwyLjM4LDguMTE2LDIuMzgsOC4xMTYNCgkJCQkJczEuMzYyLTAuMjQ0LDIuNSwwLjQ1N2MxLjA3NSwwLjY2MiwxLjg2NCwyLjAzNywxLjMyNSw1LjU5NGMtMS4wOTcsNi42NDQtMy45MjEsMTIuMDM3LTguNjY4LDE2Ljk5OA0KCQkJCQljLTIuODg5LDMuMTEtNi4zOTcsNS44MTQtMTAuNDEsNy43OGMtMi4xMzEsMS4xMi00LjQwMSwyLjA4OC02Ljc5OCwyLjg3MWMtMTcuODkzLDUuODQ0LTM2LjIwOS0wLjU4MS00Mi4xMTMtMTQuMzc4DQoJCQkJCWMtMC40NzEtMS4wMzctMC44Ny0yLjEyMy0xLjE4NC0zLjI1OWMtMi41MTYtOS4wOTItMC4zOC0yMC4wMDEsNi4yOTctMjYuODY3YzAuMDAxLTAuMDAxLTAuMDAxLTAuMDAzLDAtMC4wMDMNCgkJCQkJYzAuNDEyLTAuNDM3LDAuODMyLTAuOTUyLDAuODMyLTEuNmMwLTAuNTQyLTAuMzQ0LTEuMTE0LTAuNjQzLTEuNTE5Yy0yLjMzNi0zLjM4OC0xMC40MjgtOS4xNjItOC44MDMtMjAuMzM2DQoJCQkJCWMxLjE2Ni04LjAyNyw4LjE4Ni0xMy42OCwxNC43MzItMTMuMzQ1YzAuNTUzLDAuMDI4LDEuMTA3LDAuMDYzLDEuNjU5LDAuMDk1YzIuODM2LDAuMTY4LDUuMzExLDAuNTMyLDcuNjQ2LDAuNjI5DQoJCQkJCWMzLjkwOCwwLjE2OSw3LjQyMi0wLjM5OSwxMS41ODQtMy44NjdjMS40MDQtMS4xNywyLjUzLTIuMTg0LDQuNDM1LTIuNTA3YzAuMi0wLjAzNCwwLjY5OC0wLjIxMywxLjY5My0wLjE2Ng0KCQkJCQljMS4wMTYsMC4wNTQsMS45ODMsMC4zMzMsMi44NTMsMC45MTJjMy4zMzcsMi4yMiwzLjgxLDcuNTk4LDMuOTgzLDExLjUzMmMwLjA5OCwyLjI0NiwwLjM3LDcuNjc5LDAuNDYzLDkuMjM4DQoJCQkJCWMwLjIxMiwzLjU2NiwxLjE1LDQuMDY5LDMuMDQ2LDQuNjk0YzEuMDY3LDAuMzUxLDIuMDU3LDAuNjEzLDMuNTE2LDEuMDIzYzQuNDE3LDEuMjQsNy4wMzYsMi40OTgsOC42ODcsNC4xMTQNCgkJCQkJYzAuOTg0LDEuMDEsMS40NDIsMi4wODMsMS41ODQsMy4xMDdjMC41MjEsMy44LTIuOTUsOC40OTMtMTIuMTM4LDEyLjc1OGMtMTAuMDQzLDQuNjYyLTIyLjIyOCw1Ljg0Mi0zMC42NDYsNC45MDQNCgkJCQkJYy0wLjY0Ni0wLjA3Mi0yLjk0MS0wLjMzMi0yLjk0OS0wLjMzM2MtNi43MzQtMC45MDctMTAuNTc1LDcuNzk2LTYuNTM0LDEzLjc1OGMyLjYwNSwzLjg0Myw5LjY5OSw2LjM0MywxNi43OTgsNi4zNDUNCgkJCQkJYzE2LjI3NSwwLjAwMywyOC43ODUtNi45NDgsMzMuNDM4LTEyLjk1YzAuMTM5LTAuMTgsMC4xNTMtMC4xOTksMC4zNzItMC41M2MwLjIyOS0wLjM0NSwwLjA0LTAuNTM1LTAuMjQ1LTAuMzQNCgkJCQkJYy0zLjgwMiwyLjYwMS0yMC42ODksMTIuOTI5LTM4Ljc1MSw5LjgyMmMwLDAtMi4xOTUtMC4zNjEtNC4xOTgtMS4xNDFjLTEuNTkyLTAuNjE5LTQuOTI0LTIuMTUyLTUuMzI5LTUuNTcxDQoJCQkJCUM5OS4xODEsMTExLjc5OSwxMDguMzU5LDEwNy41MzgsMTA4LjM1OSwxMDcuNTM4eiBNODUuMjY4LDEwNC44MTJjMC4wMDEsMC4wMDEsMC4wMDEsMC4wMDIsMC4wMDIsMC4wMDMNCgkJCQkJYzAuMDAxLDAuMDAyLDAuMDAyLDAuMDA1LDAuMDAzLDAuMDA3Qzg1LjI3MiwxMDQuODE5LDg1LjI3LDEwNC44MTYsODUuMjY4LDEwNC44MTJ6IE01Ny4zODIsNDIuMTI1DQoJCQkJCWM1LjU5OS02LjQ3LDEyLjQ5Mi0xMi4wOTYsMTguNjY2LTE1LjI1NGMwLjIxMy0wLjEwOSwwLjQ0LDAuMTIzLDAuMzI0LDAuMzMyYy0wLjQ5LDAuODg4LTEuNDM0LDIuNzg5LTEuNzMzLDQuMjMxDQoJCQkJCWMtMC4wNDcsMC4yMjUsMC4xOTgsMC4zOTQsMC4zODgsMC4yNjVjMy44NDEtMi42MTgsMTAuNTI0LTUuNDI0LDE2LjM4NS01Ljc4NWMwLjI1Mi0wLjAxNiwwLjM3MywwLjMwNywwLjE3MywwLjQ2MQ0KCQkJCQljLTAuODkxLDAuNjg0LTEuODY2LDEuNjMtMi41NzgsMi41ODdjLTAuMTIxLDAuMTYzLTAuMDA3LDAuMzk3LDAuMTk2LDAuMzk5YzQuMTE2LDAuMDI5LDkuOTE4LDEuNDcsMTMuNjk5LDMuNTkNCgkJCQkJYzAuMjU2LDAuMTQ0LDAuMDc0LDAuNjM5LTAuMjEyLDAuNTc0Yy01LjcyMi0xLjMxMi0xNS4wODctMi4zMDYtMjQuODE2LDAuMDY3Yy04LjY4NSwyLjExOC0xNS4zMTQsNS4zODktMjAuMTUxLDguOTA3DQoJCQkJCUM1Ny40NzgsNDIuNjc2LDU3LjE4NSw0Mi4zNTMsNTcuMzgyLDQyLjEyNXoiLz4NCgkJCTwvZz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K';
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: BodyInit,
    ): RequestDto {
        const request = new RequestDto(url ?? '', method, dto);
        request.setHeaders({
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
            [CommonHeaders.AUTHORIZATION]: `OAuth ${this.getAccessToken(applicationInstall)}`,
        });

        if (data) {
            request.setBody(data);
        }

        return request;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public getScopes(applicationInstall: ApplicationInstall): string[] {
        return [];
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
            .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true))
            .addField(new Field(FieldType.TEXT, AUDIENCE_ID, 'Audience Id', undefined, true));

        return new FormStack().addForm(form);
    }

    public getAuthUrl(): string {
        return MAILCHIMP_URL;
    }

    public getTokenUrl(): string {
        return TOKEN_URL;
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [
            new WebhookSubscription('Create User', 'starting-point', '', { name: 'subscribe' }),
            new WebhookSubscription('Update User', 'starting-point', '', { name: 'upemail' }),
            new WebhookSubscription('Delete User', 'starting-point', '', { name: 'unsubscribe' }),
        ];
    }

    public getWebhookSubscribeRequestDto(
        applicationInstall: ApplicationInstall,
        subscription: WebhookSubscription,
        url: string,
    ): RequestDto {
        return this.getRequestDto(
            new ProcessDto(),
            applicationInstall,
            HttpMethods.POST,
            `${applicationInstall.getSettings()[API_KEYPOINT]}
    /3.0/lists/${applicationInstall.getSettings()[AUTHORIZATION_FORM][AUDIENCE_ID]}/webhooks`,
            JSON.stringify(
                {
                    url,
                    events: {
                        [subscription.getParameters().name]: true,
                    },
                    sources:
                        {
                            user: true,
                            admin: true,
                            api: true,
                        },
                },
            ),
        );
    }

    public getWebhookUnsubscribeRequestDto(
        applicationInstall: ApplicationInstall,
        id: string,
    ): RequestDto {
        return this.getRequestDto(
            new ProcessDto(),
            applicationInstall,
            HttpMethods.DELETE,
            // eslint-disable-next-line max-len
            `${applicationInstall.getSettings()[API_KEYPOINT]}/3.0/lists/${applicationInstall.getSettings()[AUTHORIZATION_FORM][AUDIENCE_ID]}/webhooks/${id}`,
        );
    }

    public processWebhookSubscribeResponse(
        dto: ResponseDto,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        applicationInstall: ApplicationInstall,
    ): string {
        return JSON.parse(dto.getBody()).id;
    }

    public processWebhookUnsubscribeResponse(dto: ResponseDto): boolean {
        return dto.getResponseCode() === 204;
    }

    public async getApiEndpoint(applicationInstall: ApplicationInstall): Promise<string> {
        const output = await this.sender.send(
            this.getRequestDto(
                new ProcessDto(),
                applicationInstall,
                HttpMethods.GET,
                '%s/oauth2/metadata',
                MAILCHIMP_DATACENTER_URL,
            ),
        );

        // eslint-disable-next-line @typescript-eslint/naming-convention
        return output.getJsonBody() as { api_endpoint: string }['api_endpoint'] ?? '';
    }

}
