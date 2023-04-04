import React from "react";
import {
  doWithLoggedInUser,
  renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import RenderForm, { loadData } from "../../../containers/banner/form";
import AuthorizationScreen from "components/authorization-screen";

export async function getServerSideProps(ctx) {
  return await doWithLoggedInUser(ctx, (ctx) => {
    return loadData(ctx);
  });
}

export default function NewPage(props) {
  return renderWithLoggedInUser(props, render);
}

export function render(props) {
  return (
    <AuthorizationScreen>
      <RenderForm {...props} />
    </AuthorizationScreen>
  );
}
