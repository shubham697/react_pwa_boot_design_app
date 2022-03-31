import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { SET_CUR_PAGE, SET_COLOR } from '../redux_helper/constants/action-types';
import { RoundYellowBtn } from '../components/btns'

const Home = (props) => {
    const history = useHistory();

    useEffect(() => {
        props.dispatch({ type: SET_CUR_PAGE, payload: 'Home' })
    }, [])

    const goNext = () => {
        history.push('pick_color')
    }

    return (
        <div className="flex_grow_1 vcenter home-bg scrollable">
            <div className="logoview vcenter">
                <img src="assets/svgs/logo.svg" className="logo" />
                <img src="assets/svgs/img_cloud.svg" className="cloud pos1" />
                <img src="assets/svgs/img_cloud_1.svg" className="cloud1 pos2" />
                <img src="assets/svgs/img_cloud.svg" className="cloud pos3" />
                <img src="assets/svgs/img_cloud_2.svg" className="cloud2 pos4"/>
            </div>
            <div className="flex_grow_1 vcenter main">
                <p>Fun rubber boots from quality materials at great prices</p>
                <div className="btnview">
                    <RoundYellowBtn name="Design your boots" onClick={() => goNext()} />
                </div>
                <div className="flex_grow_1"></div>
                <img src="assets/imgs/boots.png" />
            </div>
        </div>

    )
}

const mapstate_props = (state) => {
    return {
        active_page: state.globalReducer.active_page,
    }
}
export default connect(mapstate_props)(Home)