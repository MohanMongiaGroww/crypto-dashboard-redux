import React from "react";

import "./pageNotFound.css";


const PageNotFound = () =>{

    return (
        <div className="pageNotFound">
            <div>
                <i class="fas fa-times-circle"></i>
                <span>
                    Oops! Page not found
                </span>
            </div>
        </div>
    )
}

export default PageNotFound;