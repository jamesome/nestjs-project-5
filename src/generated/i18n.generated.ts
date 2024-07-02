/* DO NOT EDIT, file generated by nestjs-i18n */
  
/* eslint-disable */
/* prettier-ignore */
import { Path } from "nestjs-i18n";
/* prettier-ignore */
export type I18nTranslations = {
    "test": {
        "HELLO": string;
        "LENGTH": string;
        "PRODUCT": {
            "NEW": string;
        };
        "ENGLISH": string;
        "ARRAY": [
            string,
            string,
            string
        ];
        "cat": string;
        "cat_name": string;
        "set-up-password": {
            "heading": string;
            "title": string;
            "followLink": string;
        };
        "day_interval": {
            "one": string;
            "other": string;
            "zero": string;
        };
        "nested": string;
        "MIN": string;
        "validation": {
            "Length": string;
        };
    };
    "database": {
        "DUPLICATE_ENTRY": string;
    };
    "error": {
        "SERVER_ERROR": string;
        "NOT_ENOUGH_QUANTITY": string;
        "MOVE_NOT_ALLOWED": string;
        "INCOMING_NOT_ALLOWED": string;
    };
    "validation": {
        "EXAMPLE": string;
        "fields": {
            "warehouse": {
                "name": string;
                "code": string;
                "post_code": string;
                "address": string;
                "detail_address": string;
                "manager": string;
                "contact": string;
            };
            "zone": {
                "name": string;
                "code": string;
                "remark": string;
                "warehouse_id": string;
            };
            "location": {
                "name": string;
                "remark": string;
                "zone_id": string;
                "warehouse_id": string;
            };
            "item": {
                "name": string;
                "property": string;
                "zone_id": string;
                "warehouse_id": string;
            };
            "item_code": {
                "code": string;
            };
            "supplier": {
                "name": string;
            };
            "inventory_item": {
                "item_id": string;
                "location_id": string;
                "quantity": string;
                "status": string;
                "lot_no": string;
                "expiration_date": string;
            };
            "item_serial": {
                "serial_no": string;
            };
            "operation_type": {
                "category": string;
                "name": string;
            };
            "inventory_transaction": {
                "item_id": string;
                "location_departure_id": string;
                "location_arrival_id": string;
                "quantity": string;
            };
            "quantity": string;
        };
        "rules": {
            "IS_NOT_EMPTY": string;
            "IS_STRING": string;
            "IS_INT": string;
            "MAX_LENGTH": string;
            "LENGTH": string;
            "IS_DATE": string;
            "MIN": string;
            "STOCK_STATUS": string;
            "CATEGORY": string;
        };
    };
};
/* prettier-ignore */
export type I18nPath = Path<I18nTranslations>;
