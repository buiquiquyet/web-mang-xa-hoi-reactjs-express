import * as request from '../../utils/request'
export const like = async ( option) => {
    try {
        const res = await request.post('/evaluate/like',option)
        return res
    } catch (error) {
        throw error
    }

}
export const getTotalLike = async (option) => {
    try {
        const res = await request.post(`/evaluate/total`, option)
        return res
    } catch (error) {
        throw error
    }

}
export const getLikePostByUserId = async (option) => {
    try {
        const res = await request.post(`/evaluate/userLike`,option)
        return res
    } catch (error) {
        throw error
    }

}
export const dislike = async (option) => {
    try {
        const res = await request.post(`/evaluate/dislike`, option)
        return res
    } catch (error) {
        throw error
    }

}
export const deleteByCommentId = async (option) => {
    try {
        const res = await request.post(`/evaluate/byCommentId`, option)
        return res
    } catch (error) {
        throw error
    }

}
export const deleteByPostId = async (postId) => {
    try {
        const res = await request.Delete(`/evaluate/${postId}`)
        return res
    } catch (error) {
        throw error
    }

}
