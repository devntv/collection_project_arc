import React from "react";

import { ShowcaseState } from "./src/views/prismic/showcaseState.js";

export const wrapRootElement = ({ element }) => {
  return <ShowcaseState>{element}</ShowcaseState>;
};
