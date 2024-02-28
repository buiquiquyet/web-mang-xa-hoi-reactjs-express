import * as request from '../../utils/request'
export const postText = async (token, option) => {
    try {
        const res = await request.post('/post/text',option, {
            headers: {
                'Authorization': `Bearer ${token}`, 
              }, 
             
        })
        return res
    } catch (error) {
        throw error
    }

}
export const deletePost = async ( option) => {
    try {
        const res = await request.post('/post/delete',option)
        return res
    } catch (error) {
        throw error
    }

}
export const showPostByUser = async (token) => {
    try {
        const res = await request.post('/post/showByUser',{}, {
            headers: {
                'Authorization': `Bearer ${token}`, 
              }, 
        })
        return res
    } catch (error) {
        throw error
    }

}
export const showPostByUserAvartarCover = async (token, option) => {
    try {
        const res = await request.post('/post/showByUserAvartarCover',option, {
            headers: {
                'Authorization': `Bearer ${token}`, 
              }, 
             
        })
        return res
    } catch (error) {
        throw error
    }

}
export const postSingleImage = async (token, option) => {
    try {
        const res = await request.post('/post/single',option, {
            headers: {
               
                'Authorization': `Bearer ${token}`, 
              },
        })
        return res
    } catch (error) {
        throw error
    }
}

export const postMultipleImage = async (token, option) => {
    try {
        const res = await request.post('/post/multiple', option,{
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`, 
              },
        })
        return res
    } catch (error) {
        throw error
    }
}