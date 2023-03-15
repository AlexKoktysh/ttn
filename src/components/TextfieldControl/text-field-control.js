import { useState, useEffect } from "react";
import { FormControl, TextField } from "@mui/material";
import DatePickerControl from "../../components/DatePicker/date-picker.js";
import "./text-field-control.scss";
import Autocomplete from "../Autocomplete/autocomplete.js";

function TextFieldControl(props) {
    const [value, setValue] = useState(props?.item?.value || "");

    const changeInput = (event) => {
        let val = event.target.value;
        if (props.item.fieldName === "product_qty") {
            const max_qty = props.commodityDictionary[0]?.currencies?.find((el) => el.label === props.commodityDictionary[0].value)?.ttn_max_qty;
            val = Number(event.target.value) <= Number(max_qty) ? event.target.value : max_qty;
        }
        setValue(val);
        props.change(props.item, val);
    };
    const changeDate = (label, value) => {
        setValue(value);
        props.changeDate(label, value);
    };
    const saveField = (value) => {
        props.saveField(props.item, value)
    };
    useEffect(() => {
        setValue(props?.item?.value || "");
    }, [props?.item?.value]);

    return (
        <FormControl className="field">
            {props?.item && props.item.date && <DatePickerControl item={props.item} change={changeDate} />}
            {props?.item && props.item.autocomplete &&
                <Autocomplete
                    item={props.item}
                    key={props.item.index}
                    saveField={saveField}
                    loader={props.loader}
                />
            }
            {props?.item && !props.item.date && !props.item.autocomplete &&
                <TextField
                    label={props.item.label}
                    select={props.item.select}
                    key={props.item.index}
                    size="small"
                    onChange={changeInput}
                    value={value}
                    multiline={true}
                    maxRows={3}
                    disabled={props.item.disabled}
                ></TextField>
            }
        </FormControl>
    );
}

export default TextFieldControl;