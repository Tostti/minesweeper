import React, { createRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

const Menu = () => {
    const history = useHistory();
    const loadbutton = createRef();
    const [value, setValue] = useState({
        width: 10,
        height: 10,
        mines: 10,
        dif:'Easy'
    });
    const { width, height, mines, dif } = value;

  //On clicking "new game", sends the game parameters to the Game component and redirects to the game
    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/game", {
            params: value, load: false, dif
        });

    }

    //On clicking "load game", it redirects to the game and sends load:true to the component
    const handleLoad = () =>{
        history.push("/game", {
            params: value, load: true
        });
    }

    //It sets the default values of each difficulty and enables/disables the input for the custom values
    const radiochange = ({ target }) => {
        if (target.value === "easy") {
            setValue({ width: 10, height: 10, mines: 10, dif:'Easy' });
            disableinput();
        }
        else if (target.value === "medium") {
            setValue({ width: 15, height: 15, mines: 40, dif:'Medium'});
            disableinput();
        }
        else if (target.value === "hard") {
            setValue({ width: 25, height: 25, mines: 100, dif:'Hard' });
            disableinput();
        }
        else {
            enableinput();
        }
    }

    //Disalbles the input
    const disableinput = () => {
        document.getElementById("mines").readOnly = true;
        document.getElementById("width").readOnly = true;
        document.getElementById("height").readOnly = true;
    }

    //Enables the input
    const enableinput = () => {
        document.getElementById("mines").readOnly = false;
        document.getElementById("width").readOnly = false;
        document.getElementById("height").readOnly = false;
    }

    //Sets the new values to the state if some value change
    const valuechange = ({ target }) => {
        if (target.value) {
            let e = parseInt(target.value);
            if (target.name === "mines") {//Mines have a limit of 80% of the board, and can't be less than one
                if (target.value > (width * height * 0.8)) {
                    e = width * height * 0.8;
                }
                else if (target.value < 1) {
                    e = 1;
                }
            }
            else if (target.value > 50) {//Width and height can't be less than 2 or more than 50
                e = 50;
            }
            else if (target.value < 2) {
                e = 2;
            }
            setValue({
                ...value,
                [target.name]: e,
                dif:'Custom'
            })
        }

    }

    //Checks if there's a saved game and enables the load game button
    useEffect(() => {
        if (localStorage.getItem('save')) {
            loadbutton.current.classList.remove('disabled')
        }
    }, []);

    return (
        <>
            <div className="container">
                <h3>New Game</h3>
                <form onSubmit={handleSubmit} >
                    <div onChange={radiochange}>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="difficultyradios" id="easyradio" value="easy" defaultChecked />
                            <label className="form-check-label">
                                Easy
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="difficultyradios" id="mediumradio" value="medium" />
                            <label className="form-check-label">
                                Medium
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="difficultyradios" id="hardradio" value="hard" />
                            <label className="form-check-label">
                                Hard
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="difficultyradios" id="customradio" value="custom" />
                            <label className="form-check-label">
                                Custom
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <div className="form-group mb-2">
                                <label>Width</label>
                                <input type="number" name="width" id="width" className="form-control" value={width} onChange={valuechange} min="2" max="50" required readOnly />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group mb-2">
                                <label>Height</label>
                                <input type="number" name="height" id="height" className="form-control" value={height} onChange={valuechange} min="2" max="50" required readOnly />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group mb-2">
                                <label>Mines</label>
                                <input type="number" name="mines" id="mines" className="form-control" value={mines} onChange={valuechange} min="1" max="2500" required readOnly />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-dark mt-5">Start</button>

                </form>

                <hr />
                <h3>Load Game</h3>

                <button ref={loadbutton} onClick={handleLoad} className="btn btn-dark mb-2 disabled">Start</button>
            </div>


        </>
    )
}

export default Menu
