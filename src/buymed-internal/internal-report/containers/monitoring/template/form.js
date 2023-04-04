import {
	MyCard,
	MyCardActions,
	MyCardContent,
	MyCardHeader,
} from "@thuocsi/nextjs-components/my-card/my-card";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@material-ui/core";
import styles from "./template.module.css";
import { getReportClient } from "client/report";
import React from "react";
import { ResultConfiguration } from "./form-result";
import { FilterCondition } from "./form-condition";
import { useToast } from "@thuocsi/nextjs-components/toast/useToast";
import { APIStatus } from "lib/common";

/*
ID & Name of template
 */
function BasicInfo({ reportTemplateID, name, formObject, t }) {
	return (
		<Box>
			{reportTemplateID > 0 && (
				<Box className={styles.formControl + " " + styles.bottomSpacing}>
					<TextField
						id="reportTemplateID"
						name="reportTemplateID"
						label={t("monitoring:template.id")}
						style={{ width: 300 }}
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
						size="small"
						disabled={true}
						value={reportTemplateID}
					/>
				</Box>
			)}
			<Box>
				<TextField
					id="name"
					name="name"
					variant="outlined"
					size="small"
					label={t("monitoring:template.name")}
					InputLabelProps={{
						shrink: true,
					}}
					defaultValue={name || ""}
					inputRef={(e) => {
						formObject.register(e);
					}}
					className={styles.formControl}
					helperText={t(
						formObject.errors?.name?.message || `monitoring:template.name_helper`
					)}
					error={!!formObject.errors?.name?.message}
					onFocus={() => {
						formObject.clearErrors("name");
					}}
				/>
			</Box>
		</Box>
	);
}

export function getFormFunctions(templateData) {
	let {
		register,
		setValue,
		getValues,
		handleSubmit,
		setError,
		errors,
		control,
		formState,
		clearErrors,
	} = useForm({
		defaultValues: {
			reportTemplateID: templateData?.reportTemplateID || 0,
			eventCode: templateData?.eventCode || "",
			filter: templateData?.filter || {},
			uaFilter: templateData?.uaFilter || {},
			customerFilter: templateData?.customerFilter || {},
			classifiedKeys: templateData?.classifiedKeys || [],
			statisticKeys: templateData?.statisticKeys || [],
			customerKeys: templateData?.customerKeys || [],
		},
	});

	return {
		register,
		setValue,
		getValues,
		handleSubmit,
		setError,
		errors,
		control,
		formState,
		clearErrors,
	};
}

export function TemplateForm({ templateData, eventDefinitions, t, callback }) {
	let formObject = getFormFunctions(templateData);
	let [attributeList, setAttributeList] = React.useState(
		eventDefinitions
			.filter((ev) => {
				return ev.code === templateData?.eventCode;
			})
			.map((ev) => {
				return ev.filteredAttributes;
			})[0]
	);
	let { error, success } = useToast();

	let formCallback = {};
	let onSave = async function (formData) {
		let resultConfig = formCallback.getResultConfigurationValues();
		let submitData = {
			name: formData.name,
			eventCode: formData.eventCode?.value,
			classifiedKeys: resultConfig.classifiedKeys,
			statisticKeys: resultConfig.statisticKeys,
			customerKeys: resultConfig.customerKeys,
		};

		if (!submitData.name) {
			formObject.setError("name", {
				message: "monitoring:template.name_required",
			});
			error(t`monitoring:template.name_required`);
			return;
		}

		let uaMap = {
				0: "PLATFORM",
				1: "OS",
				2: "OS_VERSION",
				3: "CLIENT",
				4: "CLIENT_VERSION",
			},
			customerMap = {
				0: "LOCATION",
				1: "LEVEL",
				2: "ACTIVATED_DATE",
			};

		for (let key in formData) {
			if (!formData.hasOwnProperty(key)) {
				continue;
			}
			let value = formData[key];
			if (key.startsWith("condition") || key.startsWith("ua") || key.startsWith("customer")) {
				let p = key.split("-");
				switch (p[0]) {
					case "condition":
						if (!submitData.filter) {
							submitData.filter = {};
						}
						if (p[2] === "attribute" && !submitData.filter[value]) {
							submitData.filter[value] = {
								operator: formData["condition-" + p[1] + "-operator"] || "=",
								value: formData["condition-" + p[1] + "-value"] || "",
							};
						}
						break;
					case "ua":
						if (!submitData.uaFilter) {
							submitData.uaFilter = {};
						}
						if (p[2] === "value" && !submitData.uaFilter[uaMap[p[1]]]) {
							submitData.uaFilter[uaMap[p[1]]] = {
								operator: formData["ua-" + p[1] + "-operator"] || "=",
								value: value || "ALL",
							};
						}
						break;
					case "customer":
						if (!submitData.customerFilter) {
							submitData.customerFilter = {};
						}
						if (p[2] === "value" && !submitData.customerFilter[customerMap[p[1]]]) {
							submitData.customerFilter[customerMap[p[1]]] = {
								operator: formData["customer-" + p[1] + "-operator"] || "=",
								value: value || "ALL",
							};
						}
						break;
				}
			}
		}

		let client = getReportClient(),
			result;
		if (templateData) {
			// edit
			result = await client.updateTemplate(submitData);
		} else {
			// new
			result = await client.createNewTemplate(submitData);
		}
		if (result.status === APIStatus.OK) {
			success(t`common:action_success`);
			callback.submitSuccessfully();
		} else {
			error(t`common:action_error` + ` ${result.errorCode}: ${result.errorMessage}`);
		}
	};

	return (
		<Box>
			<MyCard>
				<form onSubmit={formObject.handleSubmit(onSave)}>
					<MyCardHeader title={t`monitoring:template.content`} />
					<MyCardContent>
						<BasicInfo
							reportTemplateID={templateData?.reportTemplateID || 0}
							name={templateData?.name || ""}
							t={t}
							formObject={formObject}
						/>
						<FilterCondition
							setAttributeList={setAttributeList}
							eventCode={templateData?.eventCode}
							filter={templateData?.filter}
							uaFilter={templateData?.uaFilter}
							customerFilter={templateData?.customerFilter}
							t={t}
							eventDefinitions={eventDefinitions}
							formObject={formObject}
						/>
						<ResultConfiguration
							classifiedKeys={templateData?.classifiedKeys}
							statisticKeys={templateData?.statisticKeys}
							customerKeys={templateData?.customerKeys}
							attributeList={attributeList}
							callback={formCallback}
							t={t}
							formFunctions={formObject}
						/>
						<Box className={styles.tipDescription}>
							<ul>
								<li>{t`monitoring:template_tip_1`}</li>
								<li>{t`monitoring:template_tip_2`}</li>
								<li>{t`monitoring:template_tip_3`}</li>
							</ul>
						</Box>
					</MyCardContent>
					<MyCardActions>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							disabled={formObject.formState.isSubmitting}
						>
							{t`common:actions.save`}
						</Button>
					</MyCardActions>
				</form>
			</MyCard>
		</Box>
	);
}
