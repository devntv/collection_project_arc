import {
  doWithLoggedInUser,
  renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import SaleCampaignForm from "./form";

export async function getServerSideProps(ctx) {
  return await doWithLoggedInUser(ctx, (ctx) => {
    return;
  });
}

export default function NewPage(props) {
  return renderWithLoggedInUser(props, render);
}

function render(props) {
  return SaleCampaignForm(props, "create");
}
