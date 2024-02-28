import axios from "axios";

const request = axios.create({
    baseURL : 'http://localhost:3001/'
})

export const get = async (path , option = {}, headers = {}) => {
    const res = await request.get(path, option,  {
        ...headers,    
    })
    return res.data
}
export const post = async (path, option = {}, headers = {}) => {
    const res = await request.post(path, option, {
        ...headers,    
    })
    return res.data
}
export const Delete = async (path, option = {}, headers = {}) => {
    const res = await request.delete(path, option,{
        ...headers,    
    })
    return res.data
}
export const patch = async (path, option = {}) => {
    const res = await request.patch(path, option)
    return res.data
}