import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import { SET_CUR_PAGE, SET_USER_PROFILE, GET_USER_PROFILE, SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT} from '../redux_helper/constants/action-types';
import { RoundYellowBtn } from '../components/btns'
import {updateMember} from '../apis/member';

const UserInfo = (props) => {
    const history = useHistory();
    const [username, setUsername] = useState('')
    const [phone, SetPhone] = useState('')
    const [isLoaded, SetIsLoaded] = useState(false)

    useEffect(() => {
        props.dispatch({ type: SET_CUR_PAGE, payload: 'UserInfo' })
        if (isLoaded == false) {
            props.dispatch({ type: GET_USER_PROFILE, payload: {} })
            SetIsLoaded(true)
        }
        else if (props.user_profile.id != null ) {
            setUsername(props.user_profile.name)
            SetPhone(props.user_profile.phone)
        }
        else if (props.user_profile.id == null ) {
            history.push('/profile?tab=' + 1)
        }
    }, [props.user_profile])

    const onSave = () => {
        props.dispatch({type : SHOW_LOAD, payload : ''})
        updateMember(props.user_profile.id, phone, username).then(response => {
            props.dispatch({
                type: SET_USER_PROFILE,
                payload: Object.assign({}, props.user_profile, {
                    phone: phone,
                    name : username,
                    id : props.user_profile.id
                })
            })
            history.push('/profile?tab=' + 1)
        })
        .catch(error => {
            console.log('updateMember', error)
            props.dispatch({type : DISMISS_LOAD, payload : ''})
            props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Something went wrong!' }});
            history.push('/profile?tab=' + 1)
        })
    }

    return (
        <div className="flex_grow_1 vcenter profile-bg scrollable">
            <div className="logoview hcenter">
                <img src="assets/svgs/logo.svg" className="logo" />
                <div className="flex_grow_1"></div>
            </div>
            <div className="flex_grow_1 vcenter main">
                <div className="flex_grow_1 userForm">
                    <div style={{height:18}}/>
                    <input type="text" className="input-rount-sm"
                        placeholder='Name'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <div style={{height:18}}/>
                    <input type="text" className="input-rount-sm"
                        placeholder='Phone number'
                        value={phone}
                        onChange={e => SetPhone(e.target.value)}
                    />
                    <div style={{height:18}}/>
                    <RoundYellowBtn name="Save" onClick={() => onSave()} />
                </div>
            </div>
        </div>

    )
}

const mapstate_props = (state) => {
    return {
        active_page: state.globalReducer.active_page,
        user_profile: state.userReducer.user_profile,
        curboot: state.bootReducer,
    }
}
export default connect(mapstate_props)(UserInfo)