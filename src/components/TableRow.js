import React from 'react';
import male from "../utils/images/avatar3.png"
import female from "../utils/images/clipart-glasses-woman-12.png"
import hermaphrodite from "../utils/images/download (1).png"
import neutral from "../utils/images/download.png"
const TableRow = (props) => {
    const {data, index} = props
    return(

        <React.Fragment>
            <tr >
                <td className={(index % 2 === 0) ? "bg-yellow" : ""}>{data.name}</td>
                <td className={(index % 2 === 0) ? "bg-yellow" : ""}>
                    {data.gender === "male" ?
                        <div className="avatar">
                            <img src={male} alt="avatar" />
                        </div> :
                        data.gender === "female" ?
                            <div className="avatar">
                                <img src={female} alt="avatar" />
                            </div> :
                            data.gender === "hermaphrodite" ?
                                <div className="avatar">
                                    <img src={hermaphrodite} alt="avatar" />
                                </div> :
                                <div className="avatar">
                                    <img src={neutral} alt="avatar" />
                                </div>
                    }</td>
                <td className={(index % 2 === 0) ? "bg-yellow" : ""}>{data.eye_color}</td>
                <td className={(index % 2 === 0) ? "bg-yellow" : ""}>{data.hair_color}</td>
                <td className={(index % 2 === 0) ? "bg-yellow" : ""}>{data.skin_color}</td>
                <td className={(index % 2 === 0) ? "bg-yellow" : ""}>{data.height}</td>
                <td className={(index % 2 === 0) ? "bg-yellow" : ""}>{data.mass}</td>
            </tr>
        </React.Fragment>
    )
}

export default TableRow