import * as request from '../../utils/request'
export const create = async ( option) => {
    try {
        const res = await request.post('/feed/create',option)
        return res
    } catch (error) {
        throw error
    }

}
export const getByUserId = async ( userId) => {
    try {
        const res = await request.get(`/feed/getByUserId/${userId}`,)
        return res
    } catch (error) {
        throw error
    }

}
export const countByUserId = async ( userId) => {
    try {
        const res = await request.get(`/feed/countByUserId/${userId}`,)
        return res
    } catch (error) {
        throw error
    }

}

