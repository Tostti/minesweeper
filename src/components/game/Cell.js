import React from 'react'


//It returns a cell. It's a div with the cell position as id, and the functions to click and right click it
export const Cell = ({ pos, clickCallback, rightClickCallback }) => {
    const id = pos[0].toString() + ',' + pos[1].toString();
    
    return (
        <div className={'cell'} id={id} onClick={clickCallback} onContextMenu={rightClickCallback}>
        </div>
    )
}
