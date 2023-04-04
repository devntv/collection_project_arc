import { Button, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import MuiSingleAuto from "@thuocsi/nextjs-components/muiauto/single";
import { useForm } from "react-hook-form";
import { getProductClient } from "client/product";

const ProductItem = (props) => {
	const [productOptions, setProductOptions] = useState([]);

	const {
		handleRemoveProduct,
		handleAddProduct,
		handleChangeProduct,
		index,
		dataProduct
	} = props;

	const { errors, control, setValue } = useForm({
		mode: "onChange",
		defaultValues: { productName: "" }
	})

	useEffect(() => {
		searchProduct();
	}, []);

	useEffect(() => {
		if(dataProduct) setValue("productName", dataProduct )
	}, [dataProduct])

	const searchProduct = async (q = "") => {
		const productClient = getProductClient();
		const productResp = await productClient.getProductListFromClient({
			search: q,
			limit: 10,
			offset: 0,
		});
		const arr = index !== 0 ? [] : [{ value: "all", label: "Tất cả" }]
		productResp?.data?.forEach?.(({ productID, name }) => {
			arr.push({
				label: productID + " - " + name,
				value: productID,
				productID: productID,
				productName: name,
			})
		})
		setProductOptions(arr);
	};

	return (
		<Grid spacing={2} xs item container>
			<Grid item xs>
				<Typography>Tên sản phẩm</Typography>
				<MuiSingleAuto
					name="productName"
					control={control}
					errors={errors}
					options={productOptions || []}
					placeholder="Chọn tên sản phẩm"
					onFieldChange={searchProduct}
					onValueChange={(selected) => {
						const flag = handleChangeProduct(index, selected?.value)
						if(!flag) setValue("productName", null)
					}}
				/>
				<br />
			</Grid>
			<Grid item xs container style={{ marginLeft: 8 }}>
				<Button onClick={() => handleRemoveProduct(index)} variant="contained" color="default" style={{ marginRight: 8, height: 'fit-content', marginTop: 25 }} >
					<RemoveRoundedIcon style={{ marginRight: 8 }} />
					Xóa
				</Button>
				<Button variant="contained" color="primary" onClick={handleAddProduct} style={{ height: 'fit-content', marginTop: 25 }}>
					<FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
					Thêm
				</Button>
			</Grid>
		</Grid>
	);
};

export default ProductItem;
