import React, { useEffect, useState } from 'react'

const History = () => {
    const[history,setHistory] = useState(null);

    //It clears the history if the button is clicked
    const clearHistory = () =>{
        setHistory(null);
        localStorage.removeItem('hist')
    }

    //It returns -1 if v1<v2, 1 if v1>v2 or 0 if v1 === v2
    const sortByDifficulty = (v1,v2) =>{       
        let a = v1.difficulty;
        let b = v2.difficulty;

        if (a===b){
            return 0;
        }
        if(a.includes('Custom')){
            return 1
        }
        if(b.includes('Custom')){
            return -1
        }   
        if (a.includes('Easy')){
                return 1;
        }
        
        if (a.includes('Hard')){
            return -1;
    }
        if (a.includes('Medium')){
            if (b.includes('Easy')){
                return -1;
            }
            return 1;
        }   
    }

    //It gets the history data and sorts it 
    const getlist = () =>{ 
        if (localStorage.getItem('hist')) {
            let thistory = (JSON.parse(localStorage.getItem('hist'))); 
            thistory.sort(sortByDifficulty);
            setHistory(thistory);
        }
    }

    //On load, get the data
    useEffect(() => {
        getlist();
    }, [])
    

   

    return (
        <div className="container mt-2">
            <button className="btn btn-dark" onClick={clearHistory} disabled={history===null?true:false}>Clear History</button>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Start time</th>
                        <th>End time</th>
                        <th>Difficulty</th>
                        <th>Time spent</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {history != null ? history.map((val, key) => {
                        return (
                            <tr key={key}>         
                                <td>{val.start}</td>
                                <td>{val.endtime}</td>
                                <td>{val.difficulty}</td>
                                <td>{val.time}</td>
                                <td><span className={val.status?'badge bg-success':'badge bg-danger'}>{val.status?'Won':'Lost'}</span></td>
                            </tr>
                        );
                    }) : null}

                </tbody>
            </table>
            
        </div>
    )
}

export default History
