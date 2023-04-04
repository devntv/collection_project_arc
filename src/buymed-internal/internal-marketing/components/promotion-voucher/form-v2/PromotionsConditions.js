import React, { useEffect, useState } from "react";
import { Grid, Typography, FormGroup, Button } from "@material-ui/core";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import { defaultCombinationCondition, defaultCondition, promotionRewardTypeLabel, promotionRewardTypes } from "../constant";
import RichTextField from "@thuocsi/nextjs-components/editor/rich-text-field";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import ConditionScope from "./ConditionScope";
import AddConditionModal from "./AddConditionModal";
import { uuidv4 } from "components/global";

export default function PromotionsConditions(props) {
    const { useForm,
        disabled,
        isEdit,
        listOrderConditions,
        setListOrderConditions,
        listCustomerConditions,
        setListCustomerConditions,
        listTagConditions,
        setListTagConditions,
        listProductConditions,
        setListProductConditions,
        listConditions,
        setListConditions,
        promotionType

    } = props;

    const {
        getValues,
        register,
        setValue,
        formState: { isSubmitting, isSubmitted }
    } = useForm;


    const [openDialog, setOpenDialog] = useState(false)


    const handleAddCondition = (type) => {
        setListConditions([...listConditions, {
            conditionType: type,
            combinationType: defaultCombinationCondition.or
        }])
    }

    const handleChangeCondition = (indexValue, combinationType) => {
        let newList = [...listConditions]
        newList[indexValue] = {
            ...listConditions[indexValue],
            combinationType
        }
        setListConditions(newList)
    }

    const handleRemoveCondition = (index, type) => {
        let newList = [...listConditions].filter((_, indexValue) => indexValue !== index)
        setListConditions(newList)

        switch (type) {
            case defaultCondition.customer:
                setListCustomerConditions([{
                    minTotalPrice: null,
                    minDayNoOrder: null,
                    maxOrderCount: null,
                    code: uuidv4()
                }])
                break;
            case defaultCondition.order:
                setListOrderConditions([{
                    minTotalPrice: null,
                    code: uuidv4()
                }])
                break;

            case defaultCondition.product:
                setListProductConditions([{
                    sellerCode: null,
                    productId: null,
                    minQuantity: 1,
                    minTotalPrice: 0,
                    code: uuidv4()
                }])
                break;

            case defaultCondition.productTag:
                setListTagConditions([{
                    sellerCode: null,
                    tagCode: null,
                    minQuantity: 1,
                    minTotalPrice: 0,
                    code: uuidv4()
                }])
                break;

            default:
                break;
        }

    }

    useEffect(() => {
        register("conditionDescription")
    }, [])

    return (
        <MyCard>
            <FormGroup style={{ width: "100%" }}>
                <MyCardHeader
                    small={true}
                    title="ĐIỀU KIỆN ÁP DỤNG"
                ></MyCardHeader>
                <MyCardContent style={{ width: "100%" }}>
                    <Grid spacing={2} container style={{ width: "100%" }}>

                        {
                            promotionType !== "ALL" && (
                                <React.Fragment>
                                    {/* <Typography style={{
                                        color: "#349633",
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                        marginLeft: "10px"
                                    }}>
                                        {promotionRewardTypeLabel[promotionType]}
                                    </Typography> */}

                                    {listConditions.length > 0 && listConditions?.map((item, index) => (
                                        <ConditionScope
                                            key={item.conditionType}
                                            disabled={disabled}
                                            listTagConditions={listTagConditions}
                                            setListTagConditions={setListTagConditions}
                                            isEdit={isEdit}
                                            listOrderConditions={listOrderConditions}
                                            setListOrderConditions={setListOrderConditions}
                                            listCustomerConditions={listCustomerConditions}
                                            setListCustomerConditions={setListCustomerConditions}
                                            listProductConditions={listProductConditions}
                                            setListProductConditions={setListProductConditions}
                                            listConditions={listConditions}
                                            setListConditions={setListConditions}
                                            conditionItem={item}
                                            conditionIndex={index}
                                            handleChangeCondition={handleChangeCondition}
                                            isSubmitting={isSubmitting}
                                            handleRemoveCondition={handleRemoveCondition}
                                            isSubmitted={isSubmitted}
                                            hookForm={useForm}
                                            promotionType={promotionType}
                                        />
                                    ))}


                                    {listConditions.length < 4 && (
                                        <Grid item xs={12}>
                                            <Button variant="outlined" color="primary" onClick={() => {
                                                setOpenDialog(true)
                                            }}>Thêm loại điều kiện</Button>
                                        </Grid>
                                    )}
                                </React.Fragment>
                            )
                        }

                        <Grid item md={6} xs={12}>
                            <Typography>
                                Mô tả điều kiện sử dụng
                            </Typography>

                            <RichTextField
                                name="conditionDescription"
                                getValue={getValues}
                                setValue={setValue}
                            />
                        </Grid>

                    </Grid>

                    <AddConditionModal
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        onExcute={(data) => {
                            handleAddCondition(data)
                            setOpenDialog(false)
                        }}
                        selectedConditionType={listConditions.map(item => item.conditionType)}
                    />
                </MyCardContent>
            </FormGroup>
        </MyCard>
    )
}
