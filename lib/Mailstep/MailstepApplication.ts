import CoreFormsEnum, { getFormName } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/CoreFormsEnum';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import WebhookSubscription from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Webhook/WebhookSubscription';
import {
    ABasicApplication,
    PASSWORD,
    USER,
} from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import CacheService, { ICacheCallback } from '@orchesty/nodejs-sdk/dist/lib/Cache/CacheService';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import ResponseDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/ResponseDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import ProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/ProcessDto';
import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

export const NAME = 'mailstep';

export const ESHOP_ID = 'eshopId';

export enum WebhookTypes {
    ORGANIZATION_CHANGE = 'organization_change',
    PRODUCT_CHANGE = 'product_change',
    PRODUCT_STOCK_CHANGE = 'product_stock_change',
    EXPEDITION_STATUS_CHANGE = 'expedition_status_change',
    EXPEDITION_BOOKED_CHANGE = 'expedition_booked_change',
    STOCK_ADVICE_STATUS_CHANGE = 'stock_advice_status_change',
}

export enum OrderStatus {
    ON_HOLD = 'on_hold',
    INCORRECT = 'incorrect',
    STOCK_OK = 'stock_ok',
    AWAITING_RESERVATION = 'awaiting_reservation',
    WAITING_FOR_GOODS = 'waiting_for_goods',
    PREALLOCATED = 'preallocated',
    AWAITING_PROCESSING = 'awaiting_processing',
    TAKE_OUT = 'take_out',
    COMPLETION = 'completion',
    WAITING_FOR_THE_CARRIER = 'waiting_for_the_carrier',
    CARRIER_PICKED_UP = 'carrier_picked_up',
    DELIVERED = 'delivered',
    PROBABLY_DELIVERED = 'probably_delivered',
    RETURNED = 'returned',
    READY_TO_TAKEOVER = 'ready_to_takeover',
    RETURNING = 'returning',
    WAITING_FOR_CANCEL = 'waiting_for_cancel',
    CANCELED = 'canceled',
}

export default class MailstepApplication extends ABasicApplication {

    public constructor(private readonly cache: CacheService) {
        super();
    }

    public getName(): string {
        return NAME;
    }

    public getDescription(): string {
        return 'Professional fulfillment from market leader';
    }

    public getPublicName(): string {
        return 'Mailstep';
    }

