import { useEffect, useState } from 'react';
import { useFormContext } from "react-hook-form";
import { Grid, Typography } from '@material-ui/core';
import {
  MyCard,
  MyCardContent,
  MyCardHeader,
} from '@thuocsi/nextjs-components/my-card/my-card';
import MuiMultipleAuto from '@thuocsi/nextjs-components/muiauto/multiple';

import { getMasterDataClient } from 'client/master-data';
import { getCustomerClient } from 'client/customer';
import { getAreaClient } from 'client/area';


function DealScope(props) {

  const T_SELECT_ALL = "Chọn tất cả";
  const T_SELECT = "Chọn";
  const T_MESSAGE = "Vui lòng chọn";

  const [levelOpts, setLevelOpts] = useState([]);
  const [areaOpts, setAreaOpts] = useState([]);
  const [preOpts, setPreOpts] = useState({});

  const dealForm = useFormContext();

  const getOptions = (data) => {
    const itemAll = { value: 'ALL', label: T_SELECT_ALL };

    const options = data.map(x => ({ value: x.code, label: x.name}));
    options.unshift(itemAll);

    return options;
  }

  const setSelectedOptions = (name, options) => {
    let selected = dealForm.getValues(name) || [];
    if (!selected.length) {
      selected.push('ALL');
    }

    selected = selected.map(code => options.find((v) => v.value == code)) ?? [];
    dealForm.setValue(name, selected);
    setPreOptions(name, selected);
  }

  const setPreOptions = (name, options) => {
    const pre = preOpts || {};
    pre[name] = [...options];

    setPreOpts(pre);
  }

  useEffect(() => {
    (async () => {
      const resLevel = await getCustomerClient().getListLevel({ status: "ON" });
      if (resLevel?.status == 'OK') {
        const levelOptions = getOptions(resLevel.data);

        setLevelOpts(levelOptions);
        setSelectedOptions('customerLevelCodes', levelOptions);
      }

      const resArea = await getAreaClient().getListArea();
      const resProvince = await getMasterDataClient().getProvinceFromClient(0, 100, '', true);
      const data = (resArea?.data || []).concat(resProvince?.data || []);
      if (data) {
        const areaOptions = getOptions(data);

        setAreaOpts(areaOptions);
        setSelectedOptions('areaCodes', areaOptions);
      }
    })();
  }, []);

  const resetSkuAndUpdateOptions = (options) => {
    if (props.isUpdate) return

    const areaValues = options?.map(item => item.value) || []
    if (areaValues.length === 0 || areaValues?.find(item => (item === "ALL" || item === "00"))) {
      props.searchSkus("", false, "", true)
      return
    }
    props.searchSkus("", false, areaValues, true)
  }

  const checkSelectedAll = (name, selected, itemAll) => {
    let newSelected = {}
    if (selected.length > 1 && selected.find((item, index) => (item.value === "ALL" || item.value === "00") && index === 0)) {
      dealForm.setValue(name, selected.filter(item => item.value !== "ALL" && item.value !== "00"))
      newSelected = selected.filter(item => item.value !== "ALL" && item.value !== "00")
    } else if (selected.find((item, index) => (item.value === "ALL" || item.value === "00") && index !== 0)) {
      dealForm.setValue(name, [itemAll])
      newSelected = [itemAll]
    } else if (selected.length === 0) {
      dealForm.setValue(name, [itemAll])
      newSelected = [itemAll]
    }
    else {
      dealForm.setValue(name, selected)
      newSelected = selected
    }
    dealForm.clearErrors(name)
    return newSelected
  }

  const onValueChanged = (name, seletedOptions) => {
    const itemAll = { value: 'ALL', label: T_SELECT_ALL };
    let newSelected = checkSelectedAll(name, seletedOptions, itemAll)
    if (name === "areaCodes") {
      resetSkuAndUpdateOptions(newSelected)
    }
  }

  return (
    <MyCard>
      <MyCardHeader title="Phạm vi áp dụng" small />
      <MyCardContent>
        <Grid spacing={2} container>
          <Grid item xs={12} >
            <Typography>
              Đối tượng khách hàng áp dụng <span style={{ color: 'red' }}>*</span>
            </Typography>
            <MuiMultipleAuto
              options={levelOpts}
              name='customerLevelCodes'
              // required={true}
              placeholder={T_SELECT}
              register={dealForm.register}
              control={dealForm.control}
              errors={dealForm.errors}
              message={T_MESSAGE}
              onValueChange={(selected) => onValueChanged('customerLevelCodes', selected)}
            />
          </Grid>
          <Grid item xs={12} >
            <Typography>
              Khu vực áp dụng <span style={{ color: 'red' }}>*</span>
            </Typography>
            <MuiMultipleAuto
              options={areaOpts}
              name='areaCodes'
              // required={true}
              placeholder={T_SELECT}
              register={dealForm.register}
              control={dealForm.control}
              errors={dealForm.errors}
              message={T_MESSAGE}
              onValueChange={(selected) => onValueChanged('areaCodes', selected)}
            />
          </Grid>
        </Grid>
      </MyCardContent>
    </MyCard>
  )
}

export default DealScope;