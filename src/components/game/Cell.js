import React from 'react'

export const Cell = ({  pos }) => {
    const id = pos[0].toString() + ',' + pos[1].toString();
    
    return (
        <div className={'cell'} id={id} >
        </div>
    )
}