    public getLogo(): string {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM4cHgiIGhlaWdodD0iMzlweCIgdmlld0JveD0iMCAwIDEzOCAzOSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjbGFzcz0iSGVhZGVyLWxvZ28iPgogICAgPHRpdGxlPkdyb3VwIDk8L3RpdGxlPgogICAgPGRlZnM+CiAgICAgICAgPHBvbHlnb24gaWQ9InBhdGgtMSIgcG9pbnRzPSI2LjM1OTQ0N2UtMDUgMCAxMzcuODIxOTA0IDAgMTM3LjgyMTkwNCAzOC45Njc1MTE1IDYuMzU5NDQ3ZS0wNSAzOC45Njc1MTE1Ij48L3BvbHlnb24+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iSFAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJIUC0xLjItKHRtYXbDoSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNjAuMDAwMDAwLCAtMjkuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC05IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNjAuMDAwMDAwLCAyOS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJDbGlwLTIiPjwvZz4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00OC45MDA5Njc3LDMwLjYxMTE5ODIgTDU1LjU2MjQ4ODUsMzAuNjExMTk4MiBMNTUuNTYyNDg4NSwxMC40ODY3MjgxIEw0OC45MDA5Njc3LDEwLjQ4NjcyODEgTDQ4LjkwMDk2NzcsMzAuNjExMTk4MiBaIE01Mi4xOTgzNDEsMCBDNDkuNzQ5OTUzOSwwIDQ4LjU1NzU1NzYsMS45NzE0Mjg1NyA0OC41NTc1NTc2LDMuOTg0MTkzNTUgQzQ4LjU1NzU1NzYsNS45NTI0NDI0IDQ5Ljc0OTk1MzksNy45NjgzODcxIDUyLjE5ODM0MSw3Ljk2ODM4NzEgQzU0LjY3MjE2NTksNy45NjgzODcxIDU1Ljg4MzY0MDYsNS45NTI0NDI0IDU1Ljg4MzY0MDYsMy45ODQxOTM1NSBDNTUuODgzNjQwNiwxLjk3MTQyODU3IDU0LjY3MjE2NTksMCA1Mi4xOTgzNDEsMCBMNTIuMTk4MzQxLDAgWiBNNTguNTE2NDUxNiwzMC42MTExOTgyIEw2NS4xNTU3MTQzLDMwLjYxMTE5ODIgTDY1LjE1NTcxNDMsMC4yMDY2ODIwMjggTDU4LjUxNjQ1MTYsMC4yMDY2ODIwMjggTDU4LjUxNjQ1MTYsMzAuNjExMTk4MiBaIE03NS44NDkxMjQ0LDE3Ljg4Mjc2NSBDNzQuNDk3NzQxOSwxNy41ODM4NzEgNzQuMDE3NjAzNywxNy4zMTA0MTQ3IDc0LjAxNzYwMzcsMTYuNjkwMzY4NyBDNzQuMDE3NjAzNywxNi4yMTAyMzA0IDc0LjMxMzMxOCwxNS44MjIzMDQxIDc1LjYyMDE4NDMsMTUuODIyMzA0MSBDNzYuNzM5NDQ3LDE1LjgyMjMwNDEgNzguMTEzMDg3NiwxNi4zMjQ3MDA1IDc5LjE0MzMxOCwxNi43MzgwNjQ1IEw4MC40NTAxODQzLDExLjYwOTE3MDUgQzc5LjE0MzMxOCwxMC45MDAwOTIyIDc3Ljg2MTg4OTQsMTAuMjgwMDQ2MSA3NC4yNDY1NDM4LDEwLjI4MDA0NjEgQzY5Ljk0MTE5ODIsMTAuMjgwMDQ2MSA2Ny44ODA3MzczLDEzLjY0NzM3MzMgNjcuODgwNzM3MywxNi45NDE1NjY4IEM2Ny44ODA3MzczLDIwLjA1NzY5NTkgNjkuMTg0NDI0LDIyLjE4NDkzMDkgNzIuMTM4Mzg3MSwyMy4wMDg0NzkzIEM3My42MDQyMzk2LDIzLjQyMTg0MzMgNzQuMTA2NjM1OSwyMy45NDk2Nzc0IDc0LjEwNjYzNTksMjQuNTY2NTQzOCBDNzQuMTA2NjM1OSwyNS4xODM0MTAxIDczLjYwNDIzOTYsMjUuNTI2ODIwMyA3Mi43NTg0MzMyLDI1LjUyNjgyMDMgQzcxLjQ1MTU2NjgsMjUuNTI2ODIwMyA3MC4wMzM0MTAxLDI1LjAyNDQyNCA2OC43NzQyMzk2LDI0LjI2NzY0OTggTDY3LjEyMzk2MzEsMjguNTI4NDc5MyBDNjguNjM3NTExNSwyOS44MzIxNjU5IDcwLjQ0MzU5NDUsMzEuMTEzNTk0NSA3My40MTk4MTU3LDMxLjExMzU5NDUgQzc4LjY2MzE3OTcsMzEuMTEzNTk0NSA4MS4yNTE0NzQ3LDI3LjkzMDY5MTIgODEuMjUxNDc0NywyNC4yNDUzOTE3IEM4MS4yNTE0NzQ3LDIxLjQwNTg5ODYgNzkuNDY0NDcsMTguNjE0MTAxNCA3NS44NDkxMjQ0LDE3Ljg4Mjc2NSBMNzUuODQ5MTI0NCwxNy44ODI3NjUgWiBNOTEuMTQwNDE0NywxMC40ODY3MjgxIEw5MS4xNDA0MTQ3LDQuNjkzMjcxODkgTDg0LjQ3ODg5NCw0LjY5MzI3MTg5IEw4NC40Nzg4OTQsMTAuNDg2NzI4MSBMODIuODMxNzk3MiwxMC40ODY3MjgxIEw4Mi44MzE3OTcyLDE2Ljc4MjU4MDYgTDg0LjQ3ODg5NCwxNi43ODI1ODA2IEw4NC40Nzg4OTQsMzAuNjExMTk4MiBMOTEuMTQwNDE0NywzMC42MTExOTgyIEw5MS4xNDA0MTQ3LDE2Ljc4MjU4MDYgTDkzLjQ3NzUxMTUsMTYuNzgyNTgwNiBMOTMuNDc3NTExNSwxMC40ODY3MjgxIEw5MS4xNDA0MTQ3LDEwLjQ4NjcyODEgWiIgaWQ9IkZpbGwtMSIgY2xhc3M9IkhlYWRlci1sb2dvTGV0dGVyIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIyLjA2OTU1MywyNC4zNTk4OTM1IEwxMjIuMDQ3Mjk1LDI0LjM1OTg5MzUgQzEyMC42MjkxMzksMjQuMzU5ODkzNSAxMTkuODk0NjIzLDIyLjU1MDYzMDkgMTE5Ljg5NDYyMywyMC43NDQ1NDc5IEMxMTkuODk0NjIzLDE4Ljk1NzU0MzMgMTIwLjYyOTEzOSwxNy4xNDgyODA2IDEyMi4wNDcyOTUsMTcuMTQ4MjgwNiBMMTIyLjA2OTU1MywxNy4xNDgyODA2IEMxMjMuNDkwODksMTcuMTQ4MjgwNiAxMjQuMjIyMjI2LDE4Ljk1NzU0MzMgMTI0LjIyMjIyNiwyMC43NDQ1NDc5IEMxMjQuMjIyMjI2LDIyLjU1MDYzMDkgMTIzLjQ5MDg5LDI0LjM1OTg5MzUgMTIyLjA2OTU1MywyNC4zNTk4OTM1IE0xMjQuMDg1NDk4LDEwLjE4Nzg2NTkgQzEyMy4yMzk2OTIsMTAuMTg3ODY1OSAxMjIuNTk3Mzg4LDEwLjM3MjI4OTkgMTIyLjA0NzI5NSwxMC42NzExODM5IEMxMjEuMTA5Mjc3LDExLjE3MzU4MDIgMTIwLjUzNjkyNywxMi4wNDQ4MjQ0IDEyMC4wNTY3ODgsMTIuOTEyODg4OSBMMTIwLjA1Njc4OCwxMC40ODY3NTk5IEwxMTMuNDE3NTI2LDEwLjQ4Njc1OTkgTDExMy40MTc1MjYsMzguOTY3NTQzMyBMMTIwLjA1Njc4OCwzOC45Njc1NDMzIEwxMjAuMDU2Nzg4LDI4LjcwOTc1NTMgQzEyMC40NDQ3MTUsMjkuNDE4ODMzNiAxMjAuOTI0ODUzLDMwLjI5MDA3NzkgMTIyLjA0NzI5NSwzMC43NDc5NTgxIEMxMjIuNTc1MTI5LDMwLjk3Njg5ODIgMTIzLjIxNDI1NCwzMS4xMTM2MjYzIDEyNC4wODU0OTgsMzEuMTEzNjI2MyBDMTI4LjM2NTQwNiwzMS4xMTM2MjYzIDEzMC41MTgwNzksMjUuODk1NyAxMzAuNTE4MDc5LDIwLjY3NDU5NCBDMTMwLjUxODA3OSwxNS40MDg5NzE5IDEyOC4zNjU0MDYsMTAuMTg3ODY1OSAxMjQuMDg1NDk4LDEwLjE4Nzg2NTkiIGlkPSJGaWxsLTUiIGNsYXNzPSJIZWFkZXItbG9nb0xldHRlciI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTEwMS40NjUwMDksMTcuODgyNzY1IEMxMDEuNDY1MDA5LDE3LjM4OTkwNzggMTAxLjU3OTQ3OSwxNi43Njk4NjE4IDEwMS44NjU2NTQsMTYuMjc3MDA0NiBDMTAyLjE1MTgyOSwxNS43ODA5Njc3IDEwMi42MDk3MDksMTUuNDA4OTQwMSAxMDMuMjk2NTI5LDE1LjQwODk0MDEgQzEwNC42NDc5MTIsMTUuNDMxMTk4MiAxMDUuMTI4MDUsMTYuODA0ODM4NyAxMDUuMTI4MDUsMTcuODgyNzY1IEwxMDEuNDY1MDA5LDE3Ljg4Mjc2NSBaIE0xMTEuMzU3MTI5LDIxLjcyNzA1MDcgTDExMS4zNTcxMjksMjAuODU4OTg2MiBDMTExLjM1NzEyOSwxNS40MDg5NDAxIDEwOC45NTMyNTgsMTAuMzI3NzQxOSAxMDMuMjk2NTI5LDEwLjE4NzgzNDEgTDEwMy4wNjc1ODksMTAuMTg3ODM0MSBDOTcuNjIwNzIzLDEwLjE4NzgzNDEgOTQuODk1NywxNS41MDExNTIxIDk0Ljg5NTcsMjAuNzQ0NTE2MSBDOTQuODk1NywyNi4wMTAxMzgyIDk3LjYyMDcyMywzMS4yNzU3NjA0IDEwMy4wMjMwNzMsMzEuMjc1NzYwNCBMMTAzLjI5NjUyOSwzMS4yNzU3NjA0IEMxMDguMTk2NDgzLDMxLjE2MTI5MDMgMTEwLjI1Njk0NCwyOC4wOTI4NTcxIDExMS4yMjA0LDI0LjkzMjIxMiBDMTExLjI4NzE3NSwyNC42MTEwNTk5IDExMS4zMzQ4NzEsMjQuMjY3NjQ5OCAxMTEuMzM0ODcxLDIzLjkyNDIzOTYgTDEwNS4xMjgwNSwyMy45MjQyMzk2IEMxMDQuOTkxMzIyLDI0Ljg2NTQzNzggMTA0LjY5NTYwOCwyNS45NDAxODQzIDEwMy4zNDQyMjUsMjUuOTQwMTg0MyBDMTAzLjMyMTk2NywyNS45NDAxODQzIDEwMy4zMjE5NjcsMjUuOTE3OTI2MyAxMDMuMjk2NTI5LDI1LjkxNzkyNjMgQzEwMi4wMzczNTksMjUuODk1NjY4MiAxMDEuMzc1OTc2LDI0LjcwMzI3MTkgMTAxLjM3NTk3NiwyMS43MjcwNTA3IEwxMTEuMzU3MTI5LDIxLjcyNzA1MDcgWiIgaWQ9IkZpbGwtNiIgY2xhc3M9IkhlYWRlci1sb2dvTGV0dGVyIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMzYuODM3MTI4NiwyNC4xMDg2OTU0IEwzNi44MTQ4NzA1LDI0LjEwODY5NTQgQzM1LjI1NjgwNiwyNC4xMDg2OTU0IDM0LjU5MjI0MzgsMjIuMjMyNjU4NSAzNC41OTIyNDM4LDIwLjMwODkyNTggQzM0LjU5MjI0MzgsMTguMzYyOTM1IDM1LjMwMTMyMjEsMTYuNDgzNzE4NCAzNi44MTQ4NzA1LDE2LjQ4MzcxODQgTDM2LjgzNzEyODYsMTYuNDgzNzE4NCBDMzguMzAyOTgxMSwxNi40ODM3MTg0IDM5LjA1NjU3NTYsMTguMzg1MTkzMSAzOS4wNTY1NzU2LDIwLjMwODkyNTggQzM5LjA1NjU3NTYsMjIuMjMyNjU4NSAzOC4zMDI5ODExLDI0LjEwODY5NTQgMzYuODM3MTI4NiwyNC4xMDg2OTU0IEwzNi44MzcxMjg2LDI0LjEwODY5NTQgWiBNMzkuMTkzMzAzNywxMC40ODY3NTk5IEwzOS4xOTMzMDM3LDEyLjY2MTY5MDggQzM4LjcxMzE2NTQsMTEuNjUzNzE4NCAzOC4wMjYzNDUyLDEwLjg3NDY4NjIgMzYuODM3MTI4NiwxMC41MDkwMTggQzM2LjM1Njk5MDMsMTAuMzUwMDMxOCAzNS44MDY4OTgyLDEwLjI4MDA3NzkgMzUuMTY0NTk0LDEwLjI4MDA3NzkgQzMwLjcwMDI2MjIsMTAuMjgwMDc3OSAyOC41MDMwNzMzLDE1LjQ1MzQ4OCAyOC41MDMwNzMzLDIwLjY3NDU5NCBDMjguNTAzMDczMywyNS44NDgwMDQxIDMwLjcwMDI2MjIsMzEuMDIxNDE0MyAzNS4xNjQ1OTQsMzEuMDIxNDE0MyBDMzUuODI5MTU2MiwzMS4wMjE0MTQzIDM2LjM1Njk5MDMsMzAuOTMyMzgyIDM2LjgzNzEyODYsMzAuNzQ3OTU4MSBDMzguMTg4NTExMSwzMC4yNjc4MTk4IDM4LjgyNzYzNTUsMjkuMTY3NjM1NSAzOS4xOTMzMDM3LDI4LjMyMTgyOSBMMzkuMTkzMzAzNywzMC42MTEyMyBMNDUuNzQzNTM0MSwzMC42MTEyMyBMNDUuNzQzNTM0MSwxMC40ODY3NTk5IEwzOS4xOTMzMDM3LDEwLjQ4Njc1OTkgWiIgaWQ9IkZpbGwtNyIgY2xhc3M9IkhlYWRlci1sb2dvTGV0dGVyIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOS44NjczODE1NywzMC42MTA0OTg2IEwxNi41Mjk1MzgyLDMwLjYxMDQ5ODYgTDE2LjUyOTUzODIsMTkuMDQ5MDI0IEMxNi41Mjk1MzgyLDE3LjkyNzIxNzUgMTYuNzU4NDc4MywxNi4zMjQ2MzY5IDE4LjIyMzY5NDksMTYuMzI0NjM2OSBDMTkuNjY2MDE3NSwxNi4zMjQ2MzY5IDE5LjgwMzM4MTYsMTguMDE4NzkzNSAxOS44MDMzODE2LDE5LjA0OTAyNCBMMTkuODAzMzgxNiwzMC42MTA0OTg2IEwyNi40NjU1MzgyLDMwLjYxMDQ5ODYgTDI2LjQ2NTUzODIsMTYuNjY4MDQ3IEMyNi40NjU1MzgyLDEzLjM3MTMwOTcgMjQuNjc5ODA1NSwxMC4xNjYxNDg0IDIxLjAxNjc2NDEsMTAuMTY2MTQ4NCBDMTcuOTcxODYwOCwxMC4xNjYxNDg0IDE2Ljk4NzQxODQsMTEuMzMzNzQyOSAxNi4wOTQ1NTIxLDEyLjM4Njg2NzMgQzE1LjM4NDgzNzgsMTEuMjY1MDYwOCAxNC4zNTQ2MDc0LDEwLjE2NjE0ODQgMTEuNTYxNTM4MiwxMC4xNjYxNDg0IEM5LjA2NjA5MTI0LDEwLjE2NjE0ODQgNy40NjM1MTA2LDExLjQ5NDAwMDkgNi41OTM1MzgyNSwxMi41OTI5MTM0IEw2LjU5MzUzODI1LDEwLjQ2Mzc3MDUgTDYuMzU5NDQ3ZS0wNSwxMC40NjM3NzA1IEw2LjM1OTQ0N2UtMDUsMzAuNjEwNDk4NiBMNi41NzA2NDQyNCwzMC42MTA0OTg2IEw2LjU3MDY0NDI0LDE5LjA0OTAyNCBDNi41NzA2NDQyNCwxNy44NTg1MzU1IDYuODIyNDc4MzQsMTYuMzI0NjM2OSA4LjIxOTAxMjksMTYuMzI0NjM2OSBDOS42ODQyMjk0OSwxNi4zMjQ2MzY5IDkuODY3MzgxNTcsMTcuODU4NTM1NSA5Ljg2NzM4MTU3LDE5LjA0OTAyNCBMOS44NjczODE1NywzMC42MTA0OTg2IFoiIGlkPSJGaWxsLTgiIGZpbGw9IiNFMjA3MTQiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==';
    }

