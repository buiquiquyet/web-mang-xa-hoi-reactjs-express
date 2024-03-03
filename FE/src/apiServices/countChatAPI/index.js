import * as request from '../../utils/request'
export const Create = async ( option) => {
    try {
        const res = await request.post('/countChat/create',option)
        return res
    } catch (error) {
        throw error
    }

}
export const GetByUserId = async ( userId) => {
    try {
        const res = await request.get(`/countChat/getById/${userId}`)
        return res
    } catch (error) {
        throw error
    }
}
export const delCountChat = async ( option) => {
    try {
        const res = await request.post(`/countChat/delCountChat`, option)
        return res
    } catch (error) {
        throw error
    }
}



