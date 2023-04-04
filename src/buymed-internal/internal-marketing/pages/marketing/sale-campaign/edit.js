import {
  doWithLoggedInUser,
  renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import { getSaleCampaignClient } from "client/saleCampaign";
import SaleCampaignForm from "./form";

export async function getServerSideProps(ctx) {
  return await doWithLoggedInUser(ctx, async (ctx) => {
    return await loadDataBefore(ctx);
  });
}

export async function loadDataBefore(ctx) {
  const code = ctx.query.code;
  const returnObject = {
    props: {
      saleCampaignRes: null,
      campaignCode: code
    },
  };
  
  const saleCampaign = getSaleCampaignClient(ctx, {});
  const saleCampaignRes = await saleCampaign.getSaleCampaign({ campaignCode: code });

  if (saleCampaignRes && saleCampaignRes.status === "OK") {
    returnObject.props.saleCampaignRes = saleCampaignRes.data ? saleCampaignRes.data[0] : {};
  }

  returnObject.props.env = process.env.ENV

  return returnObject;
}

export default function NewPage(props) {
  return renderWithLoggedInUser(props, render);
}

function render(props) {
  return SaleCampaignForm(props, "edit");
}
