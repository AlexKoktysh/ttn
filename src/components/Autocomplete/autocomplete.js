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
      return props.saveField(event.target.value);
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
              setLabel(dogovor);
              break;
            case "received_person_last_name":
              const received_user = props.item.value !== "" ? props.item.currencies.find((item) => item.label === props.item.value) : "";
              setLabel(received_user);
              break;
            case "allowed_person_last_name":
              const allowed_user = props.item.value !== "" ? props.item.currencies.find((item) => item.label === props.item.value) : "";
              setLabel(allowed_user);
              break;
            case "handed_person_last_name":
              const handed_user = props.item.value !== "" ? props.item.currencies.find((item) => item.label === props.item.value) : "";
              setLabel(handed_user);
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
                return <TextField {...params} label={props.item.label} onChange={setNewItem} />
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