import { APIClient } from '@thuocsi/nextjs-components/lib/utils';
const URI_WAREHOUSE = '/warehouse/inventory/v1';

class WarehouseClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getInventorySku(data) {
        return this.call('GET', `${URI_WAREHOUSE}/sku`, data);
    }
}

export function getWarehouseClient(ctx, data) {
    return new WarehouseClient(ctx, data);
}
