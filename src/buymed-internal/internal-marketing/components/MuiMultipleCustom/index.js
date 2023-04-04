import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useDebounce from "@thuocsi/nextjs-components/lib/useDebounce";
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

const MuiMultipleAutocomplete = withStyles({
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

/**
 * @param {object} props
 * @param {string} props.name - field name
 * @param {any[]} props.options - autocomplete options
 * @param {string} props.label - label
 * @param {string} props.placeholder - placeholder
 * @param {boolean} props.required - required option
 * @param {string} props.message - error message
 * @param {Function} props.onFieldChange
 * @param {object} props.control
 * @param {boolean} props.disabled
 * @param {object} props.errors
 * @param {string} props.variant
 */
const MuiMultipleCustomAuto = ({
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
    disabledDelete = false,
    defaultValues = [],
    defaultValuesMap = [],
    errors }) => { // REACT HOOK FORM ERRORS 

    // TODO
    const hasError = typeof errors[`${name}`] !== 'undefined';
    const [q, setQ] = useState("");
    const [open, setOpen] = useState(false);
    const [qOptions, setQOptions] = useState(options);
    const debouncedSearch = useDebounce(q?.trim(), 400);

    if (typeof required === 'undefined') {
        required = false
    }

    // tuan.tran
    useEffect(() => {
        setQOptions(options)
    }, [options])

    useEffect(() => {
        if (open == false) {
            setQOptions(options)
            return
        }

        if (debouncedSearch.length > 0 && debouncedSearch !== q?.trim()) {
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
                    <MuiMultipleAutocomplete
                        id={name}
                        multiple
                        options={qOptions}
                        filterSelectedOptions
                        getOptionLabel={(option) => option.label?.toString()}
                        getOptionSelected={(option, val) => option.value === val.value}
                        noOptionsText="Không tìm thấy kết quả phù hợp"
                        onOpen={() => { setQ(''), setOpen(true) }}
                        onClose={() => setOpen(false)}
                        disabled={disabled}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                required={required}
                                label={label}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText={
                                    hasError ? message : ""
                                }
                                error={hasError}
                                placeholder={placeholder}
                                variant={variant}
                                size="small"
                                onChange={(e) => setQ(e.target.value)}
                            />
                        )}
                        onChange={(e, data, reason, detail) => {
                            if (disabledDelete) {
                                switch (reason) {
                                    case "remove-option":
                                        {
                                            if (detail?.option?.value === 'all') {
                                                onChange(defaultValues);
                                                if (typeof onValueChange === 'function') {
                                                    onValueChange(defaultValues);
                                                }
                                                break;
                                            }

                                            const index = defaultValuesMap.indexOf(detail?.option?.value) >= 0
                                            if (!index) {
                                                onChange(data);
                                                if (typeof onValueChange === 'function') {
                                                    onValueChange(data);
                                                }
                                            }
                                            break;

                                        }

                                    case "clear":
                                        onChange(defaultValues);
                                        if (typeof onValueChange === 'function') {
                                            onValueChange(defaultValues);
                                        }
                                        break;

                                    default:
                                        onChange(data);
                                        if (typeof onValueChange === 'function') {
                                            onValueChange(data);
                                        }
                                        break;
                                }

                            }

                            if (!disabledDelete) {
                                onChange(data);
                                if (typeof onValueChange === 'function') {
                                    onValueChange(data);
                                }
                            }
                        }}
                        {...props}
                    />
                )}
                name={name}
                control={control}
                onChange={([, { id }]) => id}
                rules={{
                    validate: (d) => {
                        if (required && required == true) {
                            if (typeof d === "undefined" || d?.length == 0) {
                                return "Vui lòng nhập"
                            }
                        }
                    }
                }}
            />
        </div>
    )
}

export default MuiMultipleCustomAuto;
