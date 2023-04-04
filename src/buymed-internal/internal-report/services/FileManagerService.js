import {getFileManagerClient} from '../clients/file-manager'

export async function getVideoFile({ctx, params}) {
    const client = getFileManagerClient(ctx, {})
    let newParams = { ... params}
    try {
        JSON.parse(newParams.q)
    } catch {
        delete newParams.q
    }

    newParams.q = JSON.stringify({
        fileType: "VIDEO",
        uploadStatus: "completed"
    })

    newParams.offset = !params.page || params.page <= 1 ? 0 : (params.page - 1) * (params.limit || 5);
    newParams.getTotal = true

    let res = await client.getListFile(newParams)
    if (res.status === 'OK') {
        res.data = res.data.map((file) => {
            const newObj = {
                ...file,
                name: file.fileName,
                avatar: file.thumbnailURL ? file.thumbnailURL : 'https://img-proxy.thuocsi.vn/thuocsi-testing/integration/video/2022715150731eea3fe5b1c0e006a7d9thumbnail.png',
                createdBy: {
                    accountID: file.createByID,
                    username: file.createByName
                },
                platform: "gcs"
            }
            return newObj
        })
    }

    return {
        data: res,
        pagination: {
            page: Number.parseInt(newParams.page) || 1,
            limit: Number.parseInt(newParams.limit) || 5,
            total: res?.total || 0,
        }
    }
}