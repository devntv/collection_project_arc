import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form';

import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stack from '@mui5/Stack/Stack';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import PermissionForm from './PermissionForm';
import MyButton, { MY_BUTTON_COLOR, MY_BUTTON_TYPE } from '../Button/MyButton';

const UpdatePermissionModal = ({
    open,
    handleClose,
    user,
    onSubmit,
}) => {
    const { handleSubmit, control, setError, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (user) {
            setValue("permissions", [...user.permissions])
        }
    }, [user, setValue])

    return (
        <Modal
            open={open}
            onClose={() => { handleClose() }}
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
                        setLoading(true);
                        onSubmit(data).then(() => {
                            setLoading(false);
                            handleClose()
                        }).catch(() => {
                            handleClose()
                        })
                    })}
                >
                    <Box
                        sx={{
                            backgroundColor: '#1a73b8',
                            padding: '1rem',
                            color: '#fff',
                            fontSize: "1.2rem"
                        }}
                    >
                        Cập nhật quyền: {user && ((user.fullname) ? `${user.accountID} - ${user.fullname}` : user.accountID)}
                    </Box>
                    <Box
                        sx={{
                            padding: "1rem"
                        }}
                    >
                        <PermissionForm user={user} control={control}></PermissionForm>
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

export default UpdatePermissionModal