import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

function AutocompleteField(props) {
    const [label, setLabel] = useState("");
    const saveField = (event) => {
      props.saveField(event.currentTarget.innerText)
    };
    const setNewItem = (event) => {
      if (event.target.value !== "" && props.item.fieldName !== "shipment_grounds" && props.item.fieldName !== "product_name") {
        return props.saveField(event.target.value);
      }
    };
    useEffect(() => {
        switch (props.item.fieldName) {
            case "car_model":
              const car = props.item.value !== "" ? props.item.currencies.find((item) => item.label === props.item.value) : "";
              setLabel(car);
              break;
            case "car_number":
              const number = props.item.value !== "" ? props.item.currencies.find((item) => item.label === props.item.value) : "";
              setLabel(number);
              break;
            case "product_name":
              const obj = props.item.controlValue;
              const index = obj?.indexOf(props.item.value);
              const product = props.item.value !== "" && obj ? obj.find((el) => el === props.item.value) : "";
              if (!product) {
                  const results = {index: props.item?.index || "", label: props.item?.value || ""};
                  return setLabel(results);
              }
              const res = {index: index || "", label: product || ""};
              setLabel(res);
              break;
            case "shipment_grounds":
              const dogovor = props.item.value !== "" ? props.item.currencies.find((item) => item.label === props.item.value) : "";
              const value_dogovor = typeof dogovor !== "undefined" ? dogovor : "";
              setLabel(value_dogovor);
              break;
            case "received_person_last_name":
              const received_user = props.item.value !== "" ? props.item.currencies.find((item) => item.label === props.item.value) : "";
              const value_received_user = typeof received_user !== "undefined" ? received_user : "";
              setLabel(value_received_user);
              break;
            case "allowed_person_last_name":
              const allowed_user = props.item.value !== "" ? props.item.currencies.find((item) => item.label === props.item.value) : "";
              const value_allowed_user = typeof allowed_user !== "undefined" ? allowed_user : "";
              setLabel(value_allowed_user);
              break;
            case "handed_person_last_name":
              const handed_user = props.item.value !== "" ? props.item.currencies.find((item) => item.label === props.item.value) || "" : "";
              const value_handed_user = typeof handed_user !== "undefined" ? handed_user : "";
              setLabel(value_handed_user);
              break;
            default:
                break;
        }
    }, [props.item]);
    
    return (
        <Autocomplete
            id="free-solo-demo"
            size="small"
            freeSolo
            loading={props.loader}
            value={label}
            loadingText={"Загрузка"}
            onChange={saveField}
            options={props.item.currencies?.map((option) => option)}
            renderInput={(params) => {
                return <TextField multiline={true} maxRows={3} {...params} label={props.item.label} onBlur={setNewItem} />
            }}
            renderOption={(props, option, { inputValue }) => {
                const matches = match(option.label, inputValue, { insideWords: true });
                const parts = parse(option.label, matches);

                return (
                  <li {...props}>
                    <div>
                      {parts.map((part) => (
                        <span
                          key={part.text}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  </li>
                );
            }}
        />
    );
}

export default AutocompleteField;