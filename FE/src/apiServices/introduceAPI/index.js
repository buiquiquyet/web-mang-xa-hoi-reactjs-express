import * as request from '../../utils/request'
export const Create = async ( option) => {
    try {
        const res = await request.post('/introduce/create',option)
        return res
    } catch (error) {
        throw error
    }

}
export const GetByUserId = async ( userId) => {
    try {
        const res = await request.get(`/introduce/getByUserId/${userId}`)
        return res
    } catch (error) {
        throw error
    }

}
export const DelEachColumn = async ( option) => {
    try {
        const res = await request.post(`/introduce/delEachColumn`, option)
        return res
    } catch (error) {
        throw error
    }

}


