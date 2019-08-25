import React from 'react';

const Navbar = (props) =>{
    const {films, showFilm} = props
    return(
        <div className="navbar flex-space">
            <h1>
                Movie List
            </h1>
            <select className="selectbtn" onChange={e => {showFilm(e.target.value)}}>
                {films.map((film, i) => {
                    return(
                        <option key={i} value={i} onClick={e => {showFilm(i)}}>
                            {film.title}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Navbar