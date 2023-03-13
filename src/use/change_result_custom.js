import moment from "moment";

export const changeContrAgentsResult_custom = (element) => {
    switch (element.fieldName) {
        case "shipment_grounds":
            const value = element?.value?.split("от")[0].trim()
            return {fieldName: "shipment_grounds", value};
        case "rights_number":
            return {fieldName: "rights_number", value: element.value};;
        case "rights_date":
            const val = element.value ? element.value : moment().format('YYYY-MM-DD')
            const rights_date = moment(val, "YYYY-MM-DD").format("DD.MM.YYYY");
            return { fieldName: element.fieldName, value: rights_date };
        case "shipping_date":
            const date = moment(element.value, "YYYY-MM-DD").format("DD.MM.YYYY")
            return { fieldName: element.fieldName, value: date };
        case "documents_handed":
            return { fieldName: element.fieldName, value: element.value };
        case "blank_series":
            return { fieldName: element.fieldName, value: element.value };
        case "blank_number":
            return { fieldName: element.fieldName, value: element.value };
        default:
            const items = element.items.map((el) => {
                return {fieldName: el.fieldName, value: el.value};
            });
            const id = element.items[0]?.currencies?.find((i) => i.label === element.items[0].value)?.id || "";
            return {fieldName: element.fieldName, id, value: {...items}};
    }
};
export const changeAvailableTransport_result_custom = (element) => {
    return {fieldName: element.fieldName, value: element.value}
};

export const changeMapper = (items) => {
    const result = items?.map((element) => {
        return {fieldName: element.fieldName, value: element.value}
    });
    return result;
};

export const changeCommodity = (response, fieldName, parenValue, commodityDictionary, currency) => {
    const obj = Object.values(response?.commodityDictionary);
    const findItem = obj.find((el) => el.product_name === parenValue);
    let item = null;
    if (findItem) {
        item = obj.find((el) => el.product_name === parenValue)[fieldName];
        if (fieldName === "product_price") {
            const price = item ? item[currency] : "";
            return price ? `${price}` : "";
        }
        return item ? `${item}` : "";
    } else {
        return "";
    }
};

export const changeTransport = (items, filterObj) => {
    const res = items.map((element) => {
        if (element.fieldName !== "car_model" && element.fieldName !== "car_number" && filterObj.length) {
            switch (element.fieldName) {
                case "last_name":
                    const last_name = filterObj[0]?.last_name;
                    const name = filterObj[0]?.name;
                    const second_name = filterObj[0]?.second_name;
                    const value = last_name || name || second_name ? `${last_name} ${name} ${second_name}` : "";
                    return {...element, value}
                default:
                    const val = filterObj[0][element.fieldName] || "";
                    return {...element, value: val};
            }
        } else {
            return element;
        }
    });
    return res;
};