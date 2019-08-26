import React, {Component} from 'react';
import Logo from "./Logo";
import Navbar from "./Navbar";
import {getAllCast, getAllFilms} from "../api/requests";
import AnimatedCrawl from "./AnimatedCrawl";
import CharacterTable from "./CharacterTable";
import SearchInput from "./SearchInput";


class LandingPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            movies : [],
            showCrawl: false,
            currentMovie: 0,
            loading: true,
            showTable: false,
            loadingFilm: false,
            casts: [],
            totalHeight: 0,
            sortOrder: true,
            currentNavIndex: 0,
            nextNavIndex: 10,
            navDiff: 10,
            noOfPages: 0,
            currentPage: 1
        }
    }

    componentDidMount() {
       this.getFilms()
    }

    /*get films*/
    getFilms = () => {
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

        if(i !== "no") {
            this.setState({showCrawl: false, loadingFilm: true}, () => {
                clearTimeout(this.timer)
                this.setState({currentMovie: i})

                //getting cast for a movie
                this.getAllCasts()
                //this.timer = setTimeout(() => {this.setState({showCrawl: false, showTable: true})}, 100)
            })
        }

    }

    /*get all movie casts*/
    getAllCasts = () =>{
        getAllCast(this.state.movies[this.state.currentMovie].characters, this.onGetCast)
    }

    /*callback to get casts for a movie*/

    onGetCast = (status, data) =>{
        if(status){

            let num = Math.ceil(data.length / this.state.navDiff)
            this.setState({showCrawl: true, casts: data, noOfPages: num, loadingFilm: false})
            localStorage.setItem("casts", JSON.stringify(data))

            //get all heights
            let heightArray =  []
            for(let cast of data){
                heightArray.push(cast.height)
            }

            //get sum of heights
            this.getSumHeight(heightArray.slice(this.state.currentNavIndex, this.state.nextNavIndex))

            //set timer to remove animated crawl
            this.timer = setTimeout(() => {this.setState({showCrawl: false, showTable: true})}, 20000)
        }else{
            this.setState({loadingFilm: false})
        }
    }

    /*adding all height together*/
    getSumHeight = (casts) =>{
        let total = casts.reduce((sum, cast) => {
            return Number(sum) + Number(cast)
        })
        this.setState({totalHeight: total})
    }

    /*convert height cm to feet*/
    convertHeight = (n) => {
            const realFeet = ((n*0.393700) / 12);
            const feet = Math.floor(realFeet);
            const inches = Math.round((realFeet - feet) * 12);
            return feet+ " ft/" + inches + ' inch';
    }

    /*function to sort string in ascending or descending order*/
    sortString = (type, header) => {
        const {sortOrder, casts} = this.state
        casts.sort((a, b) => {
            return ('' + a[header]).localeCompare(b[header]);
        })
            if(type === "one") {
                console.log("got here string ", casts)
                this.setState({casts})
                return casts
            }else{
                this.setState((prevState) =>({
                    sortOrder: !prevState.sortOrder
                }), () => {
                    console.log("got here string2 ", casts)
                    if(this.state.sortOrder) {
                        console.log("got here string3 ", casts)
                        this.setState({casts})
                        return casts
                    }else{
                        console.log("got here string3 ", casts.reverse())
                        this.setState({casts: casts.reverse()})
                        return casts.reverse()
                    }
                })

            }
    }

    /*function to sort number data in ascending or descending order*/
    sortNumber = (type, header) => {
        const {sortOrder, casts} = this.state
        casts.sort( (a, b)  => {
            return parseFloat(a[header]) - parseFloat(b[header])
        })
        if(type === "one") {
            this.setState({casts})
            return casts
        }else{
            this.setState((prevState) =>({
                sortOrder: !prevState.sortOrder
            }), () => {
                console.log("2", casts, this.state.sortOrder)
                if(this.state.sortOrder) {
                    console.log("3", casts, this.state.sortOrder)
                    this.setState({casts})
                    return casts
                }else{
                    console.log("4", casts.reverse(), this.state.sortOrder)
                    this.setState({casts: casts.reverse()})
                    return casts.reverse()
                }
            })

        }
    }

    /*function to paginate right*/
    navigateRight = () =>{
        const {navDiff, nextNavIndex, currentNavIndex, currentPage, noOfPages} = this.state;

        if(currentPage !== noOfPages){
            this.setState({nextNavIndex: nextNavIndex + navDiff, currentNavIndex: currentNavIndex + navDiff,
                currentPage: ((nextNavIndex + navDiff)/navDiff)}, () =>{
                let heightArray =  []
                for(let cast of this.state.casts){
                    heightArray.push(cast.height)
                }

                //get sum of heights
                this.getSumHeight(heightArray.slice(this.state.currentNavIndex, this.state.nextNavIndex))
            })
        }


    }

    /*function to paginate left*/
    navigateLeft = () =>{
        const {navDiff, nextNavIndex, currentNavIndex, currentPage} = this.state;

        if(currentPage !== 1){
            this.setState({nextNavIndex: nextNavIndex - navDiff, currentNavIndex: currentNavIndex - navDiff,
                currentPage: ((nextNavIndex - navDiff)/navDiff)}, () =>{
                let heightArray =  []
                for(let cast of this.state.casts){
                    heightArray.push(cast.height)
                }

                //get sum of heights
                this.getSumHeight(heightArray.slice(this.state.currentNavIndex, this.state.nextNavIndex))
            })
        }
    }

    /* Filters by gender*/
    onFilter = (e) =>{
        if(e.target.value.length < 1){
            let allCast = JSON.parse(localStorage.getItem("casts"));
            let num = Math.ceil(allCast.length / this.state.navDiff)

            this.setState({casts: allCast, noOfPages: num, currentNavIndex: 0, nextNavIndex: 10, currentPage: 1})
        }else{

            let filtercast = e.target.value;


            let allCast = JSON.parse(localStorage.getItem("casts"));

            let newCast = allCast.filter((cast, i) =>{
                return cast.gender.toLowerCase() === filtercast.toLowerCase()
            })

            let heightArray =  []
            for(let cast of newCast){
                heightArray.push(cast.height)
            }

            //get sum of heights
            this.getSumHeight(heightArray.slice(this.state.currentNavIndex, this.state.nextNavIndex))

            let num = Math.ceil(newCast.length / this.state.navDiff)

            this.setState({casts: newCast, noOfPages: num, currentNavIndex: 0, nextNavIndex: 10, currentPage: 1})
        }

    }

    /*return back to landing page*/
    goHome = () => {
        this.setState({showCrawl: false, loadingFilm: false, showTable: false})
    }


    render() {

        const {movies, showCrawl, loading, showTable, loadingFilm, casts} = this.state

        console.log(this.state)
        return(
            <div className="app-bg">
                {loading ?
                    <p className="loader flex-center height-100">loading</p> :
                    <div>
                        <Navbar films={movies} showFilm={this.showFilm} goHome={this.goHome}/>
                        {loadingFilm ?
                            <div className="loader flex-center height-100">loading</div> :
                            showCrawl ?
                            <AnimatedCrawl state={this.state}/> :
                            showTable ?
                                <div className="details-div">
                                    <SearchInput filter={this.onFilter}/>}
                                    <CharacterTable characters={casts} convertHeight={this.convertHeight} state={this.state}
                                    sortString={this.sortString} sortNumber={this.sortNumber} navigateRight={this.navigateRight}
                                                    navigateLeft={this.navigateLeft}/>
                                </div>:
                            <Logo/>
                        }
                    </div>
                }
            </div>
        )
    }

}

export default LandingPage