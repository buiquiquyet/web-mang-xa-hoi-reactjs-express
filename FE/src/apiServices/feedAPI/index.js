import * as request from '../../utils/request'
export const create = async ( option) => {
    try {
        const res = await request.post('/feed/create',option)
        return res
    } catch (error) {
        throw error
    }

}
export const createImage = async ( option) => {
    try {
        const res = await request.post('/feed/createImage',option)
        return res
    } catch (error) {
        throw error
    }
}
export const updateStatus = async ( userId) => {
    try {
        const res = await request.get(`/feed/updateStatus/${userId}`,)
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
export const getByStatusFeed = async ( userId) => {
    try {
        const res = await request.get(`/feed/getByStatusFeed/${userId}`,)
        return res
    } catch (error) {
        throw error
    }

}
export const getByEachUserId = async ( userId) => {
    try {
        const res = await request.get(`/feed/getByEachUserId/${userId}`,)
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
export const deleteFeedByUserId = async ( option) => {
    try {
        const res = await request.post(`/feed/deleteFeedByUserId/`,option)
        return res
    } catch (error) {
        throw error
    }

}

