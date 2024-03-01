import * as request from '../../utils/request'
export const Create = async ( option) => {
    try {
        const res = await request.post('/commentFeedback/create',option)
        return res
    } catch (error) {
        throw error
    }

}
export const Show = async ( postId, limit) => {
    try {
        const res = await request.get(`/commentFeedback/show?postId=${postId}&limit=${limit}`)
        return res
    } catch (error) {
        throw error
    }

}
export const DeleteByPostId = async ( postIds) => {
    try {
        const res = await request.post(`/commentFeedback/deleteByCommentIds`,postIds)
        return res
    } catch (error) {
        throw error
    }
}
export const DeleteByCommentFeedId = async ( commentFeedId) => {
    try {
        const res = await request.Delete(`/commentFeedback/deleteByCommentFeedbackId/${commentFeedId}`,)
        return res
    } catch (error) {
        throw error
    }
}
export const DeleteByCommentId = async ( commentId) => {
    try {
        const res = await request.post(`/commentFeedback/deleteByCommentId`,commentId)
        return res
    } catch (error) {
        throw error
    }
}

