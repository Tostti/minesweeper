import React from 'react'
import Header from './Header'
import Board from './Board'

const Game = (props) => {
    const { width, height, mines } = props.location.state.params;
    var board = [];

    if (props.location.state.load === false) {
        board = [];
    }
    return (
        <div className="background">
            <Header />
            <Board rows={height} cols={width} mines={mines} board={board} />
        </div>
    )
}

export default Game
