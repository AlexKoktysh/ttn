import { useState, useEffect } from "react";
import Form from "../../components/FormControl/form-control.js";
import "./act-card.scss";
import TextFieldControl from "../../components/TextfieldControl/text-field-control.js";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";

function ActCard(props) {
    const [step, setStep] = useState("1");
    const [localPosition, setLocalPosition] = useState(props.productPosition_active);

    const [entityType, setEntityType] = useState(props.tnOrTtn.find((el) => el.checked)?.value || "");
    const [templateView, setTemplateView] = useState(props.templateView.find((el) => el.checked)?.value || "");
    const [type, setType] = useState(props.type.find((el) => el.checked)?.value || "");
    const [transportOwner, setTransportOwner] = useState(props.transportOwner.find((el) => el.checked)?.value || "");
    const changeTnOrTtn = (val) => {
        setEntityType(val);
        props.changeTnOrTtn(val);
    };
    const changeTemplateView = (val) => {
        setTemplateView(val);
        props.changeTemplateView(val);
    };
    const changeType = (val) => {
        setType(val);
        props.changeType(val);
    };
    const changeTransportOwner = (val) => {
        setTransportOwner(val);
        props.changeTransportOwner(val);
    }; 
    useEffect(() => {
        setLocalPosition(props.productPosition_active);
    }, [props.productPosition_active]);

    const changeStep = (value) => {
        setStep(value);
    };
    const changePosition = (value) => {
        props.changeProductPosition_active(Number(value));
    };
    useEffect(() => {
        step && props.changeStep(step);
    });
    const change = (changeItem, value) => {
        props.updatedItems(changeItem, value);
    };
    const addCar = (item, value) => {
        props.addCar(item, value);
    };
    const addProduct = (item, value) => {
        props.addProduct(item, value);
    };
    const saveShipment = (item, value) => {
        props.saveShipment(item, value);
    };
    const changeDate = (label, value) => {
        props.changeDate(label, value);
    };
    const listItems = props.items?.map((item) =>
        !item.header
            ? <TextFieldControl
                commodityDictionary={props.commodityDictionary}
                item={item}
                key={item.index}
                change={change}
                addCar={addCar}
                addProduct={addProduct}
                saveShipment={saveShipment}
                changeDate={changeDate}
                getNewCurrencies={props.getNewCurrencies}
                loader={props.loader}
            />
            : <div key={item.index} className="header">{item.header}</div>
    );

    return (
        <div id="card">
            <div className="form">
                {step === "2" && !props.isTTN && <Form label="Позиция" value={localPosition} items={props.productPosition} change={changePosition} />}
                {step === "3" && props.isTTN && <Form label="Позиция" value={localPosition} items={props.productPosition} change={changePosition} />}
                {step === "1" && <Form label="Тип накладной" value={entityType} items={props.tnOrTtn} change={changeTnOrTtn} />}
                {step === "1" && <Form label="Вид шаблона" value={templateView} items={props.templateView} change={changeTemplateView} />}
                {step === "1" && <Form label="На основании" value={type} items={props.type} change={changeType} />}
                {step === "2" && props.isTTN
                    && <Form label="Транспорт" value={transportOwner} items={props.transportOwner} change={changeTransportOwner} />
                }
                {listItems}
                {step === "2" && !props.isTTN
                    &&
                    <Box sx={{ mb: 4, mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={props.addCommodityDictionary} disabled={!props.isShowAddCommodityDictionary} color="secondary" variant="contained">Добавить</Button>
                        <Button onClick={props.deleteCommodityDictionary} color="secondary" variant="contained">Удалить</Button>
                    </Box>
                }
                {step === "3" && props.isTTN
                    &&
                    <Box sx={{ mb: 4, mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={props.addCommodityDictionary} disabled={!props.isShowAddCommodityDictionary} color="secondary" variant="contained">Добавить</Button>
                        <Button onClick={props.deleteCommodityDictionary} color="secondary" variant="contained">Удалить</Button>
                    </Box>
                }
                <Form label="Заполняемая секция" value={step} items={props.resSteps} change={changeStep} />
                <Box sx={{ mb: 4, mt: 4 }}>
                    <Button onClick={props.clickSample} disabled={!props.isShowSample} color="secondary" variant="contained">Заполнить шаблон</Button>
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Button disabled={!props.isShowSample && !props.showAddButton} color="secondary" variant="contained">Создать</Button>
                </Box>
            </div>
        </div>
    );
}

export default ActCard;