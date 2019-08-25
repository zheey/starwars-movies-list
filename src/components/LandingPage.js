import React, {Component} from 'react';
import Logo from "./Logo";
import Navbar from "./Navbar";


class LandingPage extends Component{

    render() {
        return(
            <div className="app-bg">
                <Navbar/>
                <Logo/>
            </div>
        )
    }

}

export default LandingPage