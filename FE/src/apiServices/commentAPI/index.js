import * as request from '../../utils/request'
export const Create = async ( option) => {
    try {
        const res = await request.post('/comment/create',option)
        return res
    } catch (error) {
        throw error
    }

}
export const Show = async ( postId, limit) => {
    try {
        const res = await request.get(`/comment/show?postId=${postId}&limit=${limit}`)
        return res
    } catch (error) {
        throw error
    }

}
export const DeleteByPostId = async ( postId) => {
    try {
        const res = await request.Delete(`/comment/${postId}`)
        return res
    } catch (error) {
        throw error
    }

}

