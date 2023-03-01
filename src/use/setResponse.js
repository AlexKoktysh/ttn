export const setResponseMapper = (items, response) => {
    const result = items?.map((element) => setResponse_custom(element, response));
    return result;
};
export const changeLabel = (items, currencyCode) => {
    const result = items?.map((element) => {
        const element_name = element.fieldName;
        switch (element_name) {
            case "product_price":
                return {...element, label: `${element.label} ${currencyCode}`};
            case "product_cost":
                return {...element, label: `${element.label} ${currencyCode}`};
            case "ttn_product_vat_sum":
                return {...element, label: `${element.label} ${currencyCode}`};
            case "product_cost_with_vat":
                return {...element, label: `${element.label} ${currencyCode}`};
            default:
                return element;
        }
    });
    return result;
};

const setResponse_custom = (element, response) => {
    const element_name = element.fieldName;
    switch (element_name) {
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