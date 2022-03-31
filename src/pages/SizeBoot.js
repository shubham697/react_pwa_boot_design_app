import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { SET_CUR_PAGE, SET_SIZE, GET_CURBOOT } from '../redux_helper/constants/action-types';
import { sizes_odd, sizes_even, heel2toes, ages } from '../utils/constant';

const SizeBoot = (props) => {
    const history = useHistory();
    const [selectedSize, setSelect] = useState('');
    useEffect(() => {
        props.dispatch({ type: SET_CUR_PAGE, payload: 'Size' })
        if (props.curboot.isLoaded == false) {
            props.dispatch({ type: GET_CURBOOT, payload: {} })
        }
        else {
            setSelect(props.curboot.size)
            if (props.curboot.left_icon == '') {
                history.push('/left')
                return;
            }
            if (props.curboot.right_icon == '') {
                history.push('/right')
                return;
            }
        }

    }, [props.curboot])

    const onSelectSize = (size) => {
        props.dispatch({ type: SET_SIZE, payload: size })
    }
    return (
        <React.Fragment>
            <div className="boot_img_view">
                <img src={"assets/boots/" + props.curboot.color + "_Top.png"} className="boot_img" />
                {
                    props.curboot.left_icon != '' &&
                    <img src={"assets/items/" + props.curboot.left_icon + ".svg"} className="boot_left_icon" />
                }
                {
                    props.curboot.right_icon != '' &&
                    <img src={"assets/items/" + props.curboot.right_icon + ".svg"} className="boot_right_icon" />
                }
            </div>
            <div className="flex_grow_1 scrollable w-100">
                <div className="size_label_header ">
                    <div >Heel to toe</div>
                    <div className="flex_grow_1" style={{ width: '50%' }}></div>
                    <div style={{ textAlign: 'end' }}>Rough age</div>
                </div>
                <div className="sizeview-scrollcontainer pl-12 pr-12">
                    <div style={{ flexWrap: 'wrap', display: 'flex', width: '25%', height: '100%', paddingTop: 33 }}>
                        {
                            heel2toes.map((text, index) =>
                                <div key={index} className={"vcenter heel2toe-item"} >
                                    <div className="vcenter" style={{ alignItems: 'flex-start' }}>{text}</div>
                                </div>
                            )
                        }
                    </div>
                    <div style={{ flexWrap: 'wrap', display: 'flex', width: '25%', height: '100%' }}>
                        {
                            sizes_odd.map((size, index) =>
                                <div key={index} className="vcenter" style={{ width: '100%', padding: '4.3%', boxSizing: 'border-box' }}  >
                                    <div onClick={() => onSelectSize(size)} className={size == selectedSize ? "size-item size-selected" : "size-item"} >
                                        <div className="vcenter">{size}</div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div style={{ flexWrap: 'wrap', display: 'flex', width: '25%', height: '100%', paddingTop: 78 }}>
                        {
                            sizes_even.map((size, index) =>
                                <div key={index} className="vcenter" style={{ width: '100%', padding: '4.3%', boxSizing: 'border-box' }}  >
                                    <div onClick={() => onSelectSize(size)} className={size == selectedSize ? "vcenter size-item size-selected" : "vcenter size-item"} >
                                        <div className="vcenter">{size}</div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div style={{ flexWrap: 'wrap', display: 'flex', width: '25%', height: '100%', paddingTop: 24 }}>
                        {
                            ages.map((age, index) =>
                                <div key={index} className={"vcenter age-item"} >
                                    <div className="vcenter" style={{ alignItems: 'flex-end' }}>{age}</div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}

const mapstate_props = (state) => {
    return {
        active_page: state.globalReducer.active_page,
        curboot: state.bootReducer,
    }
}
export default connect(mapstate_props)(SizeBoot)