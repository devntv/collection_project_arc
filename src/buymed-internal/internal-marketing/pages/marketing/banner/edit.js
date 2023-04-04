import React from "react";
import {
  doWithLoggedInUser,
  renderWithLoggedInUser,
} from "@thuocsi/nextjs-components/lib/login";
import RenderForm, { loadData } from "../../../containers/banner/form";
import { getBannerClient } from "client/banner";
import AuthorizationScreen from "components/authorization-screen";

export async function loadBannerData(ctx) {
  let query = ctx.query;
  let bannerID = query.bannerID || "";

  let _client = getBannerClient(ctx, {});
  const bannerResult = await _client.getBannerByBannerId(bannerID);
  if (bannerResult.status !== "OK") {
    return {
      props: {
        status: bannerResult.status,
        isUpdate: true
      },
    };
  } else {
    return {
      props: {
        banner: bannerResult.data[0],
        isUpdate: true,
      },
    };
  }
}

export async function getServerSideProps(ctx) {
  return await doWithLoggedInUser(ctx, (ctx) => {
    return loadBannerData(ctx);
  });
}

export default function EditPage(props) {
  return renderWithLoggedInUser(props, render);
}

export function render(props) {
  return (
    <AuthorizationScreen>
      <RenderForm {...props} />
    </AuthorizationScreen>
  );
}
