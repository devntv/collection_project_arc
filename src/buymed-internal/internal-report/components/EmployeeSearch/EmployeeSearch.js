import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDebounce } from '../hook/useDebounce/useDebounce';
import { getListEmployee } from '../../services/ChatService';
import { APIStatus } from '../../lib/common';
import { styled } from '@material-ui/core/styles';
import ListBox from '../Element/ListBox';

export const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiFormHelperText-root': {
        marginLeft: '00px'
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.green,
        },
    }
}),);

const limitEmployee = 20;

const EmployeeSearch = ({
    onChange,
}) => {
    const [employeeList, setEmployeeList] = useState([]);
    const [listOption, setListOption] = useState([]);
    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [open, setOpen] = useState(false);
    const [offsetEmployee, setOffsetEmployee] = useState(0);
    const [isEmployeeLoading, setIsEmployeeLoading] = useState(false);

    const debouncedSearchTerm = useDebounce(search);

    const onInputChangeFunc = async (e, value) => {
        if (value != "") {
            setListOption([...employeeList])
        }
        else {
            setListOption([...employeeList.slice(0, limitEmployee)]);
        }
    }
    
    const onHighlightChangeFunc = async (e, option)=>{
        for (let i = listOption.length - 1; i > listOption.length - 5; i--){
            if (option && option.accountId == listOption[i].accountId){
                setListOption([...listOption, ...employeeList.slice(offsetEmployee + limitEmployee, offsetEmployee + 2*limitEmployee)]);
                setOffsetEmployee(prev => prev + 20);
                return;
            }
        }
    }

    const getEmployee = async (name = "") => {
        const res = await getListEmployee({
            params: {
                q: JSON.stringify({
                    type: "EMPLOYEE",
                    status: "ACTIVE",
                }),
                limit: 1000,
                offset: 0,
                search: (name || "").trim(),
            }
        });
        if (res.data.status === APIStatus.OK) {
            setEmployeeList(res.data.data);
        }
        else {
            setEmployeeList([]);
        }
    }

    useEffect(() => {
        if(open && (!employeeList || employeeList.length === 0)){
            setIsSearching(true);
            getEmployee(debouncedSearchTerm).then(() => {
                setIsSearching(false);
            })
        }
    }, [debouncedSearchTerm, open]);

    useEffect(() => {
        setListOption([...employeeList.slice(0, limitEmployee)])
    }, [employeeList])

    return (
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: "100%" }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
                setListOption([...employeeList.slice(0, limitEmployee)]);
                setOffsetEmployee(0);
            }}
            isOptionEqualToValue={(option, value) => option.accountId === value.accountId}
            getOptionLabel={(option) => `${option.accountId} - ${option.fullname || option.username}`}
            options={listOption}
            ListboxComponent={ListBox}
            loading={isSearching}
            size="small"
            onChange={onChange}
            onInputChange={(e) => {
                setSearch(e.target.value);
                onInputChangeFunc(e, e.target.value)
            }}
            onHighlightChange={(e, option)=>{
                onHighlightChangeFunc(e, option)
            }}
            renderInput={(params) => (
                <CustomTextField
                    {...params}
                    placeholder="Tim kiếm nhân viên"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {isSearching ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    )
}

export default EmployeeSearch