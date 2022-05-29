import React from "react";
import logo from './logo_2017.png'
import 'bootstrap/dist/css/bootstrap.css'
import './Header.css'


export default function Header() {

    const handleClickLogin = () => {
        window.location.href="https://dropbox.com/oauth2/authorize?response_type=token&client_id=ka73scg36t1bp9y&redirect_uri=http://localhost:3000/"
    }

    return (
    <div className="container p-1 my-1">
        <nav className="navbar navbar-blue">
            <a className="navbar-brand" href="#">
                <img src={logo} alt="" width="250" height="50" className="d-inline-block align-text-top"/>
                Demo
            </a>
            <button onClick={handleClickLogin} className="btn btn-info" role="button">Login</button>
        </nav>
    </div>
    )
}
