import {GET_MYSAVES, ADD_TO_MYSAVES, REMOVE_FROM_MYSAVES} from '../constants/action-types';
import _localstorage from '../../utils/localstorage';

const storage_key = 'MYSAVES'
const initialState = {
    mysaves : [],
}

const mysaveReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MYSAVES :
            return Object.assign({}, state, {
                mysaves : _localstorage.getItem(storage_key) == null ? [] : _localstorage.getItem(storage_key)
            })  
        case ADD_TO_MYSAVES :
            let new_mysaves1 = state.mysaves.concat(action.payload)
            _localstorage.setItem(storage_key, new_mysaves1)
            return Object.assign({}, state, {
                mysaves : new_mysaves1
            }) 
        case REMOVE_FROM_MYSAVES : 
            let new_mysaves2 = state.mysaves.filter(item => item.id != action.payload)
            _localstorage.setItem(storage_key, new_mysaves2)
            return Object.assign({}, state, {
                mysaves : new_mysaves2
            })
        default:
            return state
    }
}

export default mysaveReducer
