import NumberFormat from 'react-number-format';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

export function NumberFormatCustom({
    inputRef,
    control,
    validate,
    name,
    errors,
    onValueChange }) {

    // split by 2 separator: [ & ] to get index/key
    // reasonInternals[0][processDays] => ["reasonInternals", "0", "processDays"]
    const separators = ['\\\[', '\\\]'];
    const properties = name.split(new RegExp(separators.join('|'), 'g')).filter((item) => {
        return item !== ""
    });
    // get errors["reasonInternals"]["0"]["processDays"] or undefined
    const correspondingError = properties.reduce((a, b) => {
        if (a !== undefined) return a[b];
        return undefined;
    }, errors);

    const hasError = typeof correspondingError !== 'undefined';

    return (
        <Controller
            control={control}
            name={name}
            rules={validate}
            render={({ ref, ...props }) => (
                <NumberFormat
                    inputRef={ref}
                    customInput={TextField}
                    error={hasError}
                    helperText={hasError && correspondingError?.message}
                    suffix={"đ"}
                    onKeyDown={(e) => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()}
                    onValueChange={onValueChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                    thousandSeparator={","}
                    isNumericString
                    {...props}
                />
            )}
        />
    );
}