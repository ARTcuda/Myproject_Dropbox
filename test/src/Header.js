import React from "react";
import logo from './logo_2017.png'
import 'bootstrap/dist/css/bootstrap.css'
import './Header.css'


export default function Header() {
    return (
    <div class="container p-1 my-1">
        <nav class="navbar navbar-blue">
            <a class="navbar-brand" href="#">
                <img src={logo} alt="" width="250" height="50" class="d-inline-block align-text-top"/>
                Demo
            </a>
        </nav>
    </div>
    )
}
