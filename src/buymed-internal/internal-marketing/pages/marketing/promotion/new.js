import {
  doWithLoggedInUser,
  renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import { getAreaClient } from "client/area";
import { getCustomerClient } from "client/customer";
import { getMasterDataClient } from "client/master-data";
import { getScopeData } from "containers/voucher/VoucherScope";
import PromotionForm from "./form-v2";


export async function getServerSideProps(ctx) {
  return await doWithLoggedInUser(ctx,  async (ctx) => {
    return await loadDataBefore(ctx);
  })
}

export async function loadDataBefore(ctx) {
  let returnObject = {
    props: {
      levelOpts: [],
      areaOpts: []
    },
  };

  let { levelOpts, areaOpts } = await getScopeData(ctx)
  returnObject.props.levelOpts = levelOpts
  returnObject.props.areaOpts = areaOpts

  return returnObject;
}

export default function NewPage(props) {
  return renderWithLoggedInUser(props, render);
}

function render(props) {
  return PromotionForm(props, "create");
}
