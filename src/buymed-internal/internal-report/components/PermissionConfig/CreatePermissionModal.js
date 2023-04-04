import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form';
import { useSnackbar } from "notistack";

import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stack from '@mui5/Stack/Stack';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import PermissionForm from './PermissionForm';
import EmployeeSearch from '../EmployeeSearch/EmployeeSearch';
import MyButton, { MY_BUTTON_COLOR, MY_BUTTON_TYPE } from '../Button/MyButton';


const CreatePermissionModal = ({
    open,
    handleClose,
    onSubmit,
}) => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, setError, register, setValue } = useForm();
    register("accountID");
    const handleChangeSearch = (e, value) => {
        if (value && value.accountId) {
            setValue("accountID", value.accountId)
        }
        else {
            setValue("accountID", null)
        }
    }

    const close = () => {
        setValue("accountID", null)
        handleClose();
    }

    const submit = async (data) => {
        if (data.accountID) {
            setLoading(true);
            await onSubmit(data)
            setLoading(false);
            return true;
        }
        else {
            enqueueSnackbar("Nhân viên không được bỏ trống!", {
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
                autoHideDuration: 2000,
                TransitionComponent: Fade,
                variant: "error",
            })
        }
        return false;
    }

    return (
        <Modal
            open={open}
            onClose={() => { close() }}
            aria-labelledby="update-permission"
            aria-describedby="update-permission"
            sx={{
                overflow: "auto",
                padding: "1rem",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Box
                sx={{
                    flex: "1 1 auto",
                    position: "relative",
                    width: "100%",
                    overflow: "auto",
                }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        close();
                    }
                }}
            >
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: 'column',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        overflow: "auto",
                        maxHeight: "100%",
                    }}
                    component="form"
                    onSubmit={handleSubmit((data) => {
                        submit(data).then((result) => {
                            if (result) {
                                close()
                            }
                        }).catch(() => {
                            close()
                        })
                    })}
                >
                    <Box
                        sx={{
                            backgroundColor: '#1a73b8',
                            padding: '1rem',
                            color: '#fff',
                            fontSize: "1.3rem"
                        }}
                    >
                        Thêm quyền
                    </Box>
                    <Box
                        sx={{
                            padding: "1rem"
                        }}
                    >
                        <Box
                            sx={{
                                marginBottom: "1rem"
                            }}
                        >
                            <Box
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "1rem"
                                }}
                            >
                                Nhân viên:
                            </Box>
                            <EmployeeSearch
                                onChange={handleChangeSearch}
                            ></EmployeeSearch>
                        </Box>
                        <PermissionForm control={control}></PermissionForm>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-end"
                            spacing={1}
                            sx={{
                                marginTop: "1rem"
                            }}
                        >
                            <MyButton
                                type={MY_BUTTON_TYPE.CONTAINED}
                                color={MY_BUTTON_COLOR.NORMAL}
                                disableElevation
                                sx={{
                                    color: "#000",
                                    fontSize: "1rem",
                                    color: '#676565',
                                    textTransform: 'none',
                                }}
                                onClick={handleClose}
                            >
                                Đóng
                            </MyButton>
                            <MyButton
                                type={MY_BUTTON_TYPE.CONTAINED}
                                color={MY_BUTTON_COLOR.SUCCESS}
                                disableElevation
                                isSubmitButton
                                disabled={loading}
                            >
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    {loading && (
                                        <CircularProgress size={15}
                                            sx={{
                                                color: "#fff"
                                            }}></CircularProgress>
                                    )}
                                    <span>Xác nhận</span>
                                </Stack>
                            </MyButton>
                        </Stack>
                    </Box>
                </Paper>
            </Box>

        </Modal>
    )
}

export default CreatePermissionModal