import { APIClient } from "../lib/utils"
import { ChartData, ErrorJobs, MigratingJobs, Namespace, RunningJobs, Top10 } from "../pages/dashboard/data";

const URI = `/integration/video/v1/room`
class DashboardClient extends APIClient {
    constructor(ctx, data) {
        super(ctx,data)
    }
   
    async getJobs(params){
        const newParams = {...params};
        try {
            const q = JSON.parse(newParams.q)
            newParams.table = q.table
        } catch {
            delete newParams.q
        }
        newParams.limit = Number.parseInt(newParams.limit)
        newParams.offset = !params.page || params.page <= 1 ? 0 : (params.page - 1) * (params.limit || 5);
        newParams.getTotal = true;
        let data = [];
        if(newParams.table === 'running'){
            data = [...RunningJobs].map(item => ({...item}));
        }else if(newParams.table === 'migrating'){
            data = [...MigratingJobs].map(item => ({...item}));
        }else if(newParams.table === 'error'){
            data = [...ErrorJobs].map(item => ({...item}));
        }else if(newParams.table === 'namespace'){
            data = [...Namespace].map(item => ({...item}));
        }else if(newParams.table === 'top10'){
            data = [...Top10].map(item => ({...item}));
        }else if(newParams.table === 'chart'){
            data =  [...ChartData].map(item => ({...item}))
        }else{
            data = [...RunningJobs].map(item => ({...item}));
        }
        return {
            data,
            pagination: {
                page: Number.parseInt(newParams.page) || 1,
                limit: Number.parseInt(newParams.limit) || 5,
                total: data.length || 0,
            }

        }
    }

    async getNameList(){
        return RunningJobs.map(item => item.name);
    }

    async getSourceList(){
        return RunningJobs.map(item => item.source);
    }

}

export function getDashboardClient(ctx,data) {
    return new DashboardClient(ctx,data)
}