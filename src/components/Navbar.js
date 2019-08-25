import React from 'react';

const Navbar = () =>{
    return(
        <div className="navbar flex-space">
            <h1>
                Movie List
            </h1>
            <select className="selectbtn">
                <option>
                    1
                </option>
                <option>
                    2
                </option>
            </select>
        </div>
    )
}

export default Navbar