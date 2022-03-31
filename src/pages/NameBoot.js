import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { SET_CUR_PAGE, SET_NAME, GET_CURBOOT } from '../redux_helper/constants/action-types';
import { NextBtn } from '../components/btns';


const NameBoot = (props) => {
    const history = useHistory();
    const [name, setName] = useState('');
    useEffect(() => {
        props.dispatch({ type: SET_CUR_PAGE, payload: 'Name' })
        if(props.curboot.isLoaded == false) {
            props.dispatch({ type: GET_CURBOOT, payload: {} })
        }
        else {
            setName(props.curboot.bootname)
            if(props.curboot.left_icon == '') {
                history.push('/left')
                return;
            }
            if(props.curboot.right_icon == '') {
                history.push('/right')
                return;
            }
            if(props.curboot.size == '') {
                history.push('/size')
                return;
            }
        }
        
    }, [props.curboot])

    const onSetName=(text)=>{
        props.dispatch({ type: SET_NAME, payload: text })
    }

    const goNext=()=>{
        history.push('finish')
    }

    return (
        <div className="flex_grow_1 vcenter scrollable">
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
                <div className="sizeView vcenter">
                    <p>Size</p>
                    <div className="vcenter">{props.curboot.size}</div>
                </div>
            </div>
            <div className="name_btnsview vcenter_start flex_grow_1" >
                <div className="question_txt">
                    Whose boots will these be?
                </div>
                <input type="text" className="input-rount-sm" 
                    placeholder='Enter child’s name' 
                    value={name}
                    onChange={e => onSetName(e.target.value)}
                />
                <div style={{height: 20}}></div>
                <NextBtn disabled={name == ''} onClick={()=>goNext()} />
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
export default connect(mapstate_props)(NameBoot)