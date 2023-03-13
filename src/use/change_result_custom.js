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
        default:
            const items = element.items.map((el) => {
                return {fieldName: el.fieldName, value: el.value};
            });
            const id = element.items[0]?.currencies?.find((i) => i.label === element.items[0].value)?.id || "";
            return {fieldName: element.fieldName, id, value: {...items}};
    }
};
export const changeAvailableTransport_result_custom = (element, availableTransport) => {
    const field_name = availableTransport[0].controlValue[availableTransport[0].value];
    switch (element.fieldName) {
        case "car_model":
            return { fieldName: element.fieldName, value: field_name?.car_model || availableTransport[1].value };
        case "car_number":
            return { fieldName: element.fieldName, value: field_name?.car_number };
        default:
            return {fieldName: element.fieldName, value: element.value}


    }
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

export const changeTransport = (response, fieldName, parenValue, availableTransport) => {
    if (fieldName === "car_number") {
        const model = response.availableTransport[parenValue]?.car_model;
        const number = response.availableTransport[parenValue]?.car_number;
        return model || number ? `${model} ${number}` : "";
    }
    if (fieldName === "last_name") {
        const last_name = response.availableTransport[parenValue]?.last_name;
        const name = response.availableTransport[parenValue]?.name;
        const second_name = response.availableTransport[parenValue]?.second_name;
        return last_name || name || second_name ? `${last_name} ${name} ${second_name}` : "";
    }
    if (response.availableTransport[parenValue]) {
        return `${response.availableTransport[parenValue][fieldName] || ""}`;
    }
    addNewCar(fieldName, parenValue, availableTransport);
}
const addNewCar = (fieldName, parenValue, availableTransport) => {};