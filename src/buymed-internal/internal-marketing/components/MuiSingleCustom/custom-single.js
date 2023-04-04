
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useDebounce from "components/useDebounce";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

/**
 *  deboudce - OK
    clear all - OK
    load info - OK
    search - OK
    validate required/...
    autofus - PENDINH
    default vaue ? - OK
    translate - OK 
    reset error - PENDING
 * @param {*} param0 
 */

const MuiSingleAutocomplete = withStyles({
    tag: {
        height: 'auto',
        "& .MuiChip-label": {
            paddingBottom: '3px',
            paddingTop: '3px',
            whiteSpace: 'normal',
            overflowWrap: 'anywhere'
        }
    }
})(Autocomplete); // Fix CSS scroll page when pick long tag

const defValidate = (d, required, message) => {
    if (required && required == true) {
        if (typeof d === "undefined" || d === null || d?.length == 0) {
            return message ?? "Vui lòng nhập"
        }
    }
}

/**
 * @param {object} props
 * @param {string} props.name - field name
 * @param {any[]} props.options - autocomplete options
 * @param {string} props.label - label
 * @param {string} props.placeholder - placeholder
 * @param {boolean} props.required - required option
 * @param {string} props.message - error message
 * @param {Function} props.onFieldChange
 * @param {Function} props.onNotSearchFieldChange
 * @param {object} props.control
 * @param {boolean} props.disabled
 * @param {object} props.errors
 * @param {string} props.variant
 */
const MuiSingleAuto = ({
    name,
    options,
    label,
    placeholder,
    required,
    message,
    onFieldChange,
    onValueChange,
    control,
    disabled,
    variant = 'outlined',
    errors,
    removeErrors,
    validate,
    style,
    onFieldDisabled,
    noOptionsText = "Không tìm thấy kết quả phù hợp"
}) => {
    const hasError = typeof errors[`${name}`] !== 'undefined';
    let errMsg = null
    if (hasError) {
        errMsg = errors[`${name}`].message ?? message
    }

    if (typeof validate !== 'function') {
        validate = defValidate
    }

    if (typeof required === 'undefined') {
        required = false
    }

    if (typeof options === 'undefined' || options == null) {
        options = [{ label: "", value: "" }]
    }

    const [q, setQ] = useState("");
    const [open, setOpen] = useState(false);
    const [qOptions, setQOptions] = useState(options);
    const debouncedSearch = useDebounce(q?.trim(), 300);

    // tuan.tran
    useEffect(() => {
        setQOptions(options)
    }, [options])
    
    useEffect(() => {
        if (open == false) {
            setQOptions(options)
            return
        }

        if(debouncedSearch.length >0 && debouncedSearch !== q?.trim()){
            // TODO debouce val cache before will recall when use effect
            return
        }

        if (debouncedSearch && q?.trim().length > 0) {
            if (typeof onFieldChange !== 'undefined') {
                onFieldChange(debouncedSearch).then((results) => {
                    setQOptions(results)
                })
            }
        }
    }, [debouncedSearch, q, open]);
    return (
        <div>
            <Controller
                render={({ onChange, ...props }) => (
                    <MuiSingleAutocomplete
                        id={name}
                        options={qOptions}
                        filterSelectedOptions
                        getOptionLabel={(option) => option.label?.toString() || ""}
                        getOptionSelected={(option, val) => option.value === val.value}
                        getOptionDisabled={(option) => {
                            if(typeof onFieldDisabled === 'function'){
                                return onFieldDisabled(option)
                            }
                            return false
                        }}
                        noOptionsText={noOptionsText}
                        onOpen={()=> {setQ(''), setOpen(true)}}
                        onClose={()=> setOpen(false)}
                        disabled={disabled}
                        renderInput={(params) => (
                            <TextField
                                style={{ width: '100%' }}
                                {...params}
                                required={required}
                                label={label}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText={
                                    hasError ? errMsg : ""
                                }
                                error={!!hasError}
                                placeholder={placeholder}
                                variant={variant}
                                size="small"
                                onChange={(e) => {
                                    if (hasError && typeof removeErrors === 'function') {
                                        removeErrors(name)
                                    }

                                    setQ(e.target.value)}
                                }
                            />
                        )}
                        onChange={(e, data) => {
                            onChange(data);
                            if(typeof onValueChange === 'function'){
                                onValueChange(data);
                            }
                        }}
                        style={style}
                        {...props}
                    />
                )}
                name={name}
                control={control}
                onChange={([, { id }]) => id}
                rules={{
                    validate: (d) => validate(d, required, message)
                }}
            />
        </div>
    )
}

export default MuiSingleAuto;