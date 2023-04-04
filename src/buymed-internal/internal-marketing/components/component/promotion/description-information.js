import React from "react";
import { FormGroup } from "@material-ui/core";
import { MyCard, MyCardContent, MyCardHeader } from "@thuocsi/nextjs-components/my-card/my-card";
import RichTextField from "@thuocsi/nextjs-components/editor/rich-text-field/index";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const DescriptionInformation = (props) => {

	const { useForm, status } = props;
	const { setValue, getValues } = useForm;

	return (
		<MyCard style={{ height: "calc(100% - 20px)" }}>
			<FormGroup style={{ width: "100%" }}>
				<MyCardHeader
					small={true}
					title="THÔNG TIN MÔ TẢ"
				></MyCardHeader>
				<MyCardContent>
					{status === "EXPIRED" ?
						<div style={{ pointerEvents: "none" }}>
							<RichTextField
								label="Nhập mô tả"
								name="description"
								getValue={getValues}
								setValue={setValue}
							/>
						</div>
						:
						<RichTextField
							label="Nhập mô tả"
							name="description"
							getValue={getValues}
							setValue={setValue}
						/>
					}
				</MyCardContent>
			</FormGroup>
		</MyCard>
	);
};

export default DescriptionInformation;
