import React from 'react'
import { Controller } from "react-hook-form";

import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel';
import { CustomTextField } from '../style/TextField';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    autocompleteOption: {
        "&:hover": {
            background: "rgba(0, 0, 0, 0.1)"
        }
    },
    input: {
        minWidth: "0 !important",
        paddingRight: "0 !important",
    },
    tagSizeSmall: {
        maxWidth: "70%",
    }
})

const CustomAutoComplete = ({
    id,
    noOnBlur,
    name,
    label,
    rule,
    control,
    data,
    placeholder,
    propsOnChange,
    getOptionSelected,
    selectedItem,
    readOnly,
    freeSolo,
    disabled,
    isLoading,
    handleOpen,
    handleClose,
    multiple,
    value,
    limitTags,
    onHighlightChange,
    ListboxComponent,
    renderOption,
    onInputChange,
    disabledFilterOption = null,
    handleScroll = null,
    zIndex = 100,
    className,
    marginTop,
    justShowName,
    minHeight
}) => {
    const classes = useStyles()
    return (
        <>
            {label &&
                <InputLabel htmlFor={id} style={{ color: 'black', fontWeight: '500', cursor: "pointer", fontSize: "16px", marginBottom: "5px"}}>
                    {label}
                </InputLabel>
            }
            <Controller
                name={name}
                control={control}
                defaultValue={selectedItem || []}
                rules={rule}
                render={({ onChange, value: value, error }) => {
                    return (
                        <Autocomplete
                            variant="outlined"
                            classes={{
                                option: classes.autocompleteOption,
                                input: classes.input,
                                tagSizeSmall: classes.tagSizeSmall,
                            }}
                            {...disabledFilterOption}
                            className={className}
                            style={{
                                height: "30px",
                            }}
                            multiple={!!multiple}
                            freeSolo={!!freeSolo}
                            id={id}
                            size={'small'}
                            disabled={!!disabled}
                            options={data}
                            readOnly={readOnly}
                            limitTags={limitTags}
                            onOpen={handleOpen || null}
                            onClose={handleClose || null}
                            onChange={(e, newValue) => {
                                propsOnChange(e, newValue)
                                onChange(newValue ? newValue : null);
                            }}
                            onInputChange={onInputChange || null}
                            onBlur={(e) => {
                                if (noOnBlur) {

                                }
                                else {
                                    propsOnChange(e, e.target.value)
                                    onChange(e);
                                }
                            }
                            }

                            loading={!!isLoading}
                            defaultValue={selectedItem || null}
                            value={selectedItem || value || null}
                            renderInput={(params) => <CustomTextField
                                variant="outlined"
                                style={{
                                    minHeight: minHeight ?? "40px",
                                    padding: "0 !important", 
                                    backgroundColor: "#fff",
                                    zIndex: zIndex,
                                    backgroundColor: "#fff",
                                }}
                                placeholder={placeholder}
                                {...params}
                                value={value}
                                error={!!error}
                                helperText={error ? error.message : null}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {isLoading ? <CircularProgress color="inherit" size={15} style={{ marginRight: '25px' }} /> : ""}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />}
                            renderOption={renderOption || null}
                            ListboxComponent={ListboxComponent || null}
                            ListboxProps={{
                                onScroll: handleScroll
                            }}
                            onHighlightChange={!isLoading && onHighlightChange ? onHighlightChange : null}
                            getOptionLabel={(option) => {
                                if (justShowName && option.name) {
                                    return `${option.name}`
                                } else if (option.name) {
                                    return `${option.name} (${option.id})`
                                } else {
                                    return `${option}`
                                }
                            }}
                            getOptionSelected={getOptionSelected}
                        />
                    )
                }}
            >
            </Controller>
        </>
    )
}

export default CustomAutoComplete