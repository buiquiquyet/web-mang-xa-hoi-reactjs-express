import * as request from '../utils/request'

export const getAll = async (option) => {
    try {
        const res = await request.get('', option)
        return res
    } catch (error) {
        throw error
    }
}
export const getPage = async (page) => {
    try {
        const res = await request.get(`/?_page=${page}`)
        return res
    } catch (error) {
        throw error
    }
}
export const getAllTrash = async () => {
    try {
        const res = await request.get('/trash')
        return res
    } catch (error) {
        throw error
    }
}
export const getCourse = async (slug, option) => {
    try {
        const res = await request.get(`/course/${slug}`, option)
        return res
    } catch (error) {
        throw error
    }
}
export const create = async (option) => {
    try {
        const res = await request.post('course/create', option)
        return res
    } catch (error) {
        throw error
    }
}
export const edit = async (option) => {
    try {
        const res = await request.post('course/edit', option)
        return res
    } catch (error) {
        throw error
    }
}
export const Delete = async (id) => {
    try {
        const res = await request.Delete(`course/${id}`)
        return res
    } catch (error) {
        throw error
    }
}
export const DeleteForce = async (id) => {
    try {
        const res = await request.Delete(`course/${id}/force`)
        return res
    } catch (error) {
        throw error
    }
}
export const restore = async (id) => {
    try {
        const res = await request.patch(`course/${id}/restore`)
        return res
    } catch (error) {
        throw error
    }
}

//user
export const getUser = async (formData) => {
    try {
        const res = await request.post(`user/create`, formData)
        return res
    } catch (error) {
        throw error
    }
}
export const getUserLogin = async (formData) => {
    try {
        const res = await request.post(`user`, formData)
        return res
    } catch (error) {
        throw error
    }
}
export const getPrivateUser = async (token) => {
    try {
        const res = await request.get(`user/private`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
           
        })
        return res
    } catch (error) {
        throw error
    }
}
export const getStudent = async (token) => {
    try {
        const res = await request.get(`user/student`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
           
        })
        return res
    } catch (error) {
        throw error
    }
}
export const getTeacher = async (token) => {
    try {
        const res = await request.get(`user/teacher`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
           
        })
        return res
    } catch (error) {
        throw error
    }
}
export const getAdmin = async (token) => {
    try {
        const res = await request.get(`user/admin`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
           
        })
        return res
    } catch (error) {
        throw error
    }
}