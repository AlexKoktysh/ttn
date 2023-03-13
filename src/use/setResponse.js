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
        case "allowed_person":
            return getCurrenciesPerson(element, response, true);
        case "handed_person":
            return getCurrenciesPerson(element, response, true);
        case "received_person":
            return getCurrenciesPerson(element, response, true);
        case "car_model":
            return getCurrenciesCar(element, response, true, "car_model", response);
        case "car_number":
            return getCurrenciesCar(element, response, true, "car_number", response);    
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
const getCurrenciesPerson = (element, response, isControl) => {
    const isArray = Array.isArray(response);
    const mapEntity = response && !isArray ? Object.values(response) : response || [];
    return {
        ...element,
        items: element.items.map((el_item) => {
            if (response && (el_item.fieldName === "allowed_person_last_name" || el_item.fieldName === "handed_person_last_name")) {
                const findItem = response.find((el) => !Number.isInteger(el.id));
                return {
                    ...el_item,
                    currencies: mapEntity?.map((el, index) => {
                        return { index: index, label: `${el[el_item.key]}`, id: el.id};
                    }) || [],
                    controlValue: isControl ? response : "",
                    value: findItem.last_name,
                };
            }
            return {
                ...el_item,
                currencies: mapEntity?.map((el, index) => {
                    return { index: index, label: `${el[el_item.key]}`, id: el.id};
                }) || [],
                controlValue: isControl ? response : "",
            }
        }),
    };
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
            return { index: index, label: el[label] || ""};
        }) || [],
        controlValue: isControl ? control_response : "",
    };
};