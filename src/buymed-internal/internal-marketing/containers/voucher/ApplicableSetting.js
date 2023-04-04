import { TextField, Typography, Grid, MenuItem, FormControlLabel, Switch, Tooltip, FormHelperText } from '@material-ui/core'
import { MyCard, MyCardContent, MyCardHeader } from '@thuocsi/nextjs-components/my-card/my-card'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import { faExclamation, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useIsFirstRender } from 'utils/ReactFC';


const voucherTypes = [
    {
        label: "Public",
        value: "PUBLIC"
    },
    {
        label: "Private",
        value: "PRIVATE"
    }
]

export default function ApplicableSetting(props) {

    const {
        voucher,
        control,
        errors,
        setValue,
        getValues,
        register,
        isEdit,
        voucherType,
    } = props

    const firstRender = useIsFirstRender();
    const [active, setActive] = useState(getValues("status") ?? false);
    const [applyType, setApplyType] = useState(getValues("applyType") ?? "MANUAL");
    // const [isSkipNextVoucher, setIsSkipNextVoucher] = useState(getValues("isSkipNextVoucher") ?? false)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        if (isEdit) {
            setActive(voucher.status === "ACTIVE")
            setApplyType(voucher.applyType)
        }
    }, [voucher])

    useEffect(() => {
        if (!firstRender) {
            if (!getValues("applyType")) register("applyType")
            setValue("applyType", "MANUAL")
            setApplyType("MANUAL")
        }
    }, [voucherType])


    return (
        <MyCard>
            <MyCardHeader title="Cài đặt áp dụng" style={{
                textTransform: "uppercase"
            }} small />

            <MyCardContent>
                <Grid container justifyContent='space-between'>

                    <Grid item xs={12} sm={12} container spacing={3}>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Typography>
                                Tổng số mã toàn hệ thống
                                <Tooltip title="Nhập = 0 là không giới hạn">
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faExclamationCircle}
                                            style={{ marginLeft: "6px" }}
                                        />
                                    </span>
                                </Tooltip>
                            </Typography>
                            <TextField
                                id="maxUsage"
                                name="maxUsage"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    shrink: true,
                                }}
                                helperText={errors.maxUsage?.message}
                                error={!!errors.maxUsage}
                                defaultValue={0}
                                inputProps={{ min: 0 }}
                                onKeyDown={(e) => ['e', 'E', '+', '-', ',', '.'].includes(e.key) && e.preventDefault()}
                                placeholder="Tổng số lần sử dụng toàn hệ thống"
                                inputRef={register({
                                    validate: (value) => {
                                        if (isEdit && Number(value) > 0 && Number(value) <= voucher.usageTotal) {
                                            return "Tổng số mã toàn hệ thống phải lớn hơn tổng số mã đã sử dụng"
                                        }
                                        return null
                                    },
                                    required: "Tổng số lần sử dụng toàn hệ thống không được để trống",
                                    min: {
                                        value: 0,
                                        message: "Tổng số lần sử dụng toàn hệ thống không được âm"
                                    },
                                    max: {
                                        value: 999999,
                                        message: "Tổng số lần sử dụng không được vượt quá 999999"
                                    },
                                })}
                                required
                                fullWidth
                            />

                        </Grid>


                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Typography>
                                Loại mã <span style={{ color: "red" }}>*</span>
                            </Typography>

                            <Controller
                                control={control}
                                name="type"
                                as={
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        InputProps={{
                                            shrink: true,
                                        }}
                                        error={!!errors.type}
                                        helperText={errors.type?.message}
                                        fullWidth
                                        select
                                    >
                                        {Object.values(voucherTypes).map((item) => (
                                            <MenuItem key={item.value}
                                                value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </TextField>
                                }
                            />
                        </Grid>


                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Typography>
                                Số lần sử dụng/Khách hàng
                                <Tooltip title="Nhập = 0 là không giới hạn">
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faExclamationCircle}
                                            style={{ marginLeft: "6px" }}
                                        />
                                    </span>
                                </Tooltip>
                            </Typography>

                            <TextField
                                id="maxUsagePerCustomer"
                                name="maxUsagePerCustomer"
                                type="number"
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    shrink: true,
                                }}
                                helperText={errors.maxUsagePerCustomer?.message}
                                error={!!errors.maxUsagePerCustomer}
                                defaultValue={0}
                                inputProps={{ min: 0 }}
                                placeholder="Số lần sử dụng/Khách hàng"
                                onKeyDown={(e) => ['e', 'E', '+', '-', ',', '.'].includes(e.key) && e.preventDefault()}
                                inputRef={register({
                                    required: "Số lần sử dụng/Khách hàng không được để trống",
                                    min: {
                                        value: 0,
                                        message: "Số lần sử dụng/Khách hàng không được âm"
                                    },
                                    max: {
                                        value: 999999,
                                        message: "Số lần sử dụng/Khách hàng không được vượt quá 999999"
                                    }
                                })}
                                required
                                fullWidth
                            />
                        </Grid>

                        {getValues("applyType") === "AUTO" ? (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Typography>
                                    Số điểm ưu tiên
                                </Typography>

                                <TextField
                                    id="priority"
                                    name="priority"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        shrink: true,
                                    }}
                                    helperText={errors.priority?.message}
                                    error={!!errors.priority}
                                    onKeyDown={(e) => ['e', 'E', '+', '-', ',', '.'].includes(e.key) && e.preventDefault()}
                                    placeholder="Nhập số điểm ưu tiên"
                                    inputRef={register({
                                        // required: "Vui lòng nhập số điểm ưu tiên",
                                        min: {
                                            value: 1,
                                            message: "Số điểm ưu tiên tối thiểu là 1"
                                        },
                                        max: {
                                            value: 1000000000,
                                            message: "Số điểm ưu tiên phải nhỏ hơn hoặc bằng 1,000,000,000",
                                        }
                                    })}
                                    // required
                                    fullWidth
                                />
                            </Grid>
                        ) : (<Grid item xs={12} sm={6} md={4} lg={3} />)}

                        {isEdit && (
                            <Grid item xs={12} sm={6} md={4} lg={3}>

                                <Typography>
                                    Tổng số mã đã sử dụng
                                </Typography>

                                <TextField
                                    id="usageTotal"
                                    name="usageTotal"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        shrink: true,
                                        readOnly: true
                                    }}
                                    defaultValue={0}
                                    inputRef={register({})}
                                    fullWidth
                                />
                            </Grid>
                        )}


                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <div style={{ marginLeft: "5px" }}>
                                <Typography>
                                    Tự động áp dụng
                                    <Tooltip title="Khách hàng không cần thao tác để áp dụng mã giảm giá">
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faExclamationCircle}
                                                style={{ marginLeft: "6px" }}
                                            />
                                        </span>
                                    </Tooltip>
                                </Typography>

                                <Controller
                                    name="applyType"
                                    defaultValue={applyType === "AUTO"}
                                    control={control}
                                    render={(props) => (
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    color="primary"
                                                    checked={applyType === "AUTO"}
                                                    onChange={() => {
                                                        if (!getValues("applyType")) register("applyType")
                                                        setValue("applyType", applyType === 'AUTO' ? "MANUAL" : "AUTO")
                                                        setApplyType(applyType === 'AUTO' ? "MANUAL" : "AUTO")
                                                    }}
                                                    name="gilad"
                                                />
                                            }
                                            {...props}
                                        />
                                    )}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={12} sm={6} md={4} lg={3} style={{
                            display: "flex",
                            justifyContent: "flex-start"
                        }}>
                            <div>
                                <Typography>
                                    Trạng thái
                                </Typography>

                                <Controller
                                    name="status"
                                    defaultValue={active}
                                    control={control}
                                    render={(props) => (
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    color="primary"
                                                    checked={active}
                                                    onChange={() => {
                                                        setValue("status", !active)
                                                        setActive(!active)
                                                    }}
                                                    name="gilad"
                                                />
                                            }
                                            label={getValues("status") ? "Đang hoạt động" : "Ngừng hoạt động"}
                                        />
                                    )}
                                />
                            </div>
                        </Grid>

                    </Grid>


                    {/* <Grid item sm={3} container spacing={3} style={{ background: "#f6f6f6", borderRadius: "1rem" }}
                        direction={"column"}>
                        <div style={{ padding: "1rem 2rem" }}>

                            <p>
                                <strong>Số điểm ưu tiên</strong>: Mã với số điểm cao nhất sẽ được áp dụng đầu tiên
                            </p>

                            <p>
                                <strong>Loại bỏ áp dụng với mã kế tiếp</strong>: Không tính toán với mã kế tiếp
                            </p>

                            <p>
                                <strong>Tự động apply</strong>: Khách hàng không cần thao tác để áp dụng mã giảm giá
                            </p>

                            <p>
                                <strong>Số lần tối đa tính phần thưởng trên 1 đơn</strong>: Ví dụ:
                                <li>Mã giảm giá: Mua 3A giảm 10k</li>
                                <li>Số lần áp dụng mã tối đa là 1 {'->'} Khách mua 6A được giảm 10k</li>
                                <li>Số lần áp dụng mã tối đa là 2 {'->'} Khách mua 6A được giảm 20k. Trường hợp khách mua 10A {'->'} giảm tối đa vẫn là 20k</li>
                            </p>

                        </div>

                    </Grid> */}

                    {/* <Grid item xs={12} sm={6} md={4} style={{
                        display: "flex",
                        justifyContent: "flex-start"
                    }}>
                        <div style={{ marginLeft: "5px" }}>
                            <Typography>
                                Loại bỏ áp dụng với mã kế tiếp
                            </Typography>

                            <Controller
                                name="isSkipNextVoucher"
                                defaultValue={isSkipNextVoucher}
                                control={control}
                                render={(props) => (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="primary"
                                                checked={isSkipNextVoucher}
                                                onChange={() => {
                                                    setValue("isSkipNextVoucher", !isSkipNextVoucher)
                                                    setIsSkipNextVoucher(!isSkipNextVoucher)
                                                }}
                                                name="gilad"
                                            />
                                        }
                                    />
                                )}
                            />
                        </div>
                    </Grid> */}


                    {/* <Grid item xs={12} sm={6} md={4}>
                        <Typography>
                            Số lần tối đa tính phần thưởng trên 1 đơn
                        </Typography>

                        <TextField
                            id="maxAutoApplyCount"
                            name="maxAutoApplyCount"
                            type="number"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                shrink: true,
                                readOnly: applyType !== "AUTO"
                            }}
                            helperText={errors.maxAutoApplyCount?.message}
                            error={!!errors.maxAutoApplyCount}
                            defaultValue={0}
                            inputProps={{ min: 0 }}
                            placeholder="Số lần tối đa tính phần thưởng trên 1 đơn"
                            onKeyDown={(e) => ['e', 'E', '+', '-', ',', '.'].includes(e.key) && e.preventDefault()}
                            inputRef={register({
                                required: "Số lần không được để trống",
                                min: {
                                    value: 1,
                                    message: "Số lần phải lớn hơn hoặc bằng 1"
                                },
                                max: {
                                    value: 999999,
                                    message: "Số lần không được vượt quá 999999"
                                }
                            })}
                            required
                            fullWidth
                        />
                        <FormHelperText>Chỉ áp dụng với những mã tự động apply</FormHelperText>
                    </Grid> */}

                </Grid>

            </MyCardContent>
        </MyCard>
    )
}
