import React from 'react';


const SearchInput  = (props) =>{

    // const {} = props.state;
    const {filter} = props;

    return(
        <div>
            <input type="text" className="input" placeholder="Filter by gender" onChange={e => {filter(e)}}/>
        </div>
    )
}

export default SearchInput