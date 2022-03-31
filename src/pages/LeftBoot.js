import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { SET_CUR_PAGE, SET_LEFT_ICON, GET_CURBOOT } from '../redux_helper/constants/action-types';
import {icons} from '../utils/constant';

const LeftBoot = (props) => {
    const [selectedIcon, setSelect] = useState('');
    useEffect(() => {
        props.dispatch({ type: SET_CUR_PAGE, payload: 'Left Boot' })
        if(props.curboot.isLoaded == false) {
            props.dispatch({ type: GET_CURBOOT, payload: {} })
        }
        else {
            setSelect(props.curboot.left_icon)
        }
    }, [props.curboot])

    const onSelectIcon=(icon)=>{
        props.dispatch({ type: SET_LEFT_ICON, payload: icon })
    }
    return (
        <React.Fragment>
            <div className="boot_img_view">
                <img src={"assets/svgs/ic_indicator.svg"} className="left_indicator_img" />
                <img src={"assets/boots/" + props.curboot.color + "_Top.png"} className="boot_img" />
                {
                    props.curboot.left_icon != '' &&
                    <img src={"assets/items/" + props.curboot.left_icon + ".svg"} className="boot_left_icon"/>
                }
            </div>
            <div className="flex_grow_1 vcenter scrollable" style={{width: '98%'}}>
                <div className="scrollable" style={{ flexWrap: 'wrap', display: 'flex', width: '100%', height: '100%' }}>
                    {
                        icons.map((icon, index) =>
                            <div key={index} className="vcenter" style={{ width: '33.3%', padding: '3.3%', boxSizing: 'border-box' }}  >
                                <div onClick={()=>onSelectIcon(icon)} className={icon == selectedIcon ? "vcenter icon-item icon-selected" : "vcenter icon-item"} >
                                    <img src={"assets/items/" + icon + ".svg"} />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>

    )
}

const mapstate_props = (state) => {
    return {
        active_page: state.globalReducer.active_page,
        curboot : state.bootReducer,
    }
}
export default connect(mapstate_props)(LeftBoot)