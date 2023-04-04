import { APIClient } from "@thuocsi/nextjs-components/lib/utils";

const PREFIX = `/marketplace/product/v2`;

class IngredientClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  getIngredientByCodesClient(ingredientCodes) {
    return this.callFromClient("POST", `${PREFIX}/ingredient/list`, {
      ingredientCodes,
    });
  }

  getIngredientByIngredientCode(ingredientCode) {
    return this.call(
      "GET",
      `${PREFIX}/ingredient`,
      {
        q: JSON.stringify({ code: ingredientCode }),
      }
    )
  }
}

export function getIngredientClient(ctx, data) {
  return new IngredientClient(ctx, data);
}
