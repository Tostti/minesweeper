import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Game from '../components/game/Game';
import History from '../components/history/History';
import Menu from '../components/menu/Menu';
import { Navbar } from '../components/ui/Navbar';

export const AppRouter = () => {
    return (
        <div className="background">
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Menu} />
                    <Route exact path="/game" component={Game} />
                    <Route exact path="/history" component={History} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    )
}
