import AOAuth2Application from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/AOAuth2Application';
import ProcessDto from 'pipes-nodejs-sdk/dist/lib/Utils/ProcessDto';
import { ApplicationInstall } from 'pipes-nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import HttpMethods, { parseHttpMethod } from 'pipes-nodejs-sdk/dist/lib/Transport/HttpMethods';
import RequestDto from 'pipes-nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import Form from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Form';
import { CommonHeaders, JSON_TYPE } from 'pipes-nodejs-sdk/dist/lib/Utils/Headers';
import Field from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from 'pipes-nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import { CLIENT_ID, CLIENT_SECRET } from 'pipes-nodejs-sdk/dist/lib/Authorization/Type/OAuth2/IOAuth2Application';
import { BodyInit } from 'node-fetch';

export const INSTANCE_NAME = 'instance_name';

const SALES_URL = 'https://login.salesforce.com/services/oauth2/authorize';
const TOKEN_URL = 'https://login.salesforce.com/services/oauth2/token';

export default class SalesForceApplication extends AOAuth2Application {
  // eslint-disable-next-line max-len
  public getDescription = (): string => 'Salesforce is a leading enterprise customer relationship manager (CRM) application.';

  public getName = (): string => 'salesforce';

  public getPublicName = (): string => 'Salesforce';