    public getFormStack(): FormStack {
        return new FormStack()
            .addForm(
                new Form(CoreFormsEnum.AUTHORIZATION_FORM, getFormName(CoreFormsEnum.AUTHORIZATION_FORM))
                    .addField(new Field(FieldType.TEXT, USER, 'User', undefined, true))
                    .addField(new Field(FieldType.TEXT, PASSWORD, 'Password', undefined, true))
                    .addField(new Field(FieldType.TEXT, ESHOP_ID, 'E-shop ID', undefined, true)),
            );
    }

    public isAuthorized(applicationInstall: ApplicationInstall): boolean {
        return super.isAuthorized(applicationInstall)
            && applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM][ESHOP_ID];
    }

    public async getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        url?: string,
        data?: unknown,
    ): Promise<RequestDto> {
        const requestDto = new RequestDto(
            `https://app.mailship.eu/api/${url}`,
            method,
            dto,
            undefined,
            {
                [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
                [CommonHeaders.ACCEPT]: JSON_TYPE,
                [CommonHeaders.AUTHORIZATION]: await this.getAccessToken(applicationInstall),
            },
        );

        if (data) {
            requestDto.setJsonBody(data);
        }

        return requestDto;
    }

    public getWebhookSubscriptions(): WebhookSubscription[] {
        return [];
    }

    private async getAccessToken(applicationInstall: ApplicationInstall): Promise<string> {
        const { user, password } = applicationInstall.getSettings()[CoreFormsEnum.AUTHORIZATION_FORM];

        const requestDto = new RequestDto(
            'https://app.mailship.eu/api/login/user',
            HttpMethods.POST,
            new ProcessDto(),
            JSON.stringify({
                login: user,
                password,
            }),
        );

        return this.cache.entryWithLock(
            `mailstepCacheKey-${user}`,
            `mailstepCacheKeyLock-${user}`,
            requestDto,
            async (responseDto: ResponseDto): Promise<ICacheCallback<string>> => {
                const now = Math.floor(new Date().getTime() / 1_000);
                const { token, exp } = await responseDto.getJsonBody() as IAccessToken;

                return {
                    dataToStore: `Bearer ${token}`,
                    expire: exp - now - 60,
                };
            },
        );
    }

}

interface IAccessToken {
    token: string;
    exp: number;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getErrorInResponse({ status }: AxiosResponse, body: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (status === StatusCodes.BAD_REQUEST) {
        const response = JSON.parse(body) as IErrorResponse;

        if (Array.isArray(response.violations)) {
            return `Error: ${response.message} (${
                response.violations.map(({
                    message,
                    propertyPath,
                    parameters,
                }) => `${message} [${propertyPath}: ${parameters['{{ value }}']}]`).join(', ')
            })`;
        }

        return `Error: ${response.message}`;
    }

    return body;
}

export interface IErrorResponse {
    /* eslint-disable @typescript-eslint/naming-convention */
    message: string;
    violations?: {
        message: string;
        propertyPath: string;
        parameters: {
            '{{ value }}': string;
        }
        code: string;
    }[];
    /* eslint-enable @typescript-eslint/naming-convention */
}
