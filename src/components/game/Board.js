import React, { createRef, useEffect, useState } from 'react'
import { Cell } from './Cell';

const Board = ({ timerActive, dif, srows, scols, smines, load, setLoad, setLeftMines, leftMines, setTimerActive, elapsedTime, setElapsedTime }) => {
    const [boardState, setBoardState] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [levelComplete, setLevelComplete] = useState(false);
    const [saveData, setSaveData] = useState(null);
    const ref = createRef();
    const savebutton = createRef();
    const messagediv = createRef();
    let rows = srows;
    let cols = scols;
    let mines = smines;
    let diff = dif;

    /////////////Initial functions////////////

    //It creates a new board with the parameters selected by the user
    const newGame = () => {
        createBoard();
    }

    //If it's a loaded game, it sets the loaded information to the state saveData
    const loadinfo = () => {
        setSaveData(JSON.parse(localStorage.getItem('save')));
    }

    //It creates the board corresponding to the loaded values
    const loadBoard = () => {
        //Set the global variables rows, cols and mines to the loaded values
        rows = saveData.rows;
        cols = saveData.cols;
        mines = saveData.mines;
        diff = saveData.dif;
        createBoard()
        let rmines = saveData.leftMines;
        setLeftMines(rmines); //Set the state  of remaining mines 
        setLoaded(true); //Set loaded state. It tells that the board is done
    }

    //It adds the flags,clicks and other things from the loaded values
    const loadGameData = () => {
        //Set the global variables rows, cols and mines to the loaded values again because the update have a little 
        //delay in the assignment and some times it don't update when this function starts
        rows = saveData.rows;
        cols = saveData.cols;
        mines = saveData.mines;
        let loadflag = saveData.flagcode;
        let loadclicked = saveData.clickedcode;
        for (let row = 0; row < rows; row++) {
            loadflag[row].forEach((item) => {//Adds flags to the corresponding displaying cells
                let element = getFromBoard(row, item);
                element.classList.add('flag');
                element.innerHTML = '&#128681';
            });
        }
        for (let row = 0; row < rows; row++) {
            loadclicked[row].forEach((item) => {
                let element = getFromBoard(row, item);
                handleClick(element);//"Clicks" the corresponding cells
            });
        }
        let elapsedtime = saveData.elapsedTime;
        setElapsedTime(elapsedtime); //Sets the timer
        setStartTime(saveData.startTime);//Sets the started time to the local values
        setTimerActive(false);
        setLoaded(false);

    }

    //It creates the board. 
    const createBoard = () => {
        let newBoardState = [];
        for (let row = 0; row < rows; row++) {//Creating a 2d array.
            const thisrow = [];
            for (let col = 0; col < cols; col++) {
                const element = {//Each element has its own position and mine value (true if it has a mine)
                    position: [row, col],
                    mine: false,
                }
                thisrow.push(element);
            }
            newBoardState.push(thisrow);
        }

        //If it's a new game, it sets x mines in random places (x previously selected by the user)
        //otherwise it sets the corresponding loaded mines
        if (!load) {
            setStartTime(getCurrentTime());
            let i = 0;
            while (i < mines) {
                let row = Math.floor(Math.random() * rows);
                let col = Math.floor(Math.random() * cols);
                if (!newBoardState[row][col].mine) {
                    newBoardState[row][col].mine = true;
                    i = i + 1;
                }
            }
        }
        else {
            let loadboard = saveData.boardcode;
            for (let row = 0; row < rows; row++) {
                loadboard[row].forEach((item) => {
                    newBoardState[row][item].mine = true;
                });
            }
        }
        setBoardState(newBoardState);//Set boardState (that later is displayed)
    }


    /////////////Functional functions////////////////////////////

    //Return the current time in MM-DD-YYYY hh:mm 12h format
    const getCurrentTime = () => {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let day = currentDate.getDate().toString().padStart(2, '0');
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        let hour = (currentDate.getHours() === 12 ? 12 : (currentDate.getHours() % 12)).toString().padStart(2, '0');
        let minutes = (currentDate.getMinutes() + '').padStart(2, '0');
        let pmam = currentDate.getHours() > 11 ? 'pm' : 'am';
        return (month + '-' + day + '-' + year + ' ' + hour + ':' + minutes + pmam)
    }

    //Gets the displayed item from the DOM in x y position
    const getFromBoard = (x, y) => ref.current.children[x].children[y];


    //Check if the clicked cell has a mine or the amount of mines from its neighbors
    const handleClick = (clickedcell) => {
        //Check if the cell wasn't previously clicked, has a flag or the game hasn't ended
        if (!clickedcell.classList.contains('flag') && !clickedcell.classList.contains('clicked') && !clickedcell.classList.contains('lose')) {
            if (!timerActive) {
                setTimerActive(true); //It starts the timer if this is the first click of the game
            }
            let pos = clickedcell.id; //The ID of every rendered cell is it's position in the format "x,y"
            const x = parseInt(pos.split(',')[0]);
            const y = parseInt(pos.split(',')[1]);
            const cell = boardState[x][y]
            if (cell.mine) {//If the click was on a mine, ends the game and marks that cell in red
                clickedcell.classList.add('extreme');
                clickedcell.innerHTML = '&#128163';
                messagediv.current.firstChild.innerHTML = 'You lose. Better luck next time!'
                endGame(false);
            }
            else {//If the click wasn't on a mine, check the mines of its neighbors
                let surroundingmines = 0;
                clickedcell.classList.add('clicked');
                for (let row = Math.max(0, x - 1); row <= Math.min(x + 1, rows - 1); row++) {
                    for (let col = Math.max(0, y - 1); col <= Math.min(y + 1, cols - 1); col++) {
                        if (boardState[row][col].mine) {
                            surroundingmines++;
                        }
                    }
                }

                if (surroundingmines === 0) {//If none of the neighbors have mines, checks  the neighbors of the neighbors until it finds mines or the board ends
                    clickedcell.classList.add('none');
                    for (let row = Math.max(0, x - 1); row <= Math.min(x + 1, rows - 1); row++) {
                        for (let col = Math.max(0, y - 1); col <= Math.min(y + 1, cols - 1); col++) {
                            var adjacent = getFromBoard(row, col)
                            if (!adjacent.classList.contains('clicked')) {
                                handleClick(adjacent);//and "clicks" the adjacent cell
                            }
                        }
                    }
                }

                //Sets classes to the cell that changes its color depending of the amount of mines
                else {
                    if (surroundingmines < 3) {
                        clickedcell.classList.add('low');
                    }
                    else if (surroundingmines < 5) {
                        clickedcell.classList.add('mid');
                    }
                    else if (surroundingmines < 7) {
                        clickedcell.classList.add('high');
                    }
                    else {
                        clickedcell.classList.add('extreme');
                    }
                    clickedcell.innerHTML = surroundingmines;
                }
                checkCompletion();//After every click, checks if the game is completed
            }
        }
    }

    //Adds or remove a flag from the rightclicked cell
    const handleRightClick = (e) => {
        if (!timerActive) {
            setTimerActive(true); //It starts the timer if this is the first click of the game
        }
        e.preventDefault();
        let clickedcell = e.target;
        if (!clickedcell.classList.contains('clicked') && !clickedcell.classList.contains('lose')) {//Checks if the game isn't ended and the cell isn't already clicked
            setTimerActive(true);//

            let rmines = leftMines;
            if (clickedcell.classList.contains('flag')) {
                clickedcell.classList.remove('flag');
                clickedcell.innerHTML = '';
                rmines++;
            }
            else {
                clickedcell.classList.add('flag');
                clickedcell.innerHTML = '&#128681';
                rmines--;
            }
            setLeftMines(rmines);//Updates the left mines counter
        }
    }

    //Check if the game is completed
    const checkCompletion = () => {
        if (!levelComplete) {//prevents the function to run if the game is completed
            let checklevelcomplete = true;
            for (let row = 0; row < rows; row++) {//Checks if the unclicked cells have mines
                for (let col = 0; col < cols; col++) {
                    let cell = getFromBoard(row, col);
                    if (!cell.classList.contains('clicked') && boardState[row][col].mine === false) {
                        checklevelcomplete = false;
                        break;
                    }
                }
            }

            //If the game is completed 
            //I used messagediv.current.firstChild.innerHTML because the states have some delay in updating and the game 
            //entered this function several times, producing duplicate data in the game history
            if (checklevelcomplete && messagediv.current.firstChild.innerHTML !== 'Congratulations! You win!') {
                messagediv.current.firstChild.innerHTML = 'Congratulations! You win!';
                setLevelComplete(true)
                setLeftMines(0);
                endGame(true);
                if (load) {//If it's a loaded game and the user wins, it removes the save
                    setLoad(false)
                    localStorage.removeItem("save");
                }
            }
        }
    }

    //It ends the game. Status should be true for win or false for lose
    const endGame = (status) => {
        //Due to something I couldn't find, this function didn't load the proper values of rows, cols and mines if 
        //the game was loaded. Just for that, I reassign the values if necessary        
        if (load) {
            rows = saveData.rows;
            cols = saveData.cols;
            mines = saveData.mines;
        }
        setTimerActive(false);//Stop the timer
        savebutton.current.classList.add('disabled');//Disable the save game button
        for (let row = 0; row < rows; row++) {//Display every mine on the board
            for (let col = 0; col < cols; col++) {
                let element = getFromBoard(row, col);
                element.classList.add('lose');
                if (boardState[row][col].mine) {
                    element.innerHTML = '&#128163';
                }
            }
        }
        addToHistory(status);//Add the game to the game history
    }

    //It restarts all the counters and creates a new random board with the same parameters of the previous game
    const restart = () => {
        setLevelComplete(false);
        setLoad(false);
        setTimerActive(false);
        setElapsedTime([0, 0, 0])
        messagediv.current.firstChild.innerHTML = ''

        savebutton.current.classList.remove('disabled')//Enable the save button if it's disabled
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let cell = getFromBoard(row, col);
                cell.classList = 'cell';
                cell.innerHTML = '';
            }
        }
        setBoardState([]);
        createBoard(rows, cols, mines, true);
        setLeftMines(mines);
    }

    //It adds the finished game to the history
    const addToHistory = (status) => {
        let prevhistory = (JSON.parse(localStorage.getItem('hist')));
        let thisgame = {
            difficulty: diff + '(' + rows + 'x' + cols + ', ' + mines + 'mines)',
            time: elapsedTime[0] + 'h ' + elapsedTime[1] + 'm ' + elapsedTime[2] + 's',
            status: status,
            start: startTime,
            endtime: getCurrentTime()
        };
        if (!prevhistory) {
            prevhistory = [];
            prevhistory.push(thisgame);
            localStorage.setItem("hist", JSON.stringify(prevhistory));
        }
        else {
            prevhistory.push(thisgame);
            localStorage.setItem("hist", JSON.stringify(prevhistory));
        }

    }

    //It saves the game
    const saveGame = () => {
        var boardcode = [];
        var flagcode = [];
        var clickedcode = [];

        //For this function, I use arrays. One for the mines, one for the flags and one for the clicked cells.
        //The data saved is one array per row of the board, and in each one it have the position number of the columns
        //that contains flags, mines or clicks.
        for (let row = 0; row < rows; row++) {
            let tempboardcode = [];
            let tempflagcode = [];
            let tempclickedcode = [];
            for (let col = 0; col < cols; col++) {
                let element = getFromBoard(row, col);
                let currentboard = boardState[row][col];
                if (currentboard.mine) {
                    tempboardcode.push(col)
                }
                if (element.classList.contains('flag')) {
                    tempflagcode.push(col);
                }
                if (element.classList.contains('clicked')) {
                    tempclickedcode.push(col);
                }
            }
            boardcode.push(tempboardcode);
            flagcode.push(tempflagcode);
            clickedcode.push(tempclickedcode);

        }
        //It also saves the started and elapsed time and the board parameters
        let tosavedata = { dif, startTime, elapsedTime, rows, cols, mines, leftMines, boardcode, flagcode, clickedcode }
        localStorage.setItem("save", JSON.stringify(tosavedata));

    }

    //At the beginning check if it's a new or loaded game
    useEffect(() => {
        if (load) {
            loadinfo();
        }
        else {
            newGame();
        }
    }, []);

   //It executes if it's a loaded game and the data is already in the saveData state
    useEffect(() => {
        if (saveData !== null) {
            loadBoard();
        }
    }, [saveData]);

    //It executes if it's a loaded game and the board is already created
    useEffect(() => {
        if (load && loaded) {
            loadGameData();
        }
    }, [loaded]);


    return (
        <>
            <div ref={ref} id='board'>
                {boardState.map((element, key) => (
                    <div className='cellrow' id={key} key={key}>
                        {
                            element.map((val, key) => (
                                <Cell key={key} pos={val.position} clickCallback={element => handleClick(element.target)} rightClickCallback={handleRightClick} />
                            ))
                        }
                    </div>
                ))}
            </div>
            <div className="mt-2 mb-2 buttons">
                <button ref={savebutton} className='btn btn-dark' onClick={saveGame}> Save game</button>

                <button className='btn btn-danger' onClick={restart}> Restart</button>
            </div>
            <div ref={messagediv}>
                <h1></h1>
            </div>
        </>
    )

}
export default Board