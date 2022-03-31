import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Switch } from "react-router-dom";
import HomePage from '../pages/Home';
import PickColorPage from '../pages/ColorBoot';
import LeftBootPage from '../pages/LeftBoot';
import RightBootPage from '../pages/RightBoot';
import SizeBootPage from '../pages/SizeBoot';
import NameBootPage from '../pages/NameBoot';
import FinishUpPage from '../pages/FinishUp';
import ProfilePage from '../pages/Profile';
import UserInfoPage from '../pages/UserInfo';

export default class Routes extends React.Component {
    render() {
    return(
        
        // <Router >
        //     <Switch>
        <React.Fragment>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" >
                <HomePage />
            </Route>
            <Route exact path="/pick_color" component={PickColorPage} />
            <Route exact path="/left" component={LeftBootPage} />
            <Route exact path="/right" component={RightBootPage} />
            <Route exact path="/size" component={SizeBootPage} />
            <Route exact path="/name" component={NameBootPage} />
            <Route exact path="/finish" component={FinishUpPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/userinfo" component={UserInfoPage} />
        </React.Fragment>
        //     </Switch>
        // </Router>
    )
    }
}
 