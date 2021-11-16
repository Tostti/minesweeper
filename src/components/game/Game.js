import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import Board from './Board'
import { useHistory } from 'react-router'

const Game = (props) => {
    let { width, height, mines, dif } = props.location.state === undefined?{width:0,height:0,mines:0,dif:''}:props.location.state.params;
    const [leftMines, setLeftMines] = useState(mines);
    const [elapsedTime, setElapsedTime] = useState([0, 0, 0]);
    const [timerActive, setTimerActive] = useState(false);
    const [load, setLoad] = useState(props.location.state === undefined?null:props.location.state.load);
    const timerInterval = useRef();
    const history = useHistory();

    //It adds one second to the timer. If it reachs 60, sets to 0 and add a minute. And the same for the hour
    const addTime = () => {
        let time = elapsedTime;
        time[2]++;
        if (time[2] >= 60) {
            time[2] = 0;
            time[1]++;
        }
        if (time[1] >= 60) {
            time[1] = 0;
            time[0]++
        }
        setElapsedTime([time[0], time[1], time[2]]);

    }

    //It starts the timer when timerActive state is true and stops it if it's false
    useEffect(() => {
        console.log(props);
        if (timerActive) {
            timerInterval.current = setInterval(() => {
                addTime();
            }, 1000);
        }
        return () => clearInterval(timerInterval.current);
    }, [timerActive])

    useEffect(() => {
        if(props.location.state === undefined){
            history.replace("/menu");//Avoids hardcodding the path without props
        }
    }, [])

    return (
        <div className="container">
            <Header leftMines={leftMines} elapsedTime={elapsedTime} />
            <Board timerActive={timerActive} dif={dif} srows={height} scols={width} smines={mines} elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} load={load} setLoad={setLoad} leftMines={leftMines} setLeftMines={setLeftMines} setTimerActive={setTimerActive} />
        </div>
    )
}

export default Game
