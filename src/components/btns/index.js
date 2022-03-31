import React, { useEffect } from 'react';
import { AppBar, Toolbar, IconButton, ButtonBase, Typography, InputBase, Badge, } from '@material-ui/core';

export const RoundYellowBtn = (props) => {
  return (
    <ButtonBase disabled={props.disabled == true} 
      className={props.disabled == true ? "roundyellowbtn vcenter btn_disabled" : "roundyellowbtn vcenter"} onClick={props.onClick}>
      <p>{props.name}</p>
    </ButtonBase>
  );
}

export const RoundWhiteBtn = (props) => {
  return (
    <ButtonBase className="roundwhitebtn vcenter" onClick={props.onClick}>
      <p>{props.name}</p>
    </ButtonBase>
  );
}

export const TextBtn = (props) => {
  return (
    <ButtonBase className="textbtn vcenter" onClick={props.onClick}>
      <p>{props.name}</p>
    </ButtonBase>
  );
}

export const NextBtn = (props) => {
  return (
    <ButtonBase disabled={props.disabled == true} className={props.disabled == true ? "roundyellowbtn hcenter btn_disabled" : "roundyellowbtn hcenter"} onClick={props.onClick}>
      <p>Next</p>
      <img src='assets/svgs/ic_right.svg'/>
    </ButtonBase>
  );
}
