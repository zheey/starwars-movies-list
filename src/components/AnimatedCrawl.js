import React from "react";


const AnimatedCrawl = (props) =>{
    const {state} = props
    return(
        <div>
            <div className="fade"></div>
            <section className="star-wars">
                <div className="crawl">
                    <div className="title">
                        <h1>
                            {state.movies[state.currentMovie].title}
                        </h1>
                    </div>
                    <p dangerouslySetInnerHTML={{__html: state.movies[state.currentMovie].opening_crawl}} className="font-15"></p>

                </div>
            </section>
        </div>
    )
}

export default AnimatedCrawl