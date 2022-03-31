import { SET_CUR_PAGE, SET_ISMEMBER } from '../constants/action-types';

const initialState = {
    active_page: '',
    ismember: false,
}

const GlobalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CUR_PAGE:
            return Object.assign({}, state, {
                active_page: action.payload || ''
            })
        case SET_ISMEMBER:
            return Object.assign({}, state, {
                ismember: action.payload 
            })
        default:
            return state
    }
}

export default GlobalReducer;