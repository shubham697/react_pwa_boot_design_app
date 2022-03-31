import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import {HashRouter} from "react-router-dom";

const Layout = ({children, ...other_props}) => {
    return (
        <HashRouter>
            <div className="layout vcenter">
                <Header/>
                {children}
                <Footer />
            </div>
        </HashRouter>
    )
}

export default Layout