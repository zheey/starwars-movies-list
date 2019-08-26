import React from 'react';


const TableHeader = (props) => {
    const {header,sortFunc, name} = props
    return(
        <React.Fragment>
            <th className="cursor-pointer" onClick={e => {sortFunc("one", name)}}
             onDoubleClick={e => {sortFunc("two", name)}}>{header}

            </th>
        </React.Fragment>
    )
}

export default TableHeader