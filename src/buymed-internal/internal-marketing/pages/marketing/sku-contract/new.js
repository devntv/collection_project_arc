import {
  doWithLoggedInUser,
  renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import SkuContractForm from "./form";
import { getFileManagerClient } from "client/file-manager";

export async function getServerSideProps(ctx) {
  return await doWithLoggedInUser(ctx, async(ctx) => {
    const returnObject = {
      props: {
        uploadToken: null,
      },
    };

    const uploadTokenRes = await getFileManagerClient(ctx, {}).getToken()
    if (uploadTokenRes.status === "OK") returnObject.props.uploadToken = uploadTokenRes.message ?? null

    return returnObject;
  });
}

export default function NewPage(props) {
  return renderWithLoggedInUser(props, render);
}

function render(props) {
  return SkuContractForm(props, "create");
}
