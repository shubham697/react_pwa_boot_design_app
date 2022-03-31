import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import queryString from 'query-string';
import { SET_CUR_PAGE, GET_MYSAVES, GET_USER_PROFILE, SET_USER_PROFILE, RESET_MYBOOT, SET_CURBOOT, REMOVE_FROM_MYSAVES, SHOW_LOAD, DISMISS_LOAD, SHOW_ALERT } from '../redux_helper/constants/action-types';
import { RoundYellowBtn } from '../components/btns';
import { ORDER_STATUS_NEW, ORDER_STATUS_RETURNED, ORDER_STATUS_SHIPPED } from '../utils/constant'
import {getMyOrders} from '../apis/order';
import {getMember} from '../apis/member';
import { isMobileSafari } from 'react-device-detect';

// //check if using mobile safari [returns true is mobile safari] =====
// var ua = window.navigator.userAgent;
// var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
// var webkit = !!ua.match(/WebKit/i);
// var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

const Profile = (props) => {
    const history = useHistory();
    const [tabid, SetTabId] = useState(0)
    const [isLoaded, SetIsLoaded] = useState(false)
    const [savedItems, SetSavedItems] = useState([])
    const [shippedItems, SetShippedItems] = useState([])
    const [returnedItems, SetReturnedItems] = useState([])

    const [userPhone, SetUserPhone] = useState('')
    const [userName, SetUserName] = useState('')
    

    useEffect(() => {
        props.dispatch({ type: SET_CUR_PAGE, payload: 'Profile' })

        let tmps = document.location.hash.split("?")
        if (tmps != null && tmps.length > 1) {
            let query = queryString.parse(tmps[1])
            if (query.tab != null && query.tab != '') {
                SetTabId(parseInt(query.tab))
            }
        }

        if (isLoaded == false) {
            props.dispatch({ type: GET_MYSAVES, payload: {} })
            props.dispatch({ type: GET_USER_PROFILE, payload: {} })
            SetIsLoaded(true)
        }
        else if (props.user_profile.phone != null ) {
            loadData();
        }
        SetSavedItems(props.mysaves)
        SetUserPhone(props.user_profile.phone)
        SetUserName(props.user_profile.name)
    }, [props.curboot, props.ismember, props.mysaves, props.user_profile.phone])

    const loadOrderHistory = (customer_id)=>{
        getMyOrders(customer_id).then(response => {
            let tmp_shipped_items = []
            let tmp_returned_items = []
            response.forEach((doc) => {
                if(doc.data().status == ORDER_STATUS_NEW) {
                    tmp_shipped_items.push(doc.data())
                }
                else if(doc.data().status == ORDER_STATUS_RETURNED){
                    tmp_returned_items.push(doc.data())
                }
            })
            tmp_shipped_items.sort((a, b) => b.createdAt - a.createdAt)
            tmp_returned_items.sort((a, b) => b.createdAt - a.createdAt)
            SetShippedItems(tmp_shipped_items)
            SetReturnedItems(tmp_returned_items)
            props.dispatch({type : DISMISS_LOAD, payload : ''})
        })
        .catch(error => {
            console.log('loadOrderHistory', error)
            props.dispatch({type : DISMISS_LOAD, payload : ''})
            props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Something went wrong!' }});
        })
    }

    const loadData=()=>{

        props.dispatch({type : SHOW_LOAD, payload : 'Loading orders...'})

        getMember(props.user_profile.phone).then(response => {
            if(response.docs.length > 0 && response.docs[0].data() != null) 
            { // if user is already a member
                props.dispatch({
                    type: SET_USER_PROFILE,
                    payload: Object.assign({}, props.user_profile, {
                        phone: response.docs[0].data().phone,
                        name : response.docs[0].data().name,
                        id : response.docs[0].data().id
                    })
                })
                SetUserPhone(response.docs[0].data().phone)
                SetUserName(response.docs[0].data().name)

                loadOrderHistory(response.docs[0].data().id)
            }
            else {
                props.dispatch({type : DISMISS_LOAD, payload : ''})
            } 
        })
        .catch(error => {
            console.log('getMemberDetails', error)
            props.dispatch({type : DISMISS_LOAD, payload : ''})
            props.dispatch({type : SHOW_ALERT, payload : {type : 'error', msg : 'Something went wrong!' }});
        })
    }

    const designNew = () => {
        props.dispatch({ type: RESET_MYBOOT, payload: {} })
        history.push('/pick_color')
    }
    const goUserInfo = () => {
        history.push('/userinfo')
    }

    const onClickListItem = (data, item_type)=>{
        if(item_type == 'saved') {
            props.dispatch({ type: SET_CURBOOT, payload: data })
            props.dispatch({ type: REMOVE_FROM_MYSAVES, payload: data.id })
            history.push('/name')
        }
    }

    const _renderListItem = (data, index, item_type) => {
        return (
            <div key={index} className="hcenter list_item" onClick={()=> onClickListItem(data, item_type)}>
                <h4>{data.bootname}</h4>
                <div className="bootimg">
                    <img src={"assets/boots/" + data.color + "_Top.png"} className="img" />
                    {
                        data.left_icon != '' &&
                        <img src={"assets/items/" + data.left_icon + ".svg"} className="boot_left_icon" />
                    }
                    {
                        data.right_icon != '' &&
                        <img src={"assets/items/" + data.right_icon + ".svg"} className="boot_right_icon" />
                    }
                </div>
                <div className="sizeView vcenter">
                    <p>Size</p>
                    <div className="vcenter">{data.size}</div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex_grow_1 vcenter profile-bg">
            <div className="logoview hcenter">
                <img src="assets/svgs/logo.svg" className="logo" />
                <div className="flex_grow_1"></div>
                <div className="vcenter info" onClick={() => goUserInfo()}>
                    <h4>{userName}</h4>
                    <p>{userPhone}</p>
                </div>
            </div>
            <div className="flex_grow_1 vcenter main">
                <div className="flex_grow_1 vcenter tabview" >
                    <div className="tabs hcenter" style={{height: 42, minHeight: 42}}>
                        <div className={tabid == 0 ? "tabitem active_tabitem" : "tabitem "}
                            onClick={() => SetTabId(0)}
                        >Saved</div>
                        <div className={tabid == 1 ? "tabitem active_tabitem" : "tabitem "}
                            onClick={() => SetTabId(1)}
                        >Shipped</div>
                        <div className={tabid == 2 ? "tabitem active_tabitem" : "tabitem "}
                            onClick={() => SetTabId(2)}
                        >Returned</div>
                    </div>
                    <div className="flex_grow_1 w-100 scrollable"  style={ isMobileSafari ? {} : {height: 'calc(100vh - 240px)'}}>
                        <SwipeableViews
                            style={{height: '100%', width: '100%'}}
                            index={tabid}
                            // animateHeight = {true}
                            onChangeIndex={SetTabId}
                        >
                            <div className="tab-swipe-view scrollable">
                                {
                                    savedItems.length == 0 ?
                                        <div className="nothing">Nothing yet!</div>
                                        :
                                        savedItems.map((item, index) =>
                                            _renderListItem(item, index, 'saved')
                                        )
                                }
                            </div>
                            <div className="tab-swipe-view scrollable">
                                {
                                    shippedItems.length == 0 ?
                                        <div className="nothing">Nothing yet!</div>
                                        :
                                        shippedItems.map((item, index) =>
                                            _renderListItem(item.bootitem, index, 'shipped')
                                        )
                                }
                            </div>
                            <div className="tab-swipe-view scrollable">
                                {
                                    returnedItems.length == 0 ?
                                        <div className="nothing">Nothing yet!</div>
                                        :
                                        returnedItems.map((item, index) =>
                                            _renderListItem(item.bootitem, index, 'returned')
                                        )
                                }
                            </div>
                        </SwipeableViews>
                    </div>
                </div>
                <div className="w-100 vcenter" style={{height: 66, minHeight: 66}}>
                    <RoundYellowBtn name="Design new boots" onClick={() => designNew()} />
                </div>
            </div>
        </div>

    )
}

const mapstate_props = (state) => {
    return {
        active_page: state.globalReducer.active_page,
        ismember: state.globalReducer.ismember,
        user_profile: state.userReducer.user_profile,
        curboot: state.bootReducer,
        mysaves: state.mysaveReducer.mysaves,
    }
}
export default connect(mapstate_props)(Profile)