import React from 'react';

const Navbar = (props) =>{
    const {films, showFilm, goHome} = props
    return(
        <div className="navbar flex-space cursor-pointer">
            <h1 onClick={e =>{goHome()}}>
                Movie List
            </h1>
            <select className="selectbtn" onChange={e => {showFilm(e.target.value)}}>
                <option value="no"> select a movie</option>
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