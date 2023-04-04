import {
  doWithLoggedInUser,
  renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import { getSkuContractClient } from "client/skuContract";
import { getFileManagerClient } from "client/file-manager";
import SkuContractForm from "./form";

export async function getServerSideProps(ctx) {
  return await doWithLoggedInUser(ctx, async (ctx) => {
    return await loadDataBefore(ctx);
  });
}

export async function loadDataBefore(ctx) {
  const code = ctx.query.code;
  const returnObject = {
    props: {
      skuContractRes: null,
      uploadToken: null,
      code
    },
  };
  
  const skuContract = getSkuContractClient(ctx, {});
  const skuContractRes = await skuContract.getSkuContract({ code });

  if (skuContractRes && skuContractRes.status === "OK") {
    returnObject.props.skuContractRes = skuContractRes.data ? skuContractRes.data[0] : {};
  }

  const uploadTokenRes = await getFileManagerClient(ctx, {}).getToken()
  if (uploadTokenRes.status === "OK") returnObject.props.uploadToken = uploadTokenRes.message ?? null

  return returnObject;
}

export default function NewPage(props) {
  return renderWithLoggedInUser(props, render);
}

function render(props) {
  return SkuContractForm(props, "edit");
}
