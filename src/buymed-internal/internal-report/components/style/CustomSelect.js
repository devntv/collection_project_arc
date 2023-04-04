import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import Select from 'react-select';


CustomSelect.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
};

function CustomSelect(props) {
    const {form, name, isMulti, optionData, placeholder, onMenuScrollToBottom, onInputChange} = props

    const customStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = '#00b46e';
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? color
                        : isFocused
                            ? '#00b46e'
                            : undefined,

                color: isDisabled
                    ? 'black'
                    : isSelected
                        ? 'white'
                        : isFocused
                            ? 'white'
                            : 'black',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? '#00b46e'
                            : '#00a45e'
                        : undefined,
                },
                padding: '15px',
            };
        },

        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition };
        },

        control: (provided, state) => ({
            ...provided,
            minHeight: '56px',
            marginTop: '15px',
            width: '100%',
            '&:hover': {
                border: '1px solid black'
            },
            boxShadow: "none",
            "&:focus-within": {
                border: '2px solid #00b46e',
            }
        }),

        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: '#00b46e',
            ':hover': {
                backgroundColor: '#00b46e',
                color: 'white',
            },
        })
    }

    return (
        <Controller
        name={name}
        control={form.control}
        render={({ field }) => 
        <Select
        {...field}
        isMulti={isMulti}
        name="accounts"
        options={optionData}
        styles={customStyles}
        placeholder={placeholder}
        onMenuScrollToBottom={onMenuScrollToBottom}
        onInputChange={onInputChange}
        />}
    />
    );
}

export default CustomSelect;