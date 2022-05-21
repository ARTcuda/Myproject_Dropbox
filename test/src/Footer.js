import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faInstagramSquare, faTwitterSquare, faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
      <div class="container">
        <footer class="py-3 my-4">
          <ul class="nav justify-content-center border-bottom pb-3 mb-3">
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Source code</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Dropbox website</a></li>
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Dropbox API</a></li>
          </ul>
          <div class="d-flex justify-content-between py-4 my-4">
            <p>&copy; 2022 DIY, Inc. All rights reserved.</p>
            <ul class="list-unstyled d-flex">
              <li class="ms-3">
                <i className="fab fa-instagram">
                  <FontAwesomeIcon icon={faInstagramSquare} />
                  <span style={{ marginLeft: "10px" }}>
                    Instagram
                  </span>
                </i></li>
              <li class="ms-3">
                <i className="fab fa-twitter">
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span style={{ marginLeft: "10px" }}>
                      Facebook
                    </span>
                  </i></li>
              <li class="ms-3"><i className="fab fa-twitter">
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