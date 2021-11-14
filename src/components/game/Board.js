import React, { useState } from 'react'
import '../../styles/board.css'
import { Cell } from './Cell';

const Board = ({ rows, cols, mines, board = [] }) => {

    document.addEventListener('click', ({ target }) => {
        if (target.classList.contains('cell') && !target.classList.contains('clicked') && !target.classList.contains('lose') && !target.classList.contains('flag')) {
            checkclick(target.id);
        }
    })

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('cell') && !e.target.classList.contains('clicked') && !e.target.classList.contains('lose')) {
            if (e.target.classList.contains('flag')) {
                e.target.classList.remove('flag');
                e.target.innerHTML = '';
            }
            else {
                e.target.classList.add('flag');
                e.target.innerHTML = '&#128681';
            }
        }
    })

    const newgame = () => {
        board = [];
        console.log(rows,cols,mines)
        createboard(rows, cols, mines);
    }
    const checkclick = (pos) => {
        const x = parseInt(pos.split(',')[0]);
        const y = parseInt(pos.split(',')[1]);
        const cell = document.getElementById(pos);
        if (board[x][y].mine) {
            cell.innerHTML = '&#128163';
            cell.classList.add('extreme');
            endgame();
        }
        else {
            var surroundingmines = 0;
            cell.classList.add('clicked');

            for (let row = Math.max(0, x - 1); row <= Math.min(x + 1, rows - 1); row++) {
                for (let col = Math.max(0, y - 1); col <= Math.min(y + 1, cols - 1); col++) {
                    if (board[row][col].mine) {
                        surroundingmines++;
                    }
                }
            }

            if (surroundingmines === 0) {
                cell.classList.add('none');
                for (let row = Math.max(0, x - 1); row <= Math.min(x + 1, rows - 1); row++) {
                    for (let col = Math.max(0, y - 1); col <= Math.min(y + 1, cols - 1); col++) {
                        var newposition = row.toString() + ',' + col.toString()
                        var adjacent = document.getElementById(newposition);
                        if (!adjacent.classList.contains('clicked')) {
                            checkclick(newposition);
                        }
                    }
                }
            }

            else {
                if (surroundingmines < 3) {
                    cell.classList.add('low');
                }
                else if (surroundingmines < 5) {
                    cell.classList.add('mid');
                }
                else if (surroundingmines < 7) {
                    cell.classList.add('high');
                }
                else {
                    cell.classList.add('extreme');
                }

                cell.innerHTML = surroundingmines;
            }
        }
    }


    const createboard = (rows, cols, mines) => {
        for (let row = 0; row < rows; row++) {
            const thisrow = [];
            for (let col = 0; col < cols; col++) {
                const element = {
                    position: [row, col],
                    mine: false
                }
                thisrow.push(element);
            }
            board.push(thisrow);
        }
        var i = 0;
        while (i < mines) {
            var row = Math.floor(Math.random() * rows);
            var col = Math.floor(Math.random() * cols);
            if (!board[row][col].mine) {
                board[row][col].mine = true;
                i = i + 1;
            }
        }
    }


    //Shows the mines and lock the board when the user loses
    const endgame = () => {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                var element = document.getElementById(row + ',' + col);
                element.classList.add('lose');
                if (board[row][col].mine) {
                    element.innerHTML = '&#128163';
                }
            }
        }
    }

    const reset = () => {
        var boardcode = '';
        var flagcode = '';
        var pressedcode = '';

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                var element = document.getElementById(row + ',' + col);
                var currentboard = board[col][row];
                if (currentboard.mine) {
                    boardcode = boardcode + '1';
                }
                else {
                    boardcode = boardcode + '0';
                }
                if (element.classList.contains('flag')) {
                    flagcode = flagcode + '1';
                }
                else {
                    flagcode = flagcode + '0';

                }
            }
        }
        console.log(flagcode)
    }

    newgame();

    return (
        <>
            <div id='board'>
                {board.map((element, key) => (
                    <div className='cellrow' key={key}>
                        {
                            element.map((val, key) => (
                                <Cell key={key} pos={val.position} />
                            ))
                        }
                    </div>
                ))}
            </div>
            <button onClick={reset}> RESET</button>
        </>
    )

}
export default Board

