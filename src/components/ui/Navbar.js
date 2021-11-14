import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';


export const Navbar = () => {



    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/"
                    >
                        Main menu
                    </NavLink>

                  
                </div>
            </div>
        </nav>
    )
}