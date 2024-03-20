import * as request from '../../utils/request'
export const create = async ( option) => {
    try {
        const res = await request.post('/checkFeed/create',option)
        return res
    } catch (error) {
        throw error
    }

}