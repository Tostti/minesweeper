import React from 'react'

//No functions, just shows the data in the header
const Header = ({ leftMines, elapsedTime }) => {
    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-4">
                    <h3> {leftMines} &#128163; </h3>
                </div>
                <div className="col-8">
                    <h3>{elapsedTime[0]}h : {elapsedTime[1]} m : {elapsedTime[2]}s</h3>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Header
