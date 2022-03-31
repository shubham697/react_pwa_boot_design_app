import { SET_LEFT_ICON, SET_RIGHT_ICON, SET_COLOR, SET_SIZE, SET_NAME, RESET_MYBOOT, GET_CURBOOT, SET_CURBOOT } from '../constants/action-types';
import { colors } from '../../utils/constant';
import _localstorage from '../../utils/localstorage';

const BootKey = 'current_boot';
const initialState = {
    isLoaded: false,
    left_icon: '',
    right_icon: '',
    color: colors[0],
    size: '',
    bootname: ''
}

const BootReducer = (state = initialState, action) => {
    var newState;
    switch (action.type) {
        case GET_CURBOOT:
            let tmpread = _localstorage.getItem(BootKey)
            newState = Object.assign({}, state,
                tmpread,
                {
                    isLoaded: true,
                }
            )
            _localstorage.setItem(BootKey, newState)
            return newState

        case SET_LEFT_ICON:
            newState = Object.assign({}, state, {
                isLoaded: true,
                left_icon: action.payload || ''
            })
            _localstorage.setItem(BootKey, newState)
            return newState

        case SET_RIGHT_ICON:
            newState = Object.assign({}, state, {
                isLoaded: true,
                right_icon: action.payload || ''
            })
            _localstorage.setItem(BootKey, newState)
            return newState

        case SET_COLOR:
            newState = Object.assign({}, state, {
                isLoaded: true,
                color: action.payload || ''
            })
            _localstorage.setItem(BootKey, newState)
            return newState

        case SET_SIZE:
            newState = Object.assign({}, state, {
                isLoaded: true,
                size: action.payload || ''
            })
            _localstorage.setItem(BootKey, newState)
            return newState

        case SET_NAME:
            newState = Object.assign({}, state, {
                isLoaded: true,
                bootname: action.payload || ''
            })
            _localstorage.setItem(BootKey, newState)
            return newState

        case SET_CURBOOT:
            newState = Object.assign({}, state, action.payload)
            _localstorage.setItem(BootKey, newState)
            return newState

        case RESET_MYBOOT:
            _localstorage.setItem(BootKey, initialState)
            return initialState
        default:
            return state
    }
}

export default BootReducer;