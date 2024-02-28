
import { SET_STATUS, 
   } from "./constants"
export const initState = {
   
    checkStatusUploadImage: false,
}

const reducer = (state = initState, action) => {
    let newState
    switch(action.type) {
        case SET_STATUS:
            newState = {
                checkStatusUploadImage: action.payload
            }
            break
        default:
            return state
        
    }
    return newState
    
}

export default reducer