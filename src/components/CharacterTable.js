import React from 'react';
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import male from "../utils/images/avatar3.png";
import female from "../utils/images/clipart-glasses-woman-12.png";
import hermaphrodite from "../utils/images/download (1).png";
import neutral from "../utils/images/download.png";
import NavigationTab from "./NavigationTab";

const CharacterTable = (props) => {

    const {characters, state, convertHeight, sortString, sortNumber, navigateLeft, navigateRight} = props
    console.log("characters", characters)

    return(
        <React.Fragment>
            {characters.length < 1 ?
                <div className="table">
                    <p className="no-data">No data available</p>
                </div>:
            <table className="table">
                <thead>
                <tr className="th">
                    <TableHeader header={"Name"} sortFunc={sortString} name={"name"}/>
                    <TableHeader header={"Gender"} sortFunc={sortString} name={"gender"}/>
                    <TableHeader header={"Eye Color"} sortFunc={sortString} name={"eye_color"}/>
                    <TableHeader header={"Hair Color"} sortFunc={sortString} name={"hair_color"}/>
                    <TableHeader header={"Skin Color"} sortFunc={sortString} name={"skin_color"}/>
                    <TableHeader header={"Height"} sortFunc={sortNumber} name={"height"}/>
                    <TableHeader header={"Mass"} sortFunc={sortNumber} name={"mass"}/>
                </tr>
                </thead>
                <tbody>
                {characters.slice(state.currentNavIndex, state.nextNavIndex).map((character, i) => {
                        return(
                            <TableRow data={character} key={i} index={i}/>
                        )
                    })}
                <tr>
                        <td className="bg-yellow">Showing: {characters.slice(state.currentNavIndex, state.nextNavIndex).length} characters</td>
                        <td className="bg-yellow"></td>
                        <td className="bg-yellow"></td>
                        <td className="bg-yellow"></td>
                        <td className="bg-yellow"></td>
                        <td className="bg-yellow">{state.totalHeight}cm ({convertHeight(state.totalHeight)})</td>
                        <td className="bg-yellow"></td>
                    </tr>
                </tbody>
            </table>}
            {characters.length > 0 && <NavigationTab navigateLeft={navigateLeft} navigateRight={navigateRight} state={state}/>}
        </React.Fragment>
    )
}

export default CharacterTable