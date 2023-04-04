import { APIClient } from "../lib/utils"

const URI = (type, action) => {
    return `/integration/sink-connector/v1/${type}/${action}`
}

class ConfigClient extends APIClient {
    constructor(ctx, data) {
        super(ctx,data)
    }
   
    async getDomain(){
        return ['MKP', 'CORE', 'SELLER', 'WH'];
    }

    async getDatabase(domain){
        const res = await this.call('post', URI('database', 'get'), {
            domainName: domain,
        });
        return res;
    }

    async getCollection(domain, database){
        const res = await this.call('post', URI('collection', 'get'), {
            domainName: domain,
            databaseName: database
        });
        return res;
    }

    async getField(domain, database, collection){
        const res = await this.call('post', URI('field', 'get'), {
            domainName: domain,
            databaseName: database,
            collectionName: collection,
        });
        return res;
    }

    async createConfig(data){
        const res = await this.call('post',URI('config', 'create'), data);
        return res
    }
    async updateConfig(data){
        const res = await this.call('post', URI('config', 'update'), data);
        return res;
    }

    async getConfigList(data){
        const res = await this.call('post', URI('config', 'list'), data);
        return res;
    }

    async getConfigDetail(data){
        const res = await this.call('post', URI('config', 'get'), data);
        return res;
    }

    async verifyConfig(data){
        const res = await this.call('post', URI('config', 'verify'), data);
        return res;
    }

    async startMigrate(data){
        const res = await this.call('post', URI('start-migrate', ''), data);
        return res;
    }

    async startUpdate(data){
        const res = await this.call('post', URI('start-update', ''), data);
        return res;
    }

    async configGenerate(domain, database, collection){
        const res = await this.call('post', URI('config', 'generate'), {
            domainName: domain,
            databaseName: database,
            collectionName: collection,
        });
        return res;
    }

}

export function getConfigClient(ctx,data) {
    return new ConfigClient(ctx,data)
}