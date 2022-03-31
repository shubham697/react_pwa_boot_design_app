import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { SET_CUR_PAGE, SET_COLOR, GET_CURBOOT } from '../redux_helper/constants/action-types';
import { colors } from '../utils/constant';

const ColorBoot = (props) => {
    const [selectedColor, setSelect] = useState(colors[0]);
    useEffect(() => {
        props.dispatch({ type: SET_CUR_PAGE, payload: 'Pick Color' })
        if(props.curboot.isLoaded == false) {
            props.dispatch({ type: GET_CURBOOT, payload: {} })
        }
        else {
            setSelect(props.curboot.color)
        }
    }, [props.curboot])

    const onSelectColor=(color)=>{
        props.dispatch({ type: SET_COLOR, payload: color })
    }

    return (
        <div className="flex_grow_1 vcenter scrollable">
            <div className="flex_grow_1 vcenter">
                <img src={"assets/boots/" + selectedColor + "_Front.png"} className="boot_front_img" />
            </div>
            <div style={{ flexWrap: 'wrap', display: 'flex', width: '97%', paddingBottom: 10 }}>
                {
                    colors.map((color, index) =>
                        <div key={index} style={{ width: '25%', padding: 8, boxSizing: 'border-box' }} >
                            <div onClick={() => onSelectColor(color)} className={color == selectedColor ? "vcenter color-item color-selected" : "vcenter color-item"} >
                                <img src={"assets/svgs/" + color + ".svg"} style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>

    )
}

const mapstate_props = (state) => {
    return {
        active_page: state.globalReducer.active_page,
        curboot: state.bootReducer,
    }
}
export default connect(mapstate_props)(ColorBoot)