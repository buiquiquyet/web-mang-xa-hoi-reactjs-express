import { SET_MESSAGER_LOG, 
    SET_MESSAGER_ITEM, 
    DELETE_MESSAGER_ITEM, 
    ZOOMOUT_MESSAGER_ITEM,
    ZOOMOUT_HIDE_TO_MESSAGER_ITEM
    } from "./constants";

export const setMessLog = payload => {
    return {
        type: SET_MESSAGER_LOG,
        payload
    }
}

export const setMessItem = payload => {
    return {
        type: SET_MESSAGER_ITEM,
        payload
    }
}
export const deletetMessItem = payload => {
    return {
        type: DELETE_MESSAGER_ITEM,
        payload
    }
}
export const zoomOutMessItem = payload => {
    return {
        type: ZOOMOUT_MESSAGER_ITEM,
        payload
    }
}
export const zoomOutHideToMessItem = payload => {
    return {
        type: ZOOMOUT_HIDE_TO_MESSAGER_ITEM,
        payload
    }
}