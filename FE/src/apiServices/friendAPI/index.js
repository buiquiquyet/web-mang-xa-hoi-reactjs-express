import * as request from '../../utils/request'
export const getStatusFriend = async ( option) => {
    try {
        const res = await request.post('/friend/getStatusFriend',option)
        return res
    } catch (error) {
        throw error
    }
}
export const createFriend = async ( option) => {
    try {
        const res = await request.post('/friend/createFriend',option)
        return res
    } catch (error) {
        throw error
    }
}
export const cancelAddFriend = async ( option) => {
    try {
        const res = await request.post('/friend/cancelAddFriend',option)
        return res
    } catch (error) {
        throw error
    }
}
export const updateAcceptedFriend = async ( option) => {
    try {
        const res = await request.post('/friend/updateAcceptedFriend',option)
        return res
    } catch (error) {
        throw error
    }
}
export const getNewLessAdd = async ( userId) => {
    try {
        const res = await request.get(`/friend/getNewLessAdd/${userId}`)
        return res
    } catch (error) {
        throw error
    }
}
export const getAllFriend = async ( userId, typeFriend) => {
    try {
        const res = await request.get(`/friend/getAllFriend/?userId=${userId}&typeFriend=${typeFriend}`)
        return res
    } catch (error) {
        throw error
    }
}
export const getTotalFriend = async ( userId) => {
    try {
        const res = await request.get(`/friend/getTotalFriend/${userId}`)
        return res
    } catch (error) {
        throw error
    }
}


