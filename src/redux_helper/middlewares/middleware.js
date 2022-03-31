import {SHOW_ALERT} from '../constants/action-types';

export const middleware1 = ({getState, dispatch}) => {
    return (next) => {
        return (action) => {
            if(action.type == 'ADD_CART')
            {   
                // get current store's state
                const state = getState()
                dispatch({type : SHOW_ALERT, payload : {type : 'success', msg : ''}})
            }
            return next(action)
        }   
    }
}