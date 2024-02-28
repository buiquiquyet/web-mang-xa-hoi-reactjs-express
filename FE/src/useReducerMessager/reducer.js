
import { SET_MESSAGER_LOG, 
    SET_MESSAGER_ITEM, 
    DELETE_MESSAGER_ITEM, 
    ZOOMOUT_MESSAGER_ITEM,
    ZOOMOUT_HIDE_TO_MESSAGER_ITEM} from "./constants"
export const initState = {
    // checkMess: false,
    checkMesLog: false,
    jobs: [],
    jobsZoomOut: []
}

const reducer = (state = initState, action) => {
    let newState
    switch(action.type) {
        case SET_MESSAGER_LOG:
            newState = {
                ...state,
                checkMesLog: action.payload
            }
            break
        // case SET_MESSAGER:
        //     if(state.jobs.length > 1) {
        //         newState = { ...state }
        //     }else {
        //         newState = {
        //             ...state,
        //             checkMess: action.payload
        //         }
        //     }
        //     break
        case SET_MESSAGER_ITEM:
            const isCheck = state.jobs.includes(action.payload)
            if(!isCheck) { 
                newState = {
                    ...state,
                    jobs: [...state.jobs,action.payload]
                }
            } else newState = {...state}
            break
        case DELETE_MESSAGER_ITEM:
            const isCheckDel = state.jobs.includes(action.payload)
            if(isCheckDel) { 
                const newJobs = state.jobs.filter(item => item !== action.payload)
                newState = {
                    ...state,
                    jobs: newJobs
                }
            } else newState = {...state}
            break
        case ZOOMOUT_HIDE_TO_MESSAGER_ITEM:
            const isCheckZoonOutHide = state.jobsZoomOut.includes(action.payload)
            if(isCheckZoonOutHide) { 
                const newJobsZoomOut = state.jobsZoomOut.filter(item => item !== action.payload)
                newState = {
                    ...state,
                    jobsZoomOut: newJobsZoomOut,
                }
            } else {
                newState = {...state}
            }
            break
        case ZOOMOUT_MESSAGER_ITEM:   
            const newJobs = state.jobs.filter(item => item !== action.payload)
            const isCheckZoonOut = state.jobsZoomOut.includes(action.payload)
            if(isCheckZoonOut) {
                newState = {
                    ...state,
                    jobs: newJobs,   
                }
            }
            else {
                const newZoomOutJobs = [...state.jobsZoomOut, action.payload]
                newState = {
                    ...state,
                    jobs: newJobs,
                    jobsZoomOut: newZoomOutJobs
                }
            }
            break
        default:
            return state
        
    }
    return newState
    
}

export default reducer