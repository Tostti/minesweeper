import React from 'react';
import {NavLink} from 'react-router-dom';


export const Navbar = () => {
    return (
        <div className="container mt-2">
           <ul className="nav nav-pills">
                <li className="nav-item">
                    <NavLink exact to="/" className="nav-link">
                        Main menu 
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink exact to="/history" className="nav-link">
                        Game history
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink  exact to="/game" className="nav-link  disabled">
                        Game
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}