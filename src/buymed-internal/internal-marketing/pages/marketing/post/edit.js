import { doWithLoggedInUser, renderWithLoggedInUser } from '@thuocsi/nextjs-components/lib/login';
import { getPostClient } from 'client/post';
import { getProductClient } from 'client/product';
import { getRegionClient } from 'client/region';
import AuthorizationScreen from 'components/authorization-screen';
import { nationWideOption, PagePostData } from './new';

export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, async (ctx) => {
        return loadPostData(ctx);
    });
}

export async function loadPostData(ctx) {
    let regionList = [];
    let provinceList = [];

    const regionClient = getRegionClient(ctx, {});
    const [resRegion, resProvince] = await Promise.all([regionClient.getListRegion(0, 1000), regionClient.getListProvince()]);
    if (resRegion.status === 'OK' && resRegion.data && resRegion.data.length > 0) {
        regionList = resRegion.data.map((region) => {
            return {
                label: region.name,
                value: region.regionID.toString(),
                regionID: region.regionID,
                code: region.code,
                provinceCodes: region.provinceCodes
            };
        });
    }

    if (resProvince.status === 'OK' && resProvince.data && resProvince.data.length > 0) {
        provinceList = resProvince.data
            .map((province) => {
                return {
                    label: province.name,
                    value: province.code.toString(),
                    code: province.code,
                    regionCode: province.regionCode
                };
            })
            .sort((a, b) => a.label > b.label);
    }

    const products = [];
    const productClient = getProductClient(ctx, {});
    const productRes = await productClient.getProductFromNextJS(0, 1);
    if (productRes.status === 'OK') {
        const promises = [];
        const limit = 100;
        const total = parseInt(productRes.total);
        for (let i = 0; i < total; i += limit) {
            promises.push(productClient.getProductFromNextJS(i, limit));
        }
        const responses = await Promise.all(promises);
        for (let i = 0; i < responses.length; i++) {
            if (responses[i].status === 'OK') {
                products.push(...responses[i].data);
            }
        }
    }

    const _client = getPostClient(ctx, {});
    const id = ctx.query.id;
    const postRes = await _client.getPostById(id);
    const post = postRes.data[0];
    const locationInPost = post.locationCodes.map((code) => {
        if (code === nationWideOption.code) {
            return nationWideOption;
        }
        const result = provinceList.filter((province) => province.code === code);
        if (result && result.length > 0) {
            return result[0];
        }
    });

    let skuList = [];
    const response = await productClient.getSkuByLocation({ limit: 1, locationCodes: post.locationCodes });
    if (response.status === 'OK') {
        const promises = [];
        const total = parseInt(response.total);
        for (let i = 0; i < total; i += 1000) {
            promises.push(productClient.getSkuByLocation({ offset: i, locationCodes: post.locationCodes }));
        }
        const responses = await Promise.all([...promises]);
        for (let i = 0; i < responses.length; i++) {
            if (responses[i].status === 'OK') {
                skuList.push(...responses[i].data);
            }
        }
    }

    for (let i = 0; i < skuList.length; i++) {
        const product = products.filter((product) => product.code === skuList[i].productCode);
        if (product && product.length > 0) {
            skuList[i].name = product[0].name;
            skuList[i].label = `${skuList[i].code} - ${skuList[i].name}`;
            skuList[i].value = skuList[i].code;
        }
    }
    const data = {
        props: {
            regionList,
            provinceList,
            products,
            post,
            locationInPost,
            skuList,
            isNew: false,
            isReadyOnly: false
        },
    };
    return data;
}

export function render(props){
    return (
        <AuthorizationScreen>
            <PagePostData {...props}/>
        </AuthorizationScreen>
    )
}

export default function EditPage(props) {
    return renderWithLoggedInUser(props, render);
}
