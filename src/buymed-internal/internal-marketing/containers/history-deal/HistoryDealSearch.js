import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, TextField, InputAdornment, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import SearchIcon from "@material-ui/icons/Search";
import { getOrderClient } from "client/order";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import styles from "containers/history-deal/history-deal.module.css";

export function HistoryDealSearch(props) {
    let router = useRouter();
    const { register } = useForm();
    const [value, setValue] = useState("");
    const { error } = useToast();

    const changeURL = () => {
        router.push({ query: { dealCode: value } });
    };

    const handleKeyPress = (e) => {
        if (e.keyCode == 13) {
            handleSubmit();
        }
    };
    const handleChangeValue = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const orderClient = getOrderClient();
            if (!value || value.length === 0) throw new Error("Nhập mã deal");
            const orderResult = await orderClient.getOrderItemList({ q: JSON.stringify({ dealCode: value }), offset: 0, limit: 20 });
            if (orderResult.status!=="OK") throw new Error("Không tìm thấy thông tin");
            changeURL();
        } catch (err) {
            console.log(err)
            error(err?.message || "Có lỗi xảy ra");
        }
    };

    return (
        <Box style={{ marginBottom: 12 }}>
            <TextField
                placeholder={"Nhập mã deal"}
                variant="outlined"
                style={{ width: "100%" }}
                inputRef={register({})}
                onKeyDown={handleKeyPress}
                onChange={handleChangeValue}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleSubmit}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    className: styles.search,
                }}
            />
        </Box>
    );
}