  // eslint-disable-next-line max-len
  public getLogo = (): string => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIxNTBweCIgaGVpZ2h0PSIxNTBweCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDE1MCAxNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iIzAwQTFFMCIgZD0iTTYyLjQyMSwzMy45NTVjNC44MzgtNS4wNDEsMTEuNTczLTguMTY3LDE5LjAyMS04LjE2N2M5LjkwMiwwLDE4LjU0MSw1LjUyMSwyMy4xNDEsMTMuNzE4DQoJYzMuOTk4LTEuNzg2LDguNDIzLTIuNzgsMTMuMDc5LTIuNzhjMTcuODU5LDAsMzIuMzM4LDE0LjYwNSwzMi4zMzgsMzIuNjJjMCwxOC4wMTctMTQuNDc5LDMyLjYyMi0zMi4zMzgsMzIuNjIyDQoJYy0yLjEzOSwwLjAwMS00LjI3My0wLjIxMS02LjM3LTAuNjM1Yy00LjA1MSw3LjIyNi0xMS43NzEsMTIuMTA5LTIwLjYzMiwxMi4xMDljLTMuNzA5LDAtNy4yMTgtMC44NTctMTAuMzQyLTIuMzgNCgljLTQuMTA3LDkuNjYtMTMuNjc1LDE2LjQzNC0yNC44MjcsMTYuNDM0Yy0xMS42MTMsMC0yMS41MTEtNy4zNDgtMjUuMzEtMTcuNjU0Yy0xLjY2LDAuMzUzLTMuMzgsMC41MzYtNS4xNDUsMC41MzYNCglDMTEuMjA5LDExMC4zNzgsMCw5OS4wNTQsMCw4NS4wODFjMC05LjM2Myw1LjAzNi0xNy41MzksMTIuNTE5LTIxLjkxMmMtMS41NDEtMy41NDUtMi4zOTctNy40NTctMi4zOTctMTEuNTcxDQoJYzAtMTYuMDY4LDEzLjA0NS0yOS4wOTQsMjkuMTM1LTI5LjA5NEM0OC43MDMsMjIuNTA0LDU3LjA5OCwyNi45OTYsNjIuNDIxLDMzLjk1NSIvPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTIyLjMwMyw3Ny4wNzdjLTAuMDk0LDAuMjQ2LDAuMDM0LDAuMjk3LDAuMDY0LDAuMzRjMC4yODIsMC4yMDUsMC41NjgsMC4zNTMsMC44NTcsMC41MTcNCgljMS41MywwLjgxMiwyLjk3NCwxLjA0OSw0LjQ4NSwxLjA0OWMzLjA3NywwLDQuOTg3LTEuNjM3LDQuOTg3LTQuMjcxVjc0LjY2YzAtMi40MzYtMi4xNTYtMy4zMjEtNC4xNzktMy45NTlsLTAuMjYzLTAuMDg1DQoJYy0xLjUyNi0wLjQ5Ni0yLjg0Mi0wLjkyMy0yLjg0Mi0xLjkyN3YtMC4wNTNjMC0wLjg1OSwwLjc2OS0xLjQ5MiwxLjk2Mi0xLjQ5MmMxLjMyNSwwLDIuODk3LDAuNDQsMy45MSwxDQoJYzAsMCwwLjI5NywwLjE5MiwwLjQwNi0wLjA5NmMwLjA2LTAuMTU0LDAuNTczLTEuNTM0LDAuNjI2LTEuNjg0YzAuMDU4LTAuMTYyLTAuMDQ1LTAuMjgyLTAuMTUtMC4zNDYNCgljLTEuMTU2LTAuNzAzLTIuNzU0LTEuMTg0LTQuNDA4LTEuMTg0bC0wLjMwOCwwLjAwMmMtMi44MTYsMC00Ljc4MiwxLjcwMS00Ljc4Miw0LjEzOXYwLjA1MWMwLDIuNTcsMi4xNjksMy40MDQsNC4yMDEsMy45ODUNCglsMC4zMjcsMC4xYzEuNDgxLDAuNDU1LDIuNzU2LDAuODQ2LDIuNzU2LDEuODg5djAuMDUxYzAsMC45NTMtMC44MjksMS42NjItMi4xNjcsMS42NjJjLTAuNTE5LDAtMi4xNzUtMC4wMTEtMy45NjQtMS4xNDENCgljLTAuMjE2LTAuMTI2LTAuMzQyLTAuMjE4LTAuNTA5LTAuMzE4Yy0wLjA4OC0wLjA1Ni0wLjMwOC0wLjE1Mi0wLjQwNCwwLjEzOUwyMi4zMDMsNzcuMDc3TDIyLjMwMyw3Ny4wNzd6IE02Ny4zNDgsNzcuMDc3DQoJYy0wLjA5NCwwLjI0NiwwLjAzNCwwLjI5NywwLjA2NCwwLjM0YzAuMjgyLDAuMjA1LDAuNTY4LDAuMzUzLDAuODU3LDAuNTE3YzEuNTMsMC44MTIsMi45NzUsMS4wNDksNC40ODUsMS4wNDkNCgljMy4wNzcsMCw0Ljk4Ny0xLjYzNyw0Ljk4Ny00LjI3MVY3NC42NmMwLTIuNDM2LTIuMTU2LTMuMzIxLTQuMTgtMy45NTlsLTAuMjYzLTAuMDg1Yy0xLjUyNi0wLjQ5Ni0yLjg0Mi0wLjkyMy0yLjg0Mi0xLjkyN3YtMC4wNTMNCgljMC0wLjg1OSwwLjc2OS0xLjQ5MiwxLjk2Mi0xLjQ5MmMxLjMyNSwwLDIuODk3LDAuNDQsMy45MSwxYzAsMCwwLjI5NywwLjE5MiwwLjQwNi0wLjA5NmMwLjA2LTAuMTU0LDAuNTczLTEuNTM0LDAuNjI2LTEuNjg0DQoJYzAuMDU4LTAuMTYyLTAuMDQ1LTAuMjgyLTAuMTUtMC4zNDZjLTEuMTU2LTAuNzAzLTIuNzU0LTEuMTg0LTQuNDA4LTEuMTg0bC0wLjMwOCwwLjAwMmMtMi44MTYsMC00Ljc4MiwxLjcwMS00Ljc4Miw0LjEzOXYwLjA1MQ0KCWMwLDIuNTcsMi4xNjksMy40MDQsNC4yMDEsMy45ODVsMC4zMjcsMC4xQzczLjcyMiw3My41NjYsNzUsNzMuOTU3LDc1LDc1djAuMDUxYzAsMC45NTMtMC44MzEsMS42NjItMi4xNjksMS42NjINCgljLTAuNTE5LDAtMi4xNzUtMC4wMTEtMy45NjQtMS4xNDFjLTAuMjE2LTAuMTI2LTAuMzQ0LTAuMjE0LTAuNTA2LTAuMzE4Yy0wLjA1Ni0wLjAzNi0wLjMxNi0wLjEzNy0wLjQwNiwwLjEzOUw2Ny4zNDgsNzcuMDc3DQoJTDY3LjM0OCw3Ny4wNzd6IE05OC4wOTksNzEuOTE2YzAsMS40ODktMC4yNzgsMi42NjItMC44MjUsMy40OTFjLTAuNTQxLDAuODIxLTEuMzU5LDEuMjItMi41LDEuMjJjLTEuMTQzLDAtMS45NTctMC4zOTctMi40ODktMS4yMg0KCWMtMC41MzktMC44MjctMC44MTItMi4wMDItMC44MTItMy40OTFjMC0xLjQ4NywwLjI3My0yLjY1OCwwLjgxMi0zLjQ3OWMwLjUzMi0wLjgxMiwxLjM0Ni0xLjIwNywyLjQ4OS0xLjIwNw0KCWMxLjE0MSwwLDEuOTU5LDAuMzk1LDIuNTAyLDEuMjA3Qzk3LjgyMSw2OS4yNTgsOTguMDk5LDcwLjQyOSw5OC4wOTksNzEuOTE2IE0xMDAuNjY4LDY5LjE1NmMtMC4yNTItMC44NTMtMC42NDUtMS42MDUtMS4xNjktMi4yMzENCgljLTAuNTI0LTAuNjI4LTEuMTg2LTEuMTMyLTEuOTcyLTEuNWMtMC43ODQtMC4zNjUtMS43MTEtMC41NTEtMi43NTItMC41NTFjLTEuMDQzLDAtMS45NywwLjE4Ni0yLjc1NCwwLjU1MQ0KCWMtMC43ODYsMC4zNjgtMS40NDksMC44NzItMS45NzQsMS41Yy0wLjUyMSwwLjYyOC0wLjkxNSwxLjM4LTEuMTY5LDIuMjMxYy0wLjI1LDAuODQ4LTAuMzc2LDEuNzc2LTAuMzc2LDIuNzYxDQoJYzAsMC45ODUsMC4xMjYsMS45MTUsMC4zNzYsMi43NjFjMC4yNTQsMC44NSwwLjY0NSwxLjYwMywxLjE3MSwyLjIzMWMwLjUyMywwLjYyOCwxLjE4OCwxLjEzLDEuOTcyLDEuNDg3DQoJYzAuNzg2LDAuMzU3LDEuNzExLDAuNTM4LDIuNzU0LDAuNTM4YzEuMDQxLDAsMS45NjYtMC4xODIsMi43NTItMC41MzhjMC43ODQtMC4zNTcsMS40NDktMC44NTksMS45NzItMS40ODcNCgljMC41MjMtMC42MjYsMC45MTctMS4zNzgsMS4xNjktMi4yMzFjMC4yNTItMC44NDgsMC4zNzgtMS43NzgsMC4zNzgtMi43NjFDMTAxLjA0Niw3MC45MzMsMTAwLjkyLDcwLjAwNCwxMDAuNjY4LDY5LjE1Ng0KCSBNMTIxLjc1OSw3Ni4yM2MtMC4wODUtMC4yNS0wLjMyNy0wLjE1Ni0wLjMyNy0wLjE1NmMtMC4zNzQsMC4xNDMtMC43NzEsMC4yNzYtMS4xOTQsMC4zNDJjLTAuNDMsMC4wNjYtMC45MDIsMC4xLTEuNDA4LDAuMQ0KCWMtMS4yNDMsMC0yLjIzMS0wLjM3LTIuOTM4LTEuMWMtMC43MDktMC43MzEtMS4xMDctMS45MTItMS4xMDMtMy41MTFjMC4wMDQtMS40NTUsMC4zNTUtMi41NDksMC45ODUtMy4zODINCgljMC42MjYtMC44MjksMS41NzktMS4yNTQsMi44NS0xLjI1NGMxLjA2LDAsMS44NjgsMC4xMjIsMi43MTQsMC4zODljMCwwLDAuMjAzLDAuMDg4LDAuMjk5LTAuMTc3DQoJYzAuMjI0LTAuNjI0LDAuMzkxLTEuMDcxLDAuNjMtMS43NTZjMC4wNjgtMC4xOTQtMC4wOTgtMC4yNzgtMC4xNTgtMC4zMDFjLTAuMzMzLTAuMTMtMS4xMi0wLjM0Mi0xLjcxNC0wLjQzMg0KCWMtMC41NTYtMC4wODUtMS4yMDUtMC4xMy0xLjkyNy0wLjEzYy0xLjA3OSwwLTIuMDQxLDAuMTg0LTIuODYzLDAuNTUxYy0wLjgyMSwwLjM2NS0xLjUxNywwLjg3LTIuMDY4LDEuNDk4DQoJYy0wLjU1MSwwLjYyOC0wLjk3LDEuMzgtMS4yNSwyLjIzMWMtMC4yNzgsMC44NDgtMC40MTksMS43OC0wLjQxOSwyLjc2NWMwLDIuMTMsMC41NzUsMy44NTIsMS43MDksNS4xMTMNCgljMS4xMzcsMS4yNjUsMi44NDQsMS45MDgsNS4wNzEsMS45MDhjMS4zMTYsMCwyLjY2Ny0wLjI2NywzLjYzNy0wLjY1YzAsMCwwLjE4Ni0wLjA5LDAuMTA1LTAuMzA1TDEyMS43NTksNzYuMjNMMTIxLjc1OSw3Ni4yM3oNCgkgTTEyNi4yNTMsNzAuNDljMC4xMjItMC44MjcsMC4zNS0xLjUxNSwwLjcwMy0yLjA1MWMwLjUzMi0wLjgxNCwxLjM0NC0xLjI2MSwyLjQ4NS0xLjI2MXMxLjg5NSwwLjQ0OSwyLjQzNiwxLjI2MQ0KCWMwLjM1OSwwLjUzNiwwLjUxNSwxLjI1NCwwLjU3NywyLjA1MUgxMjYuMjUzTDEyNi4yNTMsNzAuNDl6IE0xMzQuOSw2OC42NzFjLTAuMjE4LTAuODIzLTAuNzU5LTEuNjU0LTEuMTEzLTIuMDM0DQoJYy0wLjU2LTAuNjAzLTEuMTA3LTEuMDIzLTEuNjUtMS4yNTljLTAuNzA5LTAuMzAzLTEuNTYtMC41MDQtMi40OTEtMC41MDRjLTEuMDg1LDAtMi4wNzEsMC4xODItMi44NywwLjU1OA0KCWMtMC44MDEsMC4zNzYtMS40NzQsMC44ODktMi4wMDIsMS41MjhjLTAuNTI4LDAuNjM3LTAuOTI1LDEuMzk1LTEuMTc3LDIuMjU2Yy0wLjI1NCwwLjg1Ny0wLjM4MiwxLjc5MS0wLjM4MiwyLjc3Ng0KCWMwLDEuMDAyLDAuMTMzLDEuOTM2LDAuMzk1LDIuNzc2YzAuMjY1LDAuODQ2LDAuNjg4LDEuNTkyLDEuMjYxLDIuMjA5YzAuNTcsMC42MjIsMS4zMDYsMS4xMDksMi4xODYsMS40NDkNCgljMC44NzQsMC4zMzgsMS45MzYsMC41MTMsMy4xNTYsMC41MTFjMi41MTEtMC4wMDksMy44MzMtMC41NjgsNC4zNzgtMC44N2MwLjA5Ni0wLjA1MywwLjE4OC0wLjE0NywwLjA3My0wLjQxN2wtMC41NjgtMS41OTINCgljLTAuMDg1LTAuMjM3LTAuMzI3LTAuMTUtMC4zMjctMC4xNWMtMC42MjIsMC4yMzEtMS41MDYsMC42NDUtMy41NjgsMC42NDFjLTEuMzQ4LTAuMDAyLTIuMzQ4LTAuNC0yLjk3NC0xLjAyMQ0KCWMtMC42NDMtMC42MzctMC45NTctMS41NzMtMS4wMTMtMi44OTNsOC42OTQsMC4wMDljMCwwLDAuMjI5LTAuMDA0LDAuMjUyLTAuMjI3QzEzNS4xNjcsNzIuMzIzLDEzNS40NTgsNzAuNjMxLDEzNC45LDY4LjY3MQ0KCSBNNTYuNjIzLDcwLjQ5YzAuMTI0LTAuODI3LDAuMzUtMS41MTUsMC43MDMtMi4wNTFjMC41MzItMC44MTQsMS4zNDQtMS4yNjEsMi40ODUtMS4yNjFzMS44OTUsMC40NDksMi40MzgsMS4yNjENCgljMC4zNTcsMC41MzYsMC41MTMsMS4yNTQsMC41NzUsMi4wNTFINTYuNjIzeiBNNjUuMjY4LDY4LjY3MWMtMC4yMTgtMC44MjMtMC43NTYtMS42NTQtMS4xMTEtMi4wMzQNCgljLTAuNTYtMC42MDMtMS4xMDctMS4wMjMtMS42NS0xLjI1OWMtMC43MDktMC4zMDMtMS41Ni0wLjUwNC0yLjQ5MS0wLjUwNGMtMS4wODMsMC0yLjA3MSwwLjE4Mi0yLjg3LDAuNTU4DQoJYy0wLjgwMSwwLjM3Ni0xLjQ3NCwwLjg4OS0yLjAwMiwxLjUyOGMtMC41MjgsMC42MzctMC45MjUsMS4zOTUtMS4xNzcsMi4yNTZjLTAuMjUyLDAuODU3LTAuMzgyLDEuNzkxLTAuMzgyLDIuNzc2DQoJYzAsMS4wMDIsMC4xMzIsMS45MzYsMC4zOTUsMi43NzZjMC4yNjUsMC44NDYsMC42ODgsMS41OTIsMS4yNjEsMi4yMDljMC41NzEsMC42MjIsMS4zMDYsMS4xMDksMi4xODYsMS40NDkNCgljMC44NzQsMC4zMzgsMS45MzYsMC41MTMsMy4xNTYsMC41MTFjMi41MTEtMC4wMDksMy44MzMtMC41NjgsNC4zNzgtMC44N2MwLjA5Ni0wLjA1MywwLjE4OC0wLjE0NywwLjA3My0wLjQxN2wtMC41NjYtMS41OTINCgljLTAuMDg4LTAuMjM3LTAuMzI5LTAuMTUtMC4zMjktMC4xNWMtMC42MjIsMC4yMzEtMS41MDQsMC42NDUtMy41NzEsMC42NDFjLTEuMzQ2LTAuMDAyLTIuMzQ2LTAuNC0yLjk3Mi0xLjAyMQ0KCWMtMC42NDMtMC42MzctMC45NTctMS41NzMtMS4wMTMtMi44OTNsOC42OTQsMC4wMDljMCwwLDAuMjI5LTAuMDA0LDAuMjUyLTAuMjI3QzY1LjUzNyw3Mi4zMjMsNjUuODI4LDcwLjYzMSw2NS4yNjgsNjguNjcxDQoJIE0zNy44Myw3Ni4xODNjLTAuMzQtMC4yNzEtMC4zODctMC4zNC0wLjUwMi0wLjUxNWMtMC4xNzEtMC4yNjctMC4yNTktMC42NDctMC4yNTktMS4xM2MwLTAuNzY1LDAuMjUyLTEuMzE0LDAuNzc2LTEuNjg0DQoJYy0wLjAwNiwwLjAwMiwwLjc0OC0wLjY1MiwyLjUyMS0wLjYyOGMxLjI0NiwwLjAxNywyLjM1OSwwLjIwMSwyLjM1OSwwLjIwMXYzLjk1M2gwLjAwMmMwLDAtMS4xMDUsMC4yMzctMi4zNDgsMC4zMTINCglDMzguNjEsNzYuNzk4LDM3LjgyMyw3Ni4xOCwzNy44Myw3Ni4xODMgTTQxLjI4OSw3MC4wNzRjLTAuMzUzLTAuMDI2LTAuODEtMC4wNDEtMS4zNTctMC4wNDFjLTAuNzQ2LDAtMS40NjYsMC4wOTQtMi4xNDEsMC4yNzYNCgljLTAuNjc5LDAuMTgyLTEuMjkxLDAuNDY2LTEuODE2LDAuODQyYy0wLjUyNSwwLjM3NS0wLjk1NiwwLjg2NS0xLjI2MSwxLjQzNGMtMC4zMDgsMC41NzMtMC40NjQsMS4yNDgtMC40NjQsMi4wMDQNCgljMCwwLjc2OSwwLjEzMiwxLjQzOCwwLjM5NywxLjk4NWMwLjI2NSwwLjU0OSwwLjY0NywxLjAwNiwxLjEzNSwxLjM1OWMwLjQ4MywwLjM1MywxLjA3OSwwLjYxMSwxLjc3MSwwLjc2Nw0KCWMwLjY4MiwwLjE1NiwxLjQ1NSwwLjIzNSwyLjMwMSwwLjIzNWMwLjg5MSwwLDEuNzgtMC4wNzMsMi42NDEtMC4yMmMwLjg1My0wLjE0NSwxLjktMC4zNTcsMi4xOS0wLjQyMw0KCWMwLjIwNC0wLjA0OSwwLjQwNy0wLjEwMSwwLjYwOS0wLjE1NmMwLjIxNi0wLjA1MywwLjE5OS0wLjI4NCwwLjE5OS0wLjI4NEw0NS40OSw2OS45YzAtMS43NDQtMC40NjYtMy4wMzYtMS4zODItMy44MzgNCgljLTAuOTEyLTAuNzk5LTIuMjU2LTEuMjAzLTMuOTk0LTEuMjAzYy0wLjY1MiwwLTEuNzAxLDAuMDktMi4zMjksMC4yMTZjMCwwLTEuOSwwLjM2OC0yLjY4MiwwLjk3OWMwLDAtMC4xNzEsMC4xMDctMC4wNzcsMC4zNDYNCglsMC42MTUsMS42NTRjMC4wNzcsMC4yMTQsMC4yODQsMC4xNDEsMC4yODQsMC4xNDFzMC4wNjYtMC4wMjYsMC4xNDMtMC4wNzFjMS42NzMtMC45MSwzLjc4OC0wLjg4MiwzLjc4OC0wLjg4Mg0KCWMwLjk0LDAsMS42NjIsMC4xODgsMi4xNSwwLjU2MmMwLjQ3NCwwLjM2MywwLjcxNiwwLjkxMiwwLjcxNiwyLjA3djAuMzY4QzQxLjk3NSw3MC4xMzUsNDEuMjg5LDcwLjA3NCw0MS4yODksNzAuMDc0DQoJIE0xMTEuNDE0LDY1LjU5NGMwLjA2Ni0wLjE5Ny0wLjA3My0wLjI5MS0wLjEzLTAuMzEyYy0wLjE0Ny0wLjA1OC0wLjg4Ny0wLjIxNC0xLjQ1Ny0wLjI1Yy0xLjA5Mi0wLjA2Ni0xLjY5OCwwLjExOC0yLjI0MSwwLjM2MQ0KCWMtMC41MzgsMC4yNDQtMS4xMzcsMC42MzctMS40NywxLjA4M3YtMS4wNThjMC0wLjE0Ny0wLjEwNS0wLjI2NS0wLjI1LTAuMjY1aC0yLjIyOWMtMC4xNDUsMC0wLjI1LDAuMTE3LTAuMjUsMC4yNjV2MTIuOTY4DQoJYzAsMC4xNDUsMC4xMiwwLjI2NSwwLjI2NSwwLjI2NWgyLjI4NGMwLjE0Ni0wLjAwMSwwLjI2My0wLjExOSwwLjI2My0wLjI2NXYtNi40NzljMC0wLjg3LDAuMDk2LTEuNzM3LDAuMjg5LTIuMjgyDQoJYzAuMTg4LTAuNTM5LDAuNDQ0LTAuOTcsMC43NjEtMS4yOGMwLjMxOC0wLjMwOCwwLjY3OS0wLjUyMywxLjA3NS0wLjY0NWMwLjQwNC0wLjEyNCwwLjg1LTAuMTY1LDEuMTY3LTAuMTY1DQoJYzAuNDU1LDAsMC45NTUsMC4xMTcsMC45NTUsMC4xMTdjMC4xNjcsMC4wMTksMC4yNjEtMC4wODMsMC4zMTYtMC4yMzVDMTEwLjkwOSw2Ny4wMjEsMTExLjMzMiw2NS44MzEsMTExLjQxNCw2NS41OTQiLz4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik04OS45NzMsNTkuNTgzYy0wLjI3OC0wLjA4NS0wLjUzLTAuMTQzLTAuODU5LTAuMjA1Yy0wLjMzMy0wLjA2LTAuNzMxLTAuMDktMS4xODItMC4wOQ0KCWMtMS41NzMsMC0yLjgxMiwwLjQ0NC0zLjY4MiwxLjMyYy0wLjg2NSwwLjg3Mi0xLjQ1MywyLjE5OS0xLjc0OCwzLjk0NWwtMC4xMDcsMC41ODhoLTEuOTc0YzAsMC0wLjIzOS0wLjAwOS0wLjI5MSwwLjI1Mg0KCWwtMC4zMjMsMS44MWMtMC4wMjQsMC4xNzEsMC4wNTEsMC4yOCwwLjI4MiwwLjI4aDEuOTIxbC0xLjk0OSwxMC44OGMtMC4xNTIsMC44NzYtMC4zMjcsMS41OTYtMC41MjEsMi4xNDMNCgljLTAuMTksMC41MzktMC4zNzYsMC45NDItMC42MDcsMS4yMzdjLTAuMjIyLDAuMjgyLTAuNDMyLDAuNDkxLTAuNzk1LDAuNjEzYy0wLjI5OSwwLjEtMC42NDUsMC4xNDctMS4wMjMsMC4xNDcNCgljLTAuMjA5LDAtMC40ODktMC4wMzQtMC42OTctMC4wNzdjLTAuMjA1LTAuMDQxLTAuMzE0LTAuMDg1LTAuNDctMC4xNTJjMCwwLTAuMjI0LTAuMDg1LTAuMzE0LDAuMTM5DQoJYy0wLjA3MSwwLjE4Ni0wLjU4MywxLjU5NC0wLjY0NSwxLjc2N2MtMC4wNiwwLjE3MywwLjAyNiwwLjMwOCwwLjEzNSwwLjM0OGMwLjI1NiwwLjA5LDAuNDQ3LDAuMTUsMC43OTUsMC4yMzMNCgljMC40ODMsMC4xMTMsMC44OTEsMC4xMiwxLjI3MywwLjEyYzAuNzk5LDAsMS41My0wLjExMywyLjEzNS0wLjMzMWMwLjYwNy0wLjIyLDEuMTM3LTAuNjAzLDEuNjA3LTEuMTINCgljMC41MDYtMC41NiwwLjgyNS0xLjE0NSwxLjEyOC0xLjk0N2MwLjMwMS0wLjc5MSwwLjU2LTEuNzc0LDAuNzY1LTIuOTE5bDEuOTU5LTExLjA4M2gyLjg2M2MwLDAsMC4yNDEsMC4wMDksMC4yOTEtMC4yNTQNCglsMC4zMjUtMS44MDhjMC4wMjEtMC4xNzMtMC4wNTEtMC4yOC0wLjI4NC0wLjI4aC0yLjc4YzAuMDE1LTAuMDYyLDAuMTQxLTEuMDQxLDAuNDU5LTEuOTYxYzAuMTM3LTAuMzkxLDAuMzkzLTAuNzA5LDAuNjA5LTAuOTI3DQoJYzAuMjE0LTAuMjE0LDAuNDU5LTAuMzY1LDAuNzI5LTAuNDUzYzAuMjc2LTAuMDksMC41OS0wLjEzMiwwLjkzNC0wLjEzMmMwLjI2MSwwLDAuNTE5LDAuMDMsMC43MTQsMC4wNw0KCWMwLjI2OSwwLjA1OCwwLjM3NCwwLjA4OCwwLjQ0NSwwLjEwOWMwLjI4NCwwLjA4NSwwLjMyMywwLjAwMiwwLjM3OC0wLjEzNWwwLjY2NS0xLjgyNUM5MC4yMDEsNTkuNjksOTAuMDMzLDU5LjYwNyw4OS45NzMsNTkuNTgzDQoJIE01MS4xMzIsNzguMzg3YzAsMC4xNDUtMC4xMDUsMC4yNjMtMC4yNSwwLjI2M2gtMi4zMDZjLTAuMTQ1LDAtMC4yNDgtMC4xMTgtMC4yNDgtMC4yNjNWNTkuODMxYzAtMC4xNDUsMC4xMDMtMC4yNjMsMC4yNDgtMC4yNjMNCgloMi4zMDZjMC4xNDUsMCwwLjI1LDAuMTE4LDAuMjUsMC4yNjNWNzguMzg3eiIvPg0KPC9zdmc+DQo=';

  public getRequestDto = (
    dto: ProcessDto,
    applicationInstall: ApplicationInstall,
    method: HttpMethods,
    url?: string,
    data?: BodyInit,
  ): RequestDto | Promise<RequestDto> => {
    const request = new RequestDto(url ?? '', parseHttpMethod(method), dto);
    request.headers = {
      [CommonHeaders.ACCEPT]: JSON_TYPE,
      [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
      [CommonHeaders.AUTHORIZATION]: `Bearer ${this.getAccessToken(applicationInstall)}`,
    };

    if (data) {
      request.body = data;
    }

    return request;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getScopes = (applicationInstall: ApplicationInstall): string[] => [];

  public getSettingsForm = (): Form => (new Form())
    .addField(new Field(FieldType.TEXT, CLIENT_ID, 'Client Id', undefined, true))
    .addField(new Field(FieldType.TEXT, CLIENT_SECRET, 'Client Secret', undefined, true))
    .addField(new Field(FieldType.TEXT, INSTANCE_NAME, 'Instance Name', undefined, true));

  public getAuthUrl = (): string => SALES_URL;

  public getTokenUrl = (): string => TOKEN_URL;
}
