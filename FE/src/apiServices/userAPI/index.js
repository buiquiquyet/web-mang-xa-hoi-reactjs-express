import * as request from '../../utils/request'
export const registerUser = async (option) => {
    try {
        const res = await request.post('/create', option)
        return res
    } catch (error) {
        throw error
    }
}
export const loginUser = async (option) => {
    try {
        const res = await request.post('/login', option)
        return res
    } catch (error) {
        throw error
    }
}

export const getProfileUser = async (token) => {
    try {
        const res = await request.get('/profile', {
            headers: {
                'Authorization': `Bearer ${token}`, 
              },
        })
        return res
    } catch (error) {
        throw error
    }
}
export const getProfileByUserId = async (userId) => {
    try {
        const res = await request.get(`/profileByUserId/${userId}`, )
        return res
    } catch (error) {
        throw error
    }
}
export const getNameUser = async (userId) => {
    try {
        const res = await request.get(`/${userId}` )
        return res
    } catch (error) {
        throw error
    }
}
export const getStatusOnline = async (userId) => {
    try {
        const res = await request.get(`/statusOnline/${userId}` )
        return res
    } catch (error) {
        throw error
    }
}
export const updateStory = async (option) => {
    try {
        const res = await request.post(`/updateStory`,option )
        return res
    } catch (error) {
        throw error
    }
}
export const searchUsers = async (name) => {
    try {
        const res = await request.get(`/searchUsers?name=${name}` )
        return res
    } catch (error) {
        throw error
    }
}
// export const checkOnlineUser = async (token) => {
//     try {
//         const res = await request.get('/checkOnlineUser', {
//             headers: {
//                 'Authorization': `Bearer ${token}`, 
//               },
//         })
//         return res
//     } catch (error) {
//         throw error
//     }
// }
