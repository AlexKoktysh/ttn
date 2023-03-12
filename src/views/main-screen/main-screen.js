import { useEffect, useState, useMemo } from "react";
import ActCard from "../act-card/act-card.js";
import {
    getDataForCreateTtn,
    sendTemplate,
    sendCommodityDictionary,
    showSection,
    deleteSection,
    getCommodityDictionary,
    updateCommodityDictionary,
    getInvoice,
} from "../../api/api";
import {
    contrAgents_default,
    availableTransport_default,
    commodityDictionary_default,
    tnOrTtnField,
    templateViewField,
    typeFields,
    steps,
} from "../../constants/index.js";
import "./main-screen.scss";
import { setResponseMapper, changeLabel, getValueLabel } from "../../use/setResponse.js";
import { changeDate_custom } from "../../use/changeDate.js";
import {
    changeAvailableTransport_result_custom,
    changeCommodity,
    changeContrAgentsResult_custom,
    changeTransport,
} from "../../use/change_result_custom.js";
import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';

function MainScreen(props) {
    const [serverResult, setServerResult] = useState([]);
    const [response, setResponse] = useState([]);
    const [step, setStep] = useState("");
    const [activeFormItems, setActiveFormItems] = useState([]);
    const [contrAgents, setContrAgents] = useState(contrAgents_default);
    const [availableTransport, setAvailableTransport] = useState(availableTransport_default);
    const [commodityDictionary, setCommodityDictionary] = useState(commodityDictionary_default);
    const [tnOrTtn, setTnOrTtn] = useState(tnOrTtnField);
    const [templateView, setTemplateView] = useState(templateViewField);
    const [type, setType] = useState(typeFields);
    const [resSteps, setResSteps] = useState(steps);
    const [isShowSample, setIsShowSample] = useState(false);
    const [isShowAddCommodityDictionary, setIsShowAddCommodityDictionary] = useState(false);
    const [commodityDictionary_result, setCommodityDictionary_result] = useState([]);
    const [productPosition, setProductPosition] = useState([{ index: 0, value: 1, label: 1 }]);
    const [productPosition_active, setProductPosition_active] = useState(1);
    const [server_commodityDictionary, setServer_commodityDictionary] = useState({});
    const [productPosition_prev, setProductPosition_prev] = useState(1);
    const [isTTN, setIsTTN] = useState(false);
    const [currency, setCurrency] = useState(null);
    const [shipment_grounds, setShipment_grounds] = useState(null);
    const [transportOwner, setTransportOwner] = useState([]);
    const [sample_id, setSample_id] = useState(props.sample_id);
    const [server_response, setServer_response] = useState(false);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            setServer_response(true);
            const response = await getDataForCreateTtn();
            setResponse(response);
            setServer_response(false);
        };
        fetch();
    }, []);
    useEffect(() => {
        const fetchCommodity = async () => {
            setLoader(true);
            const response = await getCommodityDictionary("");
            setServer_commodityDictionary(response);
            setLoader(false);
        }
        const update = () => {
            const isAll_commodityDictionary = commodityDictionary.filter((el) => !el.value && el.require);
            if (!isAll_commodityDictionary?.length) {
                const res = commodityDictionary?.map((element) => {
                    return { fieldName: element.fieldName, value: element.value };
                });
                if (response?.hasVat === 0) {
                    res.push({ fieldName: "product_vat", value: "" });
                    res.push({ fieldName: "product_vat_sum", value: "" });
                    res.push({ fieldName: "product_cost_with_vat", value: "" });
                }
                const ttn_max_qty = commodityDictionary[0].ttn_max_qty;
                res.push({fieldName: "ttn_max_qty", value: ttn_max_qty});
                res.push({fieldName: "ttn_commodity_position", value: productPosition_prev});
                ttn_max_qty && updateCommodityDictionary(res);
            }
        };
        const fetch = async () => {
            const response = await showSection(productPosition_active);
            const resArray = [...productPosition];
            if (response?.data?.sectionCount >= 1 && response.data.sectionCount + 1 > productPosition.length) {
                for (let i = 1; i < response.data.sectionCount; i++) {
                    const find = resArray.find((el) => el.index === i);
                    !find && resArray.push({ index: i, value: i + 1, label: i + 1 })
                }
                setProductPosition(resArray);
            }
            if (response?.status === 200) {
                const newCommodityDictionary = commodityDictionary?.map((element) => {
                    const value = response.data.columns[element.fieldName];
                    if (element.fieldName === "product_name") {
                        return {...element, value: value ? value : "", ttn_max_qty: response.data.columns.ttn_max_qty || ""};
                    }
                    return {...element, value: value ? value : ""};
                });
                setCommodityDictionary(newCommodityDictionary);
            }
        };
        update();
        fetchCommodity();
        fetch();
    }, [productPosition_active]);
    const fetchCommodity = async (value) => {
        const response = await getCommodityDictionary(value);
        setServer_commodityDictionary(response);
    }
    useEffect(() => {
        const item = tnOrTtn.find((el) => el.checked)?.label;
        if (item === "ТТН") {
            const step = { index: "2", value: "3", label: "3" };
            const item = resSteps.find((el) => el.label === "3");
            !item && setResSteps([...resSteps, step]);
        } else {
            const res = resSteps.filter((el) => el.label !== "3");
            setResSteps(res);
        }
    }, [tnOrTtn]);
    const checkStep = () => {
        switch (step) {
            case "1":
                return { setFunction: setContrAgents, items: contrAgents };
            case "3":
                return { setFunction: setCommodityDictionary, items: commodityDictionary };
            case "2":
                return { setFunction: isTTN ? setAvailableTransport : setCommodityDictionary, items: isTTN ? availableTransport : commodityDictionary };
            default:
                return {};
        }
    };
    const updatedItems = (changeItem, value) => {
        const field = changeItem?.controlInput ? changeItem.controlInput : changeItem.fieldName;
        const { setFunction, items, funcDate } = checkStep(changeItem, value);
        const val = !Array.isArray(changeItem.controlInput) && changeItem.controlValue ? funcDate : value;
        setFunction(items?.map((item) => {
            if (item.fieldName === field) {
                return { ...item, value: val };
            } else {
                if (item.fieldName === changeItem.fieldName) {
                    return { ...item, value}
                } else {
                    return item;
                }
            }
        }));
    };
    const getNewCurrencies = async (value) => {
        const data = commodityDictionary.map((el) => {
            if (el.fieldName === "product_name") {
                return {...el, value};
            }
            return el;
        });
        fetchCommodity(value);
        setCommodityDictionary(data);
    };
    const addProduct = async (item, value) => {
        const server_product = Object.values(item.controlValue);
        const product = server_product?.find((el) => el === value);
        if (product) {
            const res = commodityDictionary?.map((el) => {
                if (el.fieldName === item.fieldName) {
                    return {...el, value: product};
                } else {
                    return el;
                }
            });
            setCommodityDictionary(res);
        }
    };
    const saveShipment = (item, value) => {
        const check = type.find((el) => el.checked)?.label;
        switch(check) {
            case "Договор":
                return saveShipment_dogovor(item, value);
            case "Счет":
                return saveShipment_invoice(item, value);
            default:
                return;
        }
    };
    const saveShipment_invoice = (item, value) => {
        const invoice = value.split("от")[0].trim();
        const shipment = invoice_response?.invoiceDictionary.find((el) => el.doc_number === invoice);
        shipment && setShipment_grounds(shipment);
        if (invoice) {
            const res = contrAgents?.map((el) => {
                if (el.fieldName === item.fieldName) {
                    return {...el, value};
                } else {
                    return el;
                }
            });
            return setContrAgents(res);
        }
    };
    const saveShipment_dogovor = (item, value) => {
        const dogovor = value.split("от")[0].trim();
        const shipment = response?.dogovorDictionary.find((el) => el.doc_number === dogovor);
        shipment && setShipment_grounds(shipment);
        if (dogovor) {
            const res = contrAgents?.map((el) => {
                if (el.fieldName === item.fieldName) {
                    return {...el, value};
                } else {
                    return el;
                }
            });
            return setContrAgents(res);
        }
    };
    const addCar = (item, value) => {
        const car = item.currencies.find((el) => el.index === value);
        if (car) {
            const res = availableTransport?.map((el) => {
                if (el.fieldName === item.fieldName) {
                    return {...el, value: car.index};
                } else {
                    return el;
                }
            });
            return setAvailableTransport(res);
        }
        const ind = item.currencies.length;
        const pushItem = {index: ind, label: value};
        const res = availableTransport?.map((el) => {
            if (el.fieldName === item.fieldName) {
                return {...el, value: ind, currencies: [...el.currencies, pushItem]};
            } else {
                return el;
            }
        });
        setAvailableTransport(res);
    };
    const changeCommodityDictionary = (fieldName, parenValue) => {
        if (!Object.values(server_commodityDictionary).length) {
            return;
        }
        return changeCommodity(server_commodityDictionary, fieldName, parenValue, commodityDictionary, currency);
    };
    const changeContrAgents = (fieldName, parenValue) => {
        switch (fieldName) {
            case "rights_number":
                const number = response.ttnPersons[parenValue]?.rights_number;
                const date = response.ttnPersons[parenValue]?.rights_date;
                const showTextDate = `от ${date}`
                return number || date ? `${number} ${showTextDate}` : "";
            case "FIO":
                const last_name = response.ttnPersons[parenValue]?.last_name;
                const name = response.ttnPersons[parenValue]?.name;
                const second_name = response.ttnPersons[parenValue]?.second_name;
                return last_name || name || second_name ? `${last_name} ${name} ${second_name}` : "";
            default:
                return "";
        }
    };
    const changeAvailableTransport = (fieldName, parenValue) => {
        if (!response?.availableTransport) {
            return;
        }
        return changeTransport(response, fieldName, parenValue, availableTransport);
    };
    const expensiveCalculation = (items, changeFunction, setFunction, val) => {
        const controlsInput = items[val].controlInput;
        const parent = items.find((el) => el.select && (el.fieldName !== "allowed_person_id" && el.fieldName !== "handed_person_id" && el.fieldName !== "shipment_grounds"));
        if (parent.value !== "") {
            const controlItems = items.filter((el) => controlsInput.find((element) => el.fieldName === element));
            const changeItems = controlItems?.map((el) => {
                return {
                    ...el,
                    value: changeFunction(el.fieldName, parent.value),
                };
            });
            const resultObj = items?.map((el) => {
                const found = changeItems.find((element) => element.index === el.index);
                if (found) return found;
                return el;
            });
            setFunction(resultObj);
        }
    };
    useMemo(() => expensiveCalculation(availableTransport, changeAvailableTransport, setAvailableTransport, 0), [availableTransport[0].value]);
    useMemo(() => expensiveCalculation(contrAgents, changeContrAgents, setContrAgents, 4), [contrAgents[4].value]);
    useMemo(() => expensiveCalculation(commodityDictionary, changeCommodityDictionary, setCommodityDictionary, 0), [commodityDictionary[0].value]);

    useMemo(() => {
        if (commodityDictionary[4].value && commodityDictionary[6]?.value) {
            const sum = Number(commodityDictionary[4].value) + Number(commodityDictionary[6].value);
            const resObj = commodityDictionary?.map((element) => {
                if (element.fieldName === "product_cost_with_vat") {
                    return {
                        ...element,
                        value: sum.toFixed(2),
                    };
                }
                return element;
            });
            setCommodityDictionary(resObj);
        }
    }, [commodityDictionary[4]?.value, commodityDictionary[6]?.value]);
    useMemo(() => {
        if (commodityDictionary[4].value && commodityDictionary[5]?.value) {
            const sum = Number(commodityDictionary[4].value) * (Number(commodityDictionary[5].value) / 100);
            const resObj = commodityDictionary?.map((element) => {
                if (element.fieldName === "ttn_product_vat_sum") {
                    return {
                        ...element,
                        value: sum.toFixed(2),
                    };
                }
                return element;
            });
            setCommodityDictionary(resObj);
        }
    }, [commodityDictionary[4]?.value, commodityDictionary[5]?.value]);
    useMemo(() => {
        if (commodityDictionary[2].value && commodityDictionary[3].value) {
            const sum = Number(commodityDictionary[2].value) * Number(commodityDictionary[3].value);
            const resObj = commodityDictionary?.map((element) => {
                if (element.fieldName === "product_cost") {
                    return {
                        ...element,
                        value: sum.toFixed(2),
                    };
                }
                return element;
            });
            setCommodityDictionary(resObj);
        }
    }, [commodityDictionary[2].value, commodityDictionary[3].value]);

    useEffect(() => {
        if (!server_commodityDictionary?.commodityDictionary) {
            return;
        }
        const isAll_commodityDictionary = commodityDictionary.filter((el) => !el.value && el.require);
        if (!isAll_commodityDictionary?.length) {
            const item =
                Object.values(server_commodityDictionary?.commodityDictionary)
                    ?.find((el) => el.product_name === commodityDictionary[0].value)?.ttnProductQty || commodityDictionary[0].ttn_max_qty;
            const res = commodityDictionary?.map((element) => {
                return { fieldName: element.fieldName, value: element.value };
            });
            if (response?.hasVat === 0) {
                res.push({ fieldName: "product_vat", value: "" });
                res.push({ fieldName: "product_vat_sum", value: "" });
                res.push({ fieldName: "product_cost_with_vat", value: "" });
            }
            res.push({fieldName: "ttn_max_qty", value: item});
            res.push({fieldName: "ttn_commodity_position", value: productPosition_active});
            setIsShowAddCommodityDictionary(true);
            setCommodityDictionary_result(res);
            return;
        }
        const data = commodityDictionary_result.map((el) => {
            return {...el, value: ""};
        });
        setCommodityDictionary_result(data);
        setIsShowAddCommodityDictionary(false);
    }, [commodityDictionary, step]);
    useEffect(() => {
        const contrAgents_server = setResponseMapper(contrAgents, response?.ttnPersons, response?.dogovorDictionary);
        const availableTransport_server = setResponseMapper(availableTransport, response?.availableTransport);
        setAvailableTransport(availableTransport_server);
        setContrAgents(contrAgents_server);
        if (response?.defaultCurrencyCode) {
            const commodityDictionary_server = changeLabel(commodityDictionary, response.defaultCurrencyCode);
            setCommodityDictionary(commodityDictionary_server);
        }
        const transportOwner_server = response?.transportOwner;
        transportOwner_server && setTransportOwner(transportOwner_server);
    }, [response]);
    useMemo(() => {
        const currencyCode = response?.dogovorDictionary?.find((el) => el.doc_number === shipment_grounds?.doc_number)?.currency;
        const code = currencyCode ? getValueLabel(currencyCode) : response?.defaultCurrencyCode;
        setCurrency(code);
    }, [shipment_grounds, response]);
    useEffect(() => {
        const items = changeLabel(commodityDictionary, currency);
        setCommodityDictionary(items);
    }, [currency]);
    useEffect(() => {
        const commodityDictionary_server = setResponseMapper(commodityDictionary, server_commodityDictionary);
        setCommodityDictionary(commodityDictionary_server);
    }, [server_commodityDictionary]);
    useEffect(() => {
        if (step === "1") {
            setActiveFormItems(contrAgents);
        }
        if (step === "2") {
            !isTTN ? setActiveFormItems(commodityDictionary) : setActiveFormItems(availableTransport);
        }
        if (step === "3") {
            setActiveFormItems(commodityDictionary)
        }
    }, [step, availableTransport, commodityDictionary, contrAgents, isTTN]);
    useEffect(() => {
        const checkedTTN = tnOrTtn.filter((el) => el.checked)[0]?.label === "ТТН";
        setIsTTN(checkedTTN);
    }, [tnOrTtn]);
    useEffect(() => {
        if (response?.hasVat === 0) {
            const commodityDictionary_server = commodityDictionary.filter((el) => {
                return el.fieldName !== "product_vat" &&  el.fieldName !== "product_vat_sum" && el.fieldName !== "product_cost_with_vat"
            });
            setCommodityDictionary(commodityDictionary_server);
        }
    }, [step]);
    useEffect(() => {
        const isAll_contrAgents = contrAgents.filter((el) => el.value === "");
        const isAll_availableTransport = availableTransport.filter((el) => el.value === "" && el.require);
        const ttn_show = isTTN ? !isAll_availableTransport.length : true;
        const checkTnOrTtn = tnOrTtn.find((el) => el.checked);
        const isTemplateView = templateView.find((el) => el.checked);
        const isAll_commodityDictionary_result = commodityDictionary.filter((el) => el.value === "" && el.require);
        const isTransportOwner = transportOwner.find((el) => el.checked) || "";
        const isShowOwner = isTTN ? isTransportOwner : true;
        if (
            !isAll_contrAgents.length &&
            ttn_show &&
            checkTnOrTtn &&
            isTemplateView &&
            !isAll_commodityDictionary_result.length &&
            isShowOwner
            ) {
                const templateView_result = {fieldName: "invoiceOrientationKinds_id", value: Number(templateView.find((el) => el.checked)?.value)};

                const tnOrTtn_result = {fieldName: "tnOrTtn_id", value: Number(tnOrTtn.find((el) => el.checked)?.value)};

                const contrAgents_result = contrAgents?.map((element) => changeContrAgentsResult_custom(element));
                
                const availableTransport_result = isTTN
                    ? availableTransport?.map((element) => changeAvailableTransport_result_custom(element, availableTransport))
                    : [];

                const sample_id_obj = {fieldName: "sample_id", value: sample_id};

                const transport_owner_id = {fieldName: "transport_owner_id", value: isTransportOwner.value || ""};

                const res = [
                    ...contrAgents_result,
                    ...availableTransport_result,
                    tnOrTtn_result,
                    templateView_result,
                    ...commodityDictionary_result,
                    sample_id_obj,
                    transport_owner_id,
                ];
                setServerResult(res);
                setIsShowSample(true);
            } else {
                setIsShowSample(false);
            }
    }, [
        contrAgents,
        availableTransport,
        commodityDictionary,
        isTTN,
        tnOrTtn,
        templateView,
        commodityDictionary_result,
        transportOwner,
    ]);
    const changeTnOrTtn = (val) => {
        const changeItem = tnOrTtn?.map((el) => {
            if (el.value === val) {
                return {...el, checked: true};
            } else {
                return {...el, checked: false};
            }
        });
        setTnOrTtn(changeItem);
    };
    const changeTemplateView = (val) => {
        const changeItem = templateView?.map((el) => {
            if (el.value === val) {
                return {...el, checked: true};
            } else {
                return {...el, checked: false};
            }
        });
        setTemplateView(changeItem);
    };
    const changeType = (val) => {
        const changeItem = type?.map((el) => {
            if (el.value === val) {
                return {...el, checked: true};
            } else {
                return {...el, checked: false};
            }
        });
        setType(changeItem);
        if (changeItem[0].checked) {
            getInvoice_server();
        }
    };
    const [invoice_response, setInvoice_response] = useState([]);
    const getInvoice_server = async () => {
        const res = await getInvoice();
        if (res) {
            setInvoice_response(res);
            const contrAgents_server = setResponseMapper(contrAgents, response?.ttnPersons, res.invoiceDictionary);
            setContrAgents(contrAgents_server);
        }
    };
    const changeTransportOwner = (val) => {
        const changeItem = transportOwner?.map((el) => {
            if (el.value === Number(val)) {
                return {...el, checked: true};
            } else {
                return {...el, checked: false};
            }
        });
        setTransportOwner(changeItem);
    }
    const clickSample = async () => {
        await sendTemplate(serverResult);
    };
    const changeDate = (label, value) => {
        switch (label) {
            case "Дата отгрузки":
                return changeDate_custom(contrAgents, label, value, setContrAgents);
            default:
                return;
        }
    };
    const addCommodityDictionary = async () => {
        const res = await sendCommodityDictionary(commodityDictionary_result);
        if (res) {
            const newProductPosition = [
                ...productPosition,
                { index: productPosition_active, value: productPosition_active + 1, label: productPosition_active + 1 },
            ];
            const { arr: filtered } = newProductPosition.reduce((acc, elem) => {
                if (!acc.unique[elem.value]) {
                   acc.unique[elem.value] = true;
                   acc.arr.push(elem);
                }
                return acc;
            }, { arr: [], unique: {} });
            setProductPosition(filtered);
            setProductPosition_active(productPosition_active + 1);
        }
    };
    const deleteCommodityDictionary = async () => {
        const res = await deleteSection(productPosition_active);
        if (res.status && res.message !== "Удаление позиции для ттн не требуется") {
            setProductPosition_active(productPosition_active);
            const response = await showSection(productPosition_active);
            const resArray = [];
            for (let i = 0; i < response.data.sectionCount; i++) {
                resArray.push({ index: i, value: i + 1, label: i + 1 })
            }
            if (response?.status === 200) {
                const newCommodityDictionary = commodityDictionary?.map((element) => {
                    const value = response.data.columns[element.fieldName];
                    return {...element, value: value ? value : ""};
                });
                setCommodityDictionary(newCommodityDictionary);
            }
            setProductPosition(resArray);
        } else {
            if (res.message === "Удаление позиции для ттн не требуется") {
                setProductPosition_active(productPosition_active - 1);
                const response = await showSection(productPosition_active - 1);
                const resArray = [];
                for (let i = 0; i < response.data.sectionCount; i++) {
                    resArray.push({ index: i, value: i + 1, label: i + 1 })
                }
                if (response?.status === 200) {
                    const newCommodityDictionary = commodityDictionary?.map((element) => {
                        const value = response.data.columns[element.fieldName];
                        return {...element, value: value ? value : ""};
                    });
                    setCommodityDictionary(newCommodityDictionary);
                }
                setProductPosition(resArray);
            }
        }
    };
    const changeProductPosition_active = (value) => {
        setProductPosition_prev(productPosition_active);
        setProductPosition_active(value);
    };
    useEffect(() => {
        setSample_id(props.sample_id);
    }, [props.sample_id]);

    return (
        <div id="main-screen">
            {server_response &&
                <Box sx={{ justifyContent: 'center', width: '50%' }}>
                    <CircularProgress />
                </Box>
            }
            {!server_response &&
                <ActCard
                    changeStep={(step) => setStep(step)}
                    items={activeFormItems}
                    updatedItems={updatedItems}
                    addCar={addCar}
                    addProduct={addProduct}
                    tnOrTtn={tnOrTtn}
                    changeTnOrTtn={changeTnOrTtn}
                    templateView={templateView}
                    type={type}
                    changeType={changeType}
                    changeTemplateView={changeTemplateView}
                    resSteps={resSteps}
                    isShowSample={isShowSample}
                    clickSample={clickSample}
                    changeDate={changeDate}
                    isShowAddCommodityDictionary={isShowAddCommodityDictionary}
                    addCommodityDictionary={addCommodityDictionary}
                    productPosition={productPosition}
                    productPosition_active={productPosition_active}
                    changeProductPosition_active={changeProductPosition_active}
                    deleteCommodityDictionary={deleteCommodityDictionary}
                    getNewCurrencies={getNewCurrencies}
                    commodityDictionary={commodityDictionary}
                    saveShipment={saveShipment}
                    isTTN={isTTN}
                    transportOwner={transportOwner}
                    changeTransportOwner={changeTransportOwner}
                    showAddButton={props.showAddButton}
                    loader={loader}
                />
            }
        </div>
    );
}

export default MainScreen;