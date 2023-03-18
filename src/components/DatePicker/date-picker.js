import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment/moment.js";

function DatePickerControl(props) {
    const setPropsDate = (value) => {
        const propsDate = value.includes(".");
        return propsDate ? moment(value, 'DD.MM.YYYY') : moment(value, 'YYYY-MM-DD')
    };
    const defaultDate = props.item.value ? setPropsDate(props.item.value).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
    const getData = (value) => {
        if (props.item.fieldName === "rights_date") {
            return props.item.value;
        }
        return value;
    };
    const [date, setDate] = useState(getData(defaultDate));
    const change = (value) => {
        const date = moment(value.$d).format('YYYY-MM-DD');
        setDate(date);
        props.change(props.item.label, date);
    };
    const setError = () => {
        if (props.item.fieldName === "rights_date") {
            const el = document.getElementsByClassName("MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-disabled Mui-error MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeSmall MuiInputLabel-outlined");
            if (el && el[0] && el[0]?.style) {
                el[0].style.color = "rgba(0, 0, 0, 0.38)";
            }
        }
    };
    useEffect(() => {
        setDate(getData(defaultDate));
        props.change(props.item.label, defaultDate);
    }, [defaultDate]);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                inputFormat="DD.MM.YYYY"
                disableFuture={true}
                value={date}
                onError={setError}
                label={props.item.label}
                onChange={(newValue) => change(newValue)}
                renderInput={(params) => <TextField {...params} size="small" />}
                disabled={props.item.disabled}
            />
        </LocalizationProvider>
    );
}

export default DatePickerControl;