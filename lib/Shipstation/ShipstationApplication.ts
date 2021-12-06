import { IWebhookApplication } from 'pipes-nodejs-sdk/dist/lib/Application/Base/IWebhookApplication';
import {
  ABasicApplication,
  PASSWORD,
  USER,
} from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import WebhookSubscription from 'pipes-nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import ResponseDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { encode } from 'pipes-nodejs-sdk/dist/lib/Utils/Base64';
import { AUTHORIZATION_SETTINGS } from 'pipes-nodejs-sdk/dist/lib/Application/Base/AApplication';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import { BodyInit } from 'node-fetch';

export const SHIPSTATION_URL = 'https://ssapi.shipstation.com';
export const ORDER_NOTIFY = 'ORDER_NOTIFY';

export default class ShipstationApplication extends ABasicApplication implements IWebhookApplication {
  public getDescription = (): string => 'Shipstation v1';

  public getName = (): string => 'shipstation';

  public getPublicName = (): string => 'Shipstation';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZmlsbD0iIzZEQkU0NiIgZD0iTTUwLjc5NywxNC4yODFjMi4wODgsMS41MzEsNC4xMDgsMi45NzQsNi4wNjIsNC41YzAuNjMxLDAuNDkzLDEuMDU4LDAuNDIzLDEuNzQzLDAuMTA5DQoJCWMyLjUyMS0xLjE1OCw1LjA0MS0yLjM2NCw3LjY2OC0zLjIyOGMxLjI0Mi0wLjQwOSwxLjY2OS0wLjk5MiwxLjgyOC0yLjEyOGMwLjUxMi0zLjY1NywxLjA1OC03LjMwOSwxLjYwMi0xMC45NjENCgkJYzAuMDc0LTAuNDk3LDAuMjE1LTAuOTg0LDAuMzQxLTEuNTQ3YzUuMzc3LDAsMTAuNzMxLDAsMTYuMjU0LDBjMC41MjYsMy40MjcsMS4yMTksNi44NDUsMS41MjYsMTAuMjk4DQoJCWMwLjIzMiwyLjYwNiwwLjg2LDQuMzM4LDMuODIsNC45MTVjMi4wMjcsMC4zOTUsMy45MTUsMS41OTEsNS44MSwyLjU0YzAuODI2LDAuNDE0LDEuMzY5LDAuNDU1LDIuMTU2LTAuMTQ1DQoJCWMzLjQyMi0yLjYwNyw2LjkxMi01LjEyNCwxMC4yNzMtNy41OTdjMy44MzQsMy44NjQsNy42NCw3LjY5OSwxMS41NzMsMTEuNjYyYy0yLjI0NiwzLjA1Mi00LjY0NCw2LjQyMi03LjE3Niw5LjY4OQ0KCQljLTAuODYxLDEuMTExLTAuOTI4LDEuOTA4LTAuMjc5LDMuMTljMS4xODEsMi4zMzYsMi4xMjYsNC44MDUsMi45ODgsNy4yODJjMC4zMiwwLjkxOCwwLjcxOCwxLjI4MSwxLjYyNSwxLjQxDQoJCWMzLjcwNSwwLjUyNyw3LjQwMiwxLjEwOSwxMS4xMDEsMS42NzdjMC41OTQsMC4wOTEsMS4xODMsMC4yMTQsMS44OTgsMC4zNDZjMCwyLjk1MSwwLDUuODMzLDAsOC43MTQNCgkJYzAsMi4xMjktMC4wMzEsNC4yNTksMC4wMTUsNi4zODdjMC4wMTksMC44NzQtMC4yNDQsMS4yMS0xLjE2NCwxLjMzNGMtMy45MDgsMC41My03Ljc5OSwxLjE5My0xMS43MDYsMS43MzENCgkJYy0wLjk4NSwwLjEzNi0xLjQyLDAuNDkzLTEuNzY4LDEuNDc1Yy0xLjA2MiwyLjk5My0yLjMxOCw1LjkxNy0zLjYxNyw5LjE2NWMyLjU4MiwzLjUwNyw1LjM5Nyw3LjMzLDguMTA2LDExLjAwOQ0KCQljLTMuODQ1LDMuODQyLTcuNjY3LDcuNjU5LTExLjYyNSwxMS42MTRjLTMuNTIyLTIuNTk1LTcuMzM3LTUuNDA2LTEwLjk2MS04LjA3NmMtMy4zNTcsMS4yOTMtNi42MDksMi40ODgtOS43OTcsMy44MzcNCgkJYy0wLjQ1OSwwLjE5NC0wLjc2OSwxLjEwMS0wLjg3LDEuNzI0Yy0wLjY3Miw0LjEzOS0xLjI2OCw4LjI5MS0xLjkwMiwxMi41MjRjLTUuNDIzLDAtMTAuNzczLDAtMTYuMzM4LDANCgkJYy0wLjQwNC0yLjU3Ni0wLjgxNy01LjIwNC0xLjIyNy03LjgzMmMtMC4wMzEtMC4yLTAuMDI4LTAuNDA1LTAuMDYtMC42MDVjLTAuMjkyLTEuNzk3LTAuMDY0LTMuOTkzLTEuMDM3LTUuMjczDQoJCWMtMC45MDItMS4xODctMy4xMDItMS4zNjktNC43MS0yLjA0M2MtMS4yNTctMC41MjctMi41ODEtMC45ODMtMy42OTQtMS43MzhjLTEuMjQ1LTAuODQ1LTIuMDUxLTAuNTQ2LTMuMTM0LDAuMjkzDQoJCWMtMy4yMzgsMi41MDktNi41NzYsNC44ODktOS44MSw3LjI3MmMtMy44MjgtMy44Ny03LjYyNi03LjcwOS0xMS41MzgtMTEuNjY0YzIuNDIxLTMuMjg1LDQuOTY5LTYuODA0LDcuNTk4LTEwLjI2MQ0KCQljMC41ODQtMC43NjgsMC41NjEtMS4yOTQsMC4xNzItMi4xNDJjLTEuMTc4LTIuNTY3LTIuMjgyLTUuMTc1LTMuMjU2LTcuODI2Yy0wLjM1NS0wLjk2NS0wLjgwMi0xLjMyNC0xLjc4OC0xLjQ1OA0KCQljLTQuMjA2LTAuNTcyLTguNDAxLTEuMjMzLTEyLjcwNy0xLjg3OGMwLTUuMzk4LDAtMTAuNzQ4LDAtMTYuMzNjMS44NDgtMC4yOTQsMy43NzEtMC42MDQsNS42OTYtMC45MDQNCgkJYzIuNDk4LTAuMzksNS4wMDUtMC43MzIsNy40ODktMS4xOThjMC40NDktMC4wODQsMC45ODEtMC41ODksMS4xNzUtMS4wMzFjMS4xOTMtMi43MjcsMi4yNDYtNS41MTcsMy40NjgtOC4yMw0KCQljMC4zNDktMC43NzQsMC4zMDItMS4yMjEtMC4xODktMS44NzRjLTIuNjE1LTMuNDc2LTUuMTc1LTYuOTk0LTcuNjY3LTEwLjM4YzMuODc3LTMuODc1LDcuNjk4LTcuNjk0LDExLjYwOC0xMS42MDINCgkJQzQ3LjcwMywxMi4wMTEsNDkuMjAzLDEzLjExOCw1MC43OTcsMTQuMjgxeiBNNzUuMzQzLDM2LjgwM2MtOS4xODQsMS40Ni0xNi4yNjUsOS45OTgtMTQuODAzLDIwLjM1MQ0KCQljMS40MTQsMTAuMDE3LDExLjM5OSwxNi43OCwyMS41MjMsMTQuNjExYzkuNzM1LTIuMDg2LDE1LjgzNC0xMi4zMzEsMTMuMjU3LTIyLjAwOUM5My40MDcsNDIuNTY4LDg1Ljk1NywzNS4zOTYsNzUuMzQzLDM2LjgwM3oiLz4NCgk8cGF0aCBmaWxsPSIjNkZCRDRBIiBkPSJNMTIwLjIxOSwxNDMuMDA3Yy0xLjM3OC0xLjEzMy0yLjE3OSwwLjA0My0zLjI1LDAuNzAyYy0wLjQ4OS0wLjY3OC0wLjk4NC0xLjM2NS0xLjUwMi0yLjA4Mw0KCQljMC4xNS0wLjU0MSwwLjc4My0xLjU2NSwwLjUzNC0yLjI4NGMtMC4yNDQtMC43MDMtMS4zODYtMS4wOTQtMi4xMzQtMS42MjJjLTAuMDk4LDAuMDkzLTAuMTk2LDAuMTg2LTAuMjkzLDAuMjc5DQoJCWMwLTAuODM3LDAtMS42NzUsMC0yLjYxYzAuNjg1LTAuMTQsMS4zNjgtMC4yNzksMi4wNi0wLjQyYzAuNzQ0LTEuNDI2LDAuNzQ0LTEuNDI2LTAuNTIxLTMuNTJjMC41OTMtMC41NTgsMS4yMTItMS4xNCwxLjgyNS0xLjcxNg0KCQljMi43OCwxLjY2MiwyLjkxMiwxLjYxLDQuMDAzLTEuNTk2YzAuNzc2LDAsMS41NzEsMCwyLjM0OSwwYzEuMTMxLDMuMjIxLDEuMjY5LDMuMjc2LDQuMDM5LDEuNTY2DQoJCWMwLjU5MywwLjU3OSwxLjIsMS4xNzMsMS43ODQsMS43NDNjLTEuNjY4LDIuODU5LTEuNjMsMi45NTIsMS41ODcsNC4wNDJjMCwwLjc3NSwwLDEuNTcxLDAsMi4zNTUNCgkJYy0zLjI0NCwxLjE2Ny0zLjMwNSwxLjMxMi0xLjY2MywzLjkzYy0wLjU4OCwwLjU5NC0xLjE3NywxLjE4Ny0xLjg0NCwxLjg1OGMtMC41NjEtMC4zODItMS4xNzUtMC44LTEuNjctMS4xMzgNCgkJYy0yLjA2NS0wLjA1Mi0xLjY1OCwxLjcxNy0yLjE5MywyLjgwOWMtMC43ODgsMC0xLjUzNiwwLTIuNDU5LDBDMTIwLjY5NiwxNDQuNTc4LDEyMC41MTIsMTQzLjgxNiwxMjAuMjE5LDE0My4wMDd6DQoJCSBNMTIwLjc2NCwxMzQuMjMyYy0xLjUzLDEuMjM4LTEuODc2LDIuNTU5LTEuMDI4LDMuOTI2YzAuNzg3LDEuMjY4LDIuNDMxLDEuNzIyLDMuNzA2LDEuMDI1YzEuMjM0LTAuNjc1LDEuNzk5LTIuMjI2LDEuMjc5LTMuNTEzDQoJCUMxMjQuMTIsMTM0LjE4MSwxMjIuNzMzLDEzMy42MTMsMTIwLjc2NCwxMzQuMjMyeiIvPg0KCTxwYXRoIGZpbGw9IiMyMTJDMzEiIGQ9Ik00OC42MzYsMTMxLjI4MWMwLjE0NiwwLjIyMywwLjM0OSwwLjQ0MSwwLjQ0OSwwLjQwMWMxLjI4Mi0wLjUwOSwyLjUxLTEuMzUxLDMuODI4LTEuNTIzDQoJCWMyLjA0LTAuMjY3LDMuNDU4LDAuOTM3LDQuMDE2LDIuOTM3YzEuMjM0LDQuNDI0LTIuMDgsMTEuNDk3LTguNTU1LDEwLjgzOWMtMC41NDMtMC4wNTUtMS4wNzYtMC4xOTgtMS43MjEtMC4zMg0KCQljLTAuMzc1LDEuNzYtMC43NSwzLjUyNC0xLjE0MSw1LjM2Yy0xLjM1NywwLTIuNzA1LDAtNC4xMzcsMGMxLjI3My02LjIzMywyLjUzNC0xMi40MDYsMy44MTktMTguN2MwLjkzMywwLDEuODkzLTAuMDU2LDIuODM3LDAuMDQNCgkJQzQ4LjI2MiwxMzAuMzM4LDQ4LjQ0MiwxMzAuODYyLDQ4LjYzNiwxMzEuMjgxeiBNNTIuNDc1LDEzNy40NTFjMC4xMjItMC43NDMsMC40MjItMS41MTMsMC4zMTUtMi4yMjINCgkJYy0wLjEtMC42NjUtMC40OTItMS41NzctMS4wMS0xLjgwOGMtMC41MjMtMC4yMzMtMS41MywwLjAzNy0yLjAxNywwLjQ0OWMtMC42NTIsMC41NTItMS4xMzksMS40MDItMS40NTgsMi4yMTgNCgkJYy0wLjM4MSwwLjk3My0wLjU2MywyLjAzNi0wLjcyNSwzLjA3N2MtMC4wODQsMC41MzctMC4xMTYsMS40NjQsMC4xNDEsMS41OTJjMC41NjMsMC4yODMsMS4zOTMsMC4zNzUsMS45OTMsMC4xNzcNCgkJQzUxLjIzNCwxNDAuNDM1LDUxLjg4MywxMzkuMDg1LDUyLjQ3NSwxMzcuNDUxeiIvPg0KCTxwYXRoIGZpbGw9IiMyMTJDMzEiIGQ9Ik0yMS4yMDcsMTMzLjcyM2MwLjY1My0zLjE0NCwxLjI3OS02LjE2MywxLjkwOC05LjE5OGMxLjQwOSwwLDIuNzEyLDAsNC4xNTYsMA0KCQljLTAuNDYxLDIuMjgtMC45MDUsNC40ODEtMS40LDYuOTNjMC41MjMtMC4yMDgsMC44MDYtMC4zNCwxLjEtMC40MzRjMC45OTctMC4zMTcsMS45ODUtMC44MTQsMy4wMDItMC44OTENCgkJYzIuMjQ3LTAuMTY5LDMuNzEzLDEuMTQxLDMuNDYsMy4zNzRjLTAuMzg2LDMuNDAyLTEuMTI0LDYuNzY1LTEuNzE3LDEwLjE3MmMtMS41MDYsMC0yLjgwMywwLTQuMjY3LDANCgkJYzAuNTE4LTIuNTcxLDEuMDQxLTUuMDc0LDEuNTE4LTcuNTg1YzAuMTkyLTEuMDExLDAuNzA3LTIuMjk4LTAuNjIxLTIuNzkyYy0xLjMxMy0wLjQ4OS0yLjM2MSwwLjUwNS0yLjc1MSwxLjU5Mw0KCQljLTAuNzgxLDIuMTc1LTEuMjcyLDQuNDU0LTEuODY2LDYuNjk1Yy0wLjE3OSwwLjY3Ni0wLjMsMS4zNjYtMC40NTcsMi4wOTFjLTEuMzg5LDAtMi42OTIsMC00LjE2MywwDQoJCUMxOS44MSwxNDAuMzU1LDIwLjQ5NSwxMzcuMTAyLDIxLjIwNywxMzMuNzIzeiBNMjUuOTkzLDEzMS43MTljMC4wMTEtMC4wOTEsMC4wMjEtMC4xODEsMC4wMzItMC4yNzINCgkJQzI1Ljk2NSwxMzEuNDg3LDI1LjkwNiwxMzEuNTI3LDI1Ljk5MywxMzEuNzE5eiIvPg0KCTxwYXRoIGZpbGw9IiMyMjJDMzEiIGQ9Ik01LjkwNCwxMzkuNDc5YzAuOTQ5LDAuMjMxLDEuODExLDAuNzQ1LDIuNzE3LDAuODQyYzEuMjExLDAuMTI4LDIuNTUxLDAuMjAxLDMuNjYzLTAuMTkyDQoJCWMxLjM5Ny0wLjQ5NCwxLjQ4Mi0yLjEwOSwwLjMwMS0zLjA0N2MtMC43ODctMC42MjUtMS43MDYtMS4wOC0yLjUzNy0xLjY1MmMtMi4wMzMtMS4zOTgtMy4yNjEtMy4yMDYtMi42NjQtNS43OTUNCgkJYzAuNTgzLTIuNTMyLDIuNDA0LTMuNzY0LDQuNzk4LTQuMjc3YzIuMzMzLTAuNSw0LjYxOC0wLjM5OSw2LjkxOSwwLjgwNGMtMC4yNDQsMS4wNTEtMC40ODksMi4xMDktMC43NTMsMy4yNDkNCgkJYy0wLjk2My0wLjMxMS0xLjgzMi0wLjY4OS0yLjc0LTAuODU0Yy0wLjcyNC0wLjEzMS0xLjU3LTAuMTktMi4yMjMsMC4wNjhjLTAuNjc2LDAuMjY3LTEuNDg2LDAuODY0LTEuNjc0LDEuNDg3DQoJCWMtMC4xNTYsMC41MTgsMC4zNTUsMS40MzcsMC44MzcsMS45MDNjMC43NSwwLjcyNiwxLjcxNSwxLjIzNSwyLjYwOCwxLjgwNmMxLjgwNCwxLjE1MywyLjg1OCwyLjY0OCwyLjU1OSw0LjkyMw0KCQljLTAuMzAxLDIuMjkxLTEuNDczLDMuODQ5LTMuNjQ3LDQuNTgxYy0zLjA2LDEuMDMxLTYuMDU4LDAuOTE4LTguOTgzLTAuNjgyQzUuMzQsMTQxLjU5OCw1LjU4OCwxNDAuNTg3LDUuOTA0LDEzOS40Nzl6Ii8+DQoJPHBhdGggZmlsbD0iIzIxMkMzMSIgZD0iTTU5LjcwMiwxMzIuNDU2Yy0wLjcxNC0zLjU3OCwwLjc5Mi02LjI3Miw0LjIzNC02LjkyNWMxLjk2My0wLjM3Myw0LjA3Ni0wLjAzNCw2LjExNCwwLjA5OQ0KCQljMS4xMDIsMC4wNzIsMS4zODksMC43NzYsMC45ODIsMS44MTVjLTAuMjM2LDAuNjA0LTAuMzQsMS4yNTktMC41MiwxLjk1NGMtMC45MDUtMC4yOTUtMS43MjgtMC42OTItMi41ODktMC44MDkNCgkJYy0wLjg3NC0wLjExOS0xLjgzNi0wLjEzNC0yLjY2OSwwLjExMWMtMS42MjQsMC40NzctMS45NjUsMi4wMS0wLjcxNiwzLjE1MmMwLjgxLDAuNzQxLDEuNzg2LDEuMzEyLDIuNzI1LDEuODk5DQoJCWMxLjkyNSwxLjIwMywzLjAxOSwyLjc5NywyLjY1LDUuMTcxYy0wLjM2NSwyLjM0NS0xLjcyMiwzLjg2MS0zLjk0NSw0LjUyNmMtMi4zNzQsMC43MS00Ljc2MSwwLjcyMi03LjE1OS0wLjA4Ng0KCQljLTEuMTk2LTAuNDAzLTEuNjc3LTAuOTQxLTEuMTQyLTIuMTljMC4yNTEtMC41ODcsMC4zMzEtMS4yNDgsMC40NzctMS44MzFjMS4yMTUsMC40MjYsMi4zMjUsMC45MzMsMy40OSwxLjE4Mw0KCQljMC43NTcsMC4xNjIsMS42OSwwLjE1OCwyLjM2OS0wLjE1NGMwLjY0MS0wLjI5NSwxLjM1My0xLjAzNSwxLjQ3Mi0xLjY4MmMwLjA5OS0wLjUzOS0wLjQ4NS0xLjM4Mi0wLjk5OC0xLjgxOA0KCQljLTEuMDMtMC44NzctMi4yOC0xLjQ5NC0zLjMxNy0yLjM2NEM2MC41NjUsMTM0LjAwNyw2MC4yMSwxMzMuMjIxLDU5LjcwMiwxMzIuNDU2eiIvPg0KCTxwYXRoIGZpbGw9IiMyMTJDMzEiIGQ9Ik04OC4xODcsMTQyLjk5Yy0xLjY4NywxLjE1NC0zLjQwMywxLjM5OS01LjA5NiwwLjQ1Yy0xLjY0NC0wLjkyMi0xLjk4NS0yLjU0OC0xLjk1My00LjMyDQoJCWMwLjA5NS01LjI1NSwyLjc4OC04LjIyOCw4LjI4Ni04Ljc1MWMxLjk2OC0wLjE4NywzLjk4NywwLjE1LDYuMDM5LDAuMjUxYy0wLjgxOSw0LjUzOS0xLjU3OCw4Ljc0My0yLjM1NiwxMy4wNDkNCgkJYy0wLjk1NCwwLTIuMTAxLDAtMy4zNCwwYzAtMC42ODUsMC0xLjM1NywwLTEuOTZDODkuMjY2LDE0Mi4xMjEsODguNzc0LDE0Mi41MjUsODguMTg3LDE0Mi45OXogTTg2LjEzOCwxNDAuNjcNCgkJYzEuNDY4LDAuNjQ0LDIuNDUzLTAuMTk0LDIuOTMzLTEuMzNjMC44MDctMS45MDgsMS4zMjEtMy45NCwxLjk3OS01Ljk4MmMtMi4wNzctMC40MjItMy41NjEsMC4wODYtNC41MDksMS41OTkNCgkJQzg1LjQ2OSwxMzYuNjY4LDg0Ljg2OSwxMzguNTIxLDg2LjEzOCwxNDAuNjd6Ii8+DQoJPHBhdGggZmlsbD0iIzIxMkMzMSIgZD0iTTE0NC4xNDEsMTMxLjE2N2MxLjEzNSwxLjU2OCwwLjc3LDMuMTksMC40NzcsNC43NzJjLTAuNDA1LDIuMTg2LTAuOTY3LDQuMzQzLTEuMzMyLDYuNTM0DQoJCWMtMC4xNywxLjAxOC0wLjU2NSwxLjM3My0xLjU3MywxLjI3N2MtMC44OTItMC4wODUtMS43OTktMC4wMTgtMi44NzktMC4wMThjMC41MTctMi41NiwxLjAwNC00Ljk3LDEuNDkxLTcuMzgNCgkJYzAuMDYtMC4yOTcsMC4yMTgtMC42MTUsMC4xNi0wLjg4N2MtMC4xNTctMC43MzYtMC40MDctMS40NTItMC42Mi0yLjE3NWMtMC43OTgsMC4yOTktMS44ODYsMC4zNzQtMi4zMjksMC45NDcNCgkJYy0wLjc0MSwwLjk1OC0xLjIxNSwyLjE5Ni0xLjUzOSwzLjM4N2MtMC41NDEsMS45ODgtMC44NzUsNC4wMzMtMS4yOTksNi4wNjdjLTEuNDE3LDAtMi43MjMsMC00LjE3MiwwDQoJCWMwLjkwOS00LjQ0NywxLjgwMi04LjgyMiwyLjcwMi0xMy4yMjRjMS4yMDUsMCwyLjM0NCwwLDMuNTI0LDBjLTAuMDU4LDAuNTMzLTAuMTA4LDAuOTk2LTAuMTg2LDEuNzE3DQoJCUMxMzguOTkzLDEzMC4zMTIsMTQxLjMzNywxMjkuMDQ5LDE0NC4xNDEsMTMxLjE2N3oiLz4NCgk8cGF0aCBmaWxsPSIjMjEyQzMxIiBkPSJNNzYuNjM1LDEyNy40NzFjMC44NTMtMC4yMTMsMS41ODQtMC40MDYsMi41NTYtMC42NjJjLTAuMjI0LDEuMjA5LTAuNDI3LDIuMzAzLTAuNjU1LDMuNTM4DQoJCWMxLjAwNiwwLDEuODk3LDAsMi45NzEsMGMtMC4yMTYsMS4wMi0wLjM5OSwxLjg4Ni0wLjYwMiwyLjg0MWMtMC45OTUsMC0xLjkzNywwLTIuOTkzLDBjLTAuMzc5LDEuNzM1LTAuNzQ2LDMuMzk2LTEuMTA0LDUuMDU5DQoJCWMtMC40NjgsMi4xNzYtMC4yNTcsMi40NjQsMS45MTYsMi42MzljMC4wMzgsMC4wODIsMC4xMTgsMC4xNywwLjExLDAuMjVjLTAuMjkzLDIuOTA1LTAuNDUsMy4wMzEtMy40NzYsMi43OTUNCgkJYy0yLjIyNC0wLjE3My0zLjI4MS0xLjM0Mi0yLjk3Ny0zLjY0NWMwLjMwMy0yLjI5OCwwLjg0Ny00LjU2NCwxLjMwNi02Ljk0OGMtMC41NTYtMC4wNjctMS4wNzYtMC4xMjktMS43MDktMC4yMDUNCgkJYzAuMTg2LTAuOTA4LDAuMzYzLTEuNzczLDAuNTYxLTIuNzRjMS41MTYsMC4zNzYsMi4xMjctMC4zMjcsMi4xODMtMS42NjFDNzQuNzc2LDEyNy41MjMsNzUuODY4LDEyNy44MzQsNzYuNjM1LDEyNy40NzF6Ii8+DQoJPHBhdGggZmlsbD0iIzIxMkMzMSIgZD0iTTEwNC4wODYsMTI3LjAwM2MtMC4xMjYsMS4xMjktMC4zMiwyLjE2NC0wLjU0MiwzLjM0NGMxLjAwNiwwLDEuODkyLDAsMi45NTksMA0KCQljLTAuMjIxLDEuMDI2LTAuNDA5LDEuODkzLTAuNjE2LDIuODUzYy0xLjAwNCwwLTEuOTQ3LDAtMi45OTMsMGMtMC4zNzUsMS43NDctMC43MzksMy40MTEtMS4wODksNS4wNzkNCgkJYy0wLjQ2MywyLjIwNS0wLjI5NywyLjQyMiwxLjkzNywyLjYwN2MwLjAzOCwwLjA4MywwLjEyNiwwLjE3OSwwLjEwNywwLjI0NmMtMC4yNTEsMC44OTItMC40NDUsMi41MDgtMC43OTEsMi41NDINCgkJYy0xLjQ5OSwwLjE0OC0zLjE2NywwLjE0NS00LjU0LTAuMzk1Yy0xLjU4Ni0wLjYyNC0xLjMzMS0yLjM0OC0xLjA4NC0zLjc1NWMwLjM1OS0yLjA0LDAuODM4LTQuMDU4LDEuMjg2LTYuMTg1DQoJCWMtMC41OTUtMC4wNzEtMS4xMTctMC4xMzQtMS42MzgtMC4xOTZjMC4xNzItMi42MjMsMC4xNzItMi42MjMsMi4zNTMtMi44NjljLTAuMzMtMi40NTIsMS41MzItMi42OTcsMy4yNjItMy4wODcNCgkJQzEwMy4xMzYsMTI3LjA4OSwxMDMuNTc3LDEyNy4wMDEsMTA0LjA4NiwxMjcuMDAzeiIvPg0KCTxwYXRoIGZpbGw9IiMyMzJEMzIiIGQ9Ik00MC45MzUsMTQzLjUxOGMtMS4wNzIsMC4wODctMi4wNCwwLjIzMi0yLjk4NCwwLjEzNmMtMi4xMjEtMC4yMTUtMy4xMjctMS40MTUtMi43NzgtMy40OTgNCgkJYzAuNTQ5LTMuMjg0LDEuMjY0LTYuNTQsMS45MTUtOS44NDZjMS4zNjMsMCwyLjYxMywwLDQuMDg2LDBjLTAuNDg4LDIuMzczLTAuOTY5LDQuNzE3LTEuNDUzLDcuMDYNCgkJYy0wLjAzMSwwLjE0OC0wLjA5MSwwLjI5LTAuMTIyLDAuNDM4Yy0wLjUsMi4zNzUtMC4zNSwyLjU5OCwyLjA5MywyLjkxMUM0MS40NzYsMTQxLjY0Myw0MS4yNjMsMTQyLjU1NSw0MC45MzUsMTQzLjUxOHoiLz4NCgk8cGF0aCBmaWxsPSIjMjIyQzMxIiBkPSJNMTEyLjIzNiwxMzIuOTk2Yy0wLjM4MiwxLjgwNi0wLjc1MSwzLjQ4NC0xLjEwMyw1LjE2NWMtMC40MjksMi4wNDYtMC4xNzUsMi4zNjYsMS45MjQsMi40Nw0KCQljMC4wNDIsMC4wODEsMC4xMjgsMC4xNjYsMC4xMjEsMC4yNDJjLTAuMjYyLDIuODQtMC41MjgsMy4wNjktMy4yODksMi44NDRjLTIuMzctMC4xOTMtMy40Ni0xLjMyNy0zLjA5NS0zLjY4DQoJCWMwLjUwMi0zLjIzNSwxLjI1LTYuNDMzLDEuOTA1LTkuNzA2YzEuMzksMCwyLjY4LDAsNC4wODUsMEMxMTIuNjAxLDEzMS4yMTUsMTEyLjQyOSwxMzIuMDQyLDExMi4yMzYsMTMyLjk5NnoiLz4NCgk8cGF0aCBmaWxsPSIjMjMyRDMyIiBkPSJNMTA5LjM4NSwxMjcuMDc0Yy0wLjAwOC0wLjI2LTAuMDE1LTAuNDE1LDAuMDE5LTAuNTYxYzAuMzE4LTEuMzYyLDEuMjQyLTEuOSwyLjU2Ny0xLjgxOQ0KCQljMS4wNSwwLjA2NSwxLjcwOSwwLjYzNywxLjc4OSwxLjcwMmMwLjA4OSwxLjE4NS0wLjU2MSwxLjk2My0xLjY1NywyLjIxN0MxMTAuODY0LDEyOC45MDIsMTA5Ljc1NCwxMjguNjk1LDEwOS4zODUsMTI3LjA3NHoiLz4NCgk8cGF0aCBmaWxsPSIjMjMyRDMyIiBkPSJNMzkuODg4LDEyNC42ODdjMS43OTIsMC4yMTUsMi41MjksMC45OTYsMi4yNTksMi4yNTFjLTAuMjgsMS4zMDItMS44MDUsMi4yMzgtMy4wNjQsMS42NDUNCgkJYy0wLjU5NS0wLjI4LTEuMjIxLTEuMTQyLTEuMjczLTEuNzg1QzM3LjcxMiwxMjUuNjA0LDM4LjU2MywxMjQuODkzLDM5Ljg4OCwxMjQuNjg3eiIvPg0KPC9nPg0KPC9zdmc+DQo=';

  public getRequestDto(
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto {
    const request = new RequestDto(this.getUri(url)
      .toString(), method);
    request.headers = {
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Basic ${this._getToken(applicationInstall)}`,
    };
    if (data) {
      request.body = data;
    }

    return request;
  }

  public getSettingsForm = (): Form => new Form()
    .addField(new Field(FieldType.TEXT, USER, 'API Key', undefined, true))
    .addField(new Field(FieldType.TEXT, PASSWORD, 'API Secret', undefined, true));

  public getWebhookSubscribeRequestDto(
    applicationInstall: ApplicationInstall,
    subscription: WebhookSubscription,
    url: string,
  ): RequestDto {
    const request = new ProcessDto();
    return this.getRequestDto(
      request,
      applicationInstall,
      HttpMethods.POST,
      `${SHIPSTATION_URL}/webhooks/subscribe`,
      JSON.stringify({
        name: subscription.getParameters().name,
        event: ORDER_NOTIFY,
        /* eslint-disable @typescript-eslint/naming-convention */
        target_url: url,
        store_id: undefined,
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    );
  }

  public getWebhookSubscriptions = (): WebhookSubscription[] => [
    new WebhookSubscription('New order', 'Webhook', '', { name: ORDER_NOTIFY }),
  ];

  public getWebhookUnsubscribeRequestDto(applicationInstall: ApplicationInstall, id: string): RequestDto {
    const request = new ProcessDto();
    return this.getRequestDto(
      request,
      applicationInstall,
      HttpMethods.DELETE,
      `${SHIPSTATION_URL}/webhooks/${id}`,
    );
  }

  public processWebhookSubscribeResponse = (
    dto: ResponseDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    applicationInstall: ApplicationInstall,
  ): string => (dto.jsonBody as { id: string }).id;

  public processWebhookUnsubscribeResponse = (dto: ResponseDto): boolean => dto.responseCode === 200;

  private _getToken = (applicationInstall: ApplicationInstall): string => encode(
    `${applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][USER]}:
      ${applicationInstall.getSettings()[AUTHORIZATION_SETTINGS][PASSWORD]}`,
  );
}
