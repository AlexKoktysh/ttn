import { commodityDictionary_default } from "../constants";

export const setResponseMapper = (items, response, allResponse) => {
    const result = items?.map((element) => setResponse_custom(element, response, allResponse));
    return result;
};
export const changeLabel = (items, value) => {
    const result = items?.map((element) => {
        const element_name = element.fieldName;
        switch (element_name) {
            case "product_price":
                return {...element, label: `${commodityDictionary_default[3].label} ${value}`};
            case "product_cost":
                return {...element, label: `${commodityDictionary_default[4].label} ${value}`};
            case "ttn_product_vat_sum":
                return {...element, label: `${commodityDictionary_default[6].label} ${value}`};
            case "product_cost_with_vat":
                return {...element, label: `${commodityDictionary_default[7].label} ${value}`};
            default:
                return element;
        }
    });
    return result;
};

export const getValueLabel = (value) => {
    switch(value) {
        case 2:
            return "BYN";
        case 3:
            return "RUB";
        case 4:
            return "USD";
        case 5:
            return "EUR";
        default:
            return null;
    }
};

const setResponse_custom = (element, response, allResponse) => {
    const element_name = element.fieldName;
    switch (element_name) {
        case "shipment_grounds":
            return getDogovorCurrencies(element, allResponse);
            case "allowed_person_id":
                return getCurrencies(element, response, false, "last_name");
            case "handed_person_id":
                return getCurrencies(element, response, false, "last_name");
            case "received_person_id":
                return getCurrencies(element, response, true, "last_name", response);
        case "car_model":
            return getCurrenciesCar(element, response, true, "car_model car_number", response);
        case "product_name":
            return getCurrencies(element, response?.commodityDictionary, true, "product_name", response?.commodityOptions);
        default:
            return element;
    }
};
const getDogovorCurrencies = (element, response) => {
    if (response) {
        return {
            ...element,
            currencies: response.map((el, index) => {
                return { index: index, label: `${el.doc_number} от ${el.doc_start_date}` };
            }),
        };
    }
    return element;
};
const getCurrencies = (element, response, isControl, label, control_response) => {
    const isArray = Array.isArray(response);
    const mapEntity = response && !isArray ? Object.values(response) : response || [];
    return {
        ...element,
        currencies: mapEntity?.map((el, index) => {
            return { index: index, label: label ? el[label] : el, ttn_max_qty: el.ttnProductQty || "" };
        }) || [],
        controlValue: isControl ? control_response : "",
    };
};
const getCurrenciesCar = (element, response, isControl, label, control_response) => {
    return {
        ...element,
        currencies: response?.map((el, index) => {
            const lab = label?.split(" ");
            return { index: index, label: `${el[lab[0]]} ${el[lab[1]]}`};
        }) || [],
        controlValue: isControl ? control_response : "",
    };
};