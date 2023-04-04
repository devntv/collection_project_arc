import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {Controller} from "react-hook-form";

const ReactHookFormSelect = ({
                                 name,
                                 label,
                                 defaultValue,
                                 children,
                                 control,
                                 setValue,
                                 onChange,
                                 ...props
                             }) => {
    const labelId = `${name}-label`;
    return (
        <FormControl {...props}  >
            <Controller name={name}
                        control={control}
                        render={({}) => (
                            <Select labelId={labelId}
                                    label={label}
                                    name={name}
                                    onChange={(e) => {
                                        if (onChange && typeof onChange === "function") {
                                            onChange(e.target.value)
                                        }
                                        setValue(name, e.target.value)
                                    }}
                                    defaultValue={defaultValue}
                            >
                                {children}
                            </Select>
                        )}
            >
            </Controller>
        </FormControl>
    );
};
export default ReactHookFormSelect;