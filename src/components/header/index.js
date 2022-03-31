import React, { useEffect } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, ButtonBase, Typography, InputBase, Badge, } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
// custom import
import AlertDialog from '../modals/AlertDialog';
import { GET_USER, DISMISS_LOAD, SHOW_LOAD, SHOW_ALERT, SET_USER, LOGOUT } from '../../redux_helper/constants/action-types';

const Header = (props) => {
  const history = useHistory();

  useEffect(() => {
    props.dispatch({ type: GET_USER, payload: '' })
  }, [])

  const onLogout = () => {
    props.dispatch({ type: LOGOUT, payload: '' })
    props.dispatch({ type: SHOW_ALERT, payload: { type: 'success', msg: 'LOGOUT Success!' } })

    history.replace("/")
  }

  const isShow=(page)=>{
    if(page == 'Home') {
      return false;
    }
    else if(page == 'Profile') {
      return false;
    }
    else if (page == 'UserInfo') {
      return false;
    }
    else {
      return true;
    }
  }

  const onGoback=()=>{
    if(props.active_page == 'Pick Color') {
      history.push('/')
    }
    else if (props.active_page == 'Left Boot') {
      history.push('/pick_color')
    }
    else if (props.active_page == 'Right Boot') {
      history.push('/left')
    }
    else if (props.active_page == 'Size') {
      history.push('/right')
    }
    else if (props.active_page == 'Name') {
      history.push('/size')
    }
    else if(props.active_page == 'Finish Up') {
      history.push('/name')
    }
    else {
      history.goBack()
    }
  }
  return (
    <div  className={ isShow(props.active_page) == true ?  "header" : "hide"}  >
      <div className="hcenter">
        <div className="flex_grow_1"><img src='assets/svgs/ic_back.svg' onClick={()=>onGoback()} /></div>
        <p>{props.active_page}</p>
        <div className="flex_grow_1" ><div style={{width: 30, height: 30}}/></div>
      </div>
    </div>
  );
}

const mapstate_props = (state) => {
  return {
    user: state.userReducer.user,
    active_page: state.globalReducer.active_page
  }
}

export default connect(mapstate_props)(Header)