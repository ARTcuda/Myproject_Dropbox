import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faInstagramSquare, faTwitterSquare, faFacebookSquare } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
    return (
      <div className="container">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Source code</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Dropbox website</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Dropbox API</a></li>
          </ul>
          <div className="d-flex justify-content-between py-4 my-4">
            <p>&copy; 2022 DIY, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <i className="fab fa-instagram">
                  <FontAwesomeIcon icon={faInstagramSquare} />
                  <span style={{ marginLeft: "10px" }}>
                    Instagram
                  </span>
                </i></li>
              <li className="ms-3">
                <i className="fab fa-twitter">
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span style={{ marginLeft: "10px" }}>
                      Facebook
                    </span>
                  </i></li>
              <li className="ms-3"><i className="fab fa-twitter">
                  <FontAwesomeIcon icon={faTwitterSquare} />
                  <span style={{ marginLeft: "10px" }}>
                    Twitter
                  </span>
                </i></li>
            </ul>
          </div>
        </footer>
      </div>

    )
}