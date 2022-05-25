import React from "react";
import logo from './logo_2017.png'
import 'bootstrap/dist/css/bootstrap.css'
import './Header.css'


export default function Header() {
    return (
    <div className="container p-1 my-1">
        <nav className="navbar navbar-blue">
            <a className="navbar-brand" href="#">
                <img src={logo} alt="" width="250" height="50" className="d-inline-block align-text-top"/>
                Demo
            </a>
            <button class="btn btn-secondary btn-lg" type="submit">Login</button>
        </nav>
    </div>
    )
}
