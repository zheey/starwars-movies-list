import React from 'react';
import left from "../utils/images/previous icon.png"
import right from "../utils/images/forward icon.png"

const NavigationTab  = (props) =>{

    const {noOfPages, currentPage} = props.state;
    const {navigateLeft, navigateRight} = props;

        return(
            <div className="z-flex-space z-nav-holder z-gr-div">
                <div className={currentPage === 1 ? "z-not-left z-flex-column-center z-disabled" :"z-not-left  z-flex-column-center"}
                     onClick={e=>{navigateLeft(e)}}>
                    <img src={left} />
                </div>
                <div className="z-flex-space z-width-35">
                    <div className="z-flex-column-center z-not-right">
                        {currentPage}
                    </div> <p className="z-nav-holder-p">/</p><p className="z-nav-holder-p">{noOfPages}</p>
                </div>
                <div className={currentPage === noOfPages ? "z-not-left z-flex-column-center z-disabled":"z-not-left z-flex-column-center"}
                     onClick={e=>{navigateRight(e)}}>
                    <img src={right} />
                </div>
            </div>
        )
}

export default NavigationTab