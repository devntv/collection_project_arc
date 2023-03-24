import { GET } from './Clients';

export async function getLogs3pl({ ctx, id = null, so = null }) {
  const url = '/integration/tpl-callback/v1/callback';
  const params = {
    adminId: id,
    so,
  };

  return GET({ url, ctx, params, isBasic: true, isAuth: false });
}

export async function getLogsWms({ ctx, id = null, so = null }) {
  const url = '/warehouse/picking/v1/pick-ticket';
  const params = {
    adminId: id,
    so,
  };

  return GET({ url, ctx, params, isBasic: true, isAuth: false });
}

export const getLogs = async ({ ctx, id = null, so = null }) => {
  const url = '/warehouse/core/v1/sale-orders';
  const params = {
    adminId: id,
    so,
  };
  return GET({ ctx, url, params, isBasic: true, isAuth: false });
};

export default { getLogs3pl, getLogsWms, getLogs };
