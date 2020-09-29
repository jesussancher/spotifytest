import React from 'react';
import logo from './logo.svg';
import styles from './styles.css';
import Navbar from './components/navbar'
import NewReleases from './components/newrel/new-releases'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css';

export default function App() {
    return (
        <Router>
            <div>
                <Navbar/>
                <Switch>
                    <Route path="/about">
                        <Home/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/">
                        <NewReleases/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}