import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';


const Menu = () => {
    const history = useHistory();

    const [value, setValue] = useState({
        width: 10,
        height: 10,
        mines: 10
    });

    const { width, height, mines } = value;

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push("/game", {
            params: value, load:false
         });

    }

    const radiochange = ({ target }) => {
        if (target.value === "easy") {
            setValue({ width: 10, height: 10, mines: 10 });
            disableinput();
        }
        else if (target.value === "medium") {
            setValue({ width: 15, height: 15, mines: 40 });
            disableinput();
        }
        else if (target.value === "hard") {
            setValue({ width: 25, height: 25, mines: 100 });
            disableinput();
        }
        else {
            enableinput();
        }
    }

    const disableinput = () => {
        document.getElementById("mines").readOnly = true;
        document.getElementById("width").readOnly = true;
        document.getElementById("height").readOnly = true;
    }

    const enableinput = () => {
        document.getElementById("mines").readOnly = false;
        document.getElementById("width").readOnly = false;
        document.getElementById("height").readOnly = false;
    }
    const valuechange = ({ target }) => {
        if(target.value){
            var e = parseInt(target.value);
        
            if (target.name === "mines") {
                if(target.value > (width*height*0.8)){
                    e = width*height*0.8;
                }
                else if(target.value < 1){
                    e = 1;
                }
            }
            else if (target.value > 50) {
                e = 50;
            }
            else if (target.value < 2) {
                e = 2;
            }
            setValue({
                ...value,
                [target.name]: e
            })
        }
        
    }


    return (
        <>

            <div className="container">
                <h3>New Game</h3>
                <hr />
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
                                <input type="number" name="width" id="width" className="form-control" value={width} onChange={valuechange} min="2" max="50" required readOnly/>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group mb-2">
                                <label>Height</label>
                                <input type="number" name="height" id="height" className="form-control" value={height} onChange={valuechange} min="2" max="50" required readOnly/>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group mb-2">
                                <label>Mines</label>
                                <input type="number" name="mines" id="mines" className="form-control" value={mines} onChange={valuechange} min="1" max="2500" required readOnly/>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <button type="submit" className="btn btn-dark">Start</button>

                </form>
            </div>
        </>
    )
}

export default Menu
