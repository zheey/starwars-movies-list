import React from 'react';
import logo from "../utils/images/starwars2.png";

const Logo = () =>{
    return(
        <div className="height-100 flex-center">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
        </div>
    )
}

export default Logo