import * as request from '../../utils/request'
export const Create = async ( option) => {
    try {
        const res = await request.post('/messeger/create',option)
        return res
    } catch (error) {
        throw error
    }
}
export const Show = async ( option) => {
    try {
        const res = await request.post(`/messeger/show`, option)
        return res
    } catch (error) {
        throw error
    }
}
export const ShowLastest = async ( option) => {
    try {
        const res = await request.post(`/messeger/showLastest`, option)
        return res
    } catch (error) {
        throw error
    }
}


