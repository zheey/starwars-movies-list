import React, {Component} from 'react';
import Logo from "./Logo";
import Navbar from "./Navbar";
import {getAllFilms} from "../api/requests";
import AnimatedCrawl from "./AnimatedCrawl";


class LandingPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            movies : [],
            showCrawl: false,
            currentMovie: 0,
            loading: true,
            showTable: false
        }
    }

    componentDidMount() {
        getAllFilms(this.onGetFilms)
    }

    /*call back to retrieve all movies*/
    onGetFilms = (status, data) => {
        if(status){
            this.setState({movies: data.results, loading: false})
        }else{

        }
    }

    /*function to select a movies and display movie */
    showFilm = (i) =>{
        console.log("got here")

        this.setState({showCrawl: false}, () =>{
            clearTimeout(this.timer)
            this.setState({showCrawl: true, currentMovie: i})
            this.timer = setTimeout(() => {this.setState({showCrawl: false, showTable: true})}, 20000)
        })

    }

    render() {

        const {movies, showCrawl, loading, showTable} = this.state
        return(
            <div className="app-bg">
                {loading ?
                    <p>loading</p> :
                    <div>
                        <Navbar films={movies} showFilm={this.showFilm}/>
                        {showCrawl ?
                            <AnimatedCrawl state={this.state}/> :
                            showTable ?
                                <div>

                                </div> :
                            <Logo/>
                        }
                    </div>
                }
            </div>
        )
    }

}

export default LandingPage