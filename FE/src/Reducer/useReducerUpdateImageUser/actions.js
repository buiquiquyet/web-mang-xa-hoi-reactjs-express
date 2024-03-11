import { SET_STATUS, 
  
    } from "./constants";

export const setStatus = payload => {
    return {
        type: SET_STATUS,
        payload
    }
}

