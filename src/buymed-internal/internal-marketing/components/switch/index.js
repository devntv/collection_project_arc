import {FormControlLabel} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import React, {useEffect, useState} from "react";

export const FormSwitch = ({name, value, register, control, defaultValue,setValue,labelSuccess,labelError,getValue}) => {
    const [label,setLabel] = useState(defaultValue === true? labelSuccess : labelError)
    return (
        <FormControlLabel
            control={<Switch defaultChecked={defaultValue} color={"primary"} onChange={(event, checked) => {
                setValue(name,checked)
                if (checked) {
                    setLabel(labelSuccess)
                }else {
                    setLabel(labelError)
                }
            }} />}
            name={name}
            inputRef={register}
            label={label}
        />
    );
};
