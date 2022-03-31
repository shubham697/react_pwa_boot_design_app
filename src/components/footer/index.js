import React, { useEffect } from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, ButtonBase, Typography, InputBase, Badge, } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
// custom import
import { GET_USER, DISMISS_LOAD, SHOW_LOAD, SHOW_ALERT, SET_USER, LOGOUT } from '../../redux_helper/constants/action-types';
import { NextBtn } from '../btns';

const Footer = (props) => {
  const history = useHistory();

  useEffect(() => {
    props.dispatch({ type: GET_USER, payload: '' })
  }, [])

  const onNext = () => {
    if(props.active_page == 'Pick Color' && props.curboot.color != '') {
      history.push('/left')
    }
    else if (props.active_page == 'Left Boot') {
      history.push('/right')
    }
    else if (props.active_page == 'Right Boot') {
      history.push('/size')
    }
    else if (props.active_page == 'Size') {
      history.push('/name')
    }
  }

  const isShow=(page)=>{
    if(page == 'Pick Color') {
      return true;
    }
    else if (page == 'Left Boot' && props.curboot.left_icon != '') {
      return true;
    }
    else if (page == 'Right Boot' && props.curboot.right_icon != '') {
      return true;
    }
    else if (page == 'Size' && props.curboot.size != '') {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <div className={ isShow(props.active_page) == true ?  "footer" : "hide"} >
      <div className="hcenter">
        <NextBtn onClick={onNext} />
      </div>
    </div>
  );
}

const mapstate_props = (state) => {
  return {
    user: state.userReducer.user,
    active_page: state.globalReducer.active_page,
    curboot : state.bootReducer,
  }
}

export default connect(mapstate_props)(Footer)