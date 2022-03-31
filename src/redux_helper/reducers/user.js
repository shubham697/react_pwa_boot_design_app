import { SET_USER, GET_USER, LOGOUT, SET_USER_PROFILE, GET_USER_PROFILE, SET_PAYFLAG, GET_PAYFLAG } from '../constants/action-types';
import _localstorage from '../../utils/localstorage';

const PayFlagKey = 'has_paid_flag';
const ProfileKey = 'user_profile';

const initialState = {
    user: '',
    user_profile: {},
    has_payflag: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, state, {
                user: _localstorage.getItem('user') || ''
            })
        case SET_USER:
            _localstorage.setItem('user', action.payload)
            return Object.assign({}, state, {
                user: action.payload || ''
            })
        case LOGOUT:
            _localstorage.removeItem('user')
            return { user: '', user_profile: {} }

        case GET_USER_PROFILE:
            return Object.assign({}, state, {
                user_profile: _localstorage.getItem(ProfileKey) || {}
            })
        case SET_USER_PROFILE:
            let newProfile = action.payload || {}
            _localstorage.setItem(ProfileKey, newProfile)

            return Object.assign({}, state, {
                user_profile: newProfile
            })

        case SET_PAYFLAG:
            _localstorage.setItem(PayFlagKey, action.payload == true)
            return Object.assign({}, state, {
                has_payflag: action.payload == true
            })
        case GET_PAYFLAG:
            return Object.assign({}, state, {
                has_payflag: _localstorage.getItem(PayFlagKey) == true
            })
        default:
            return state
    }
}

export default userReducer;