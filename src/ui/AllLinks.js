import React from "react";

import "./allLinks.css"

const AllLinks = ({links,color}) => {

    const getRender = () => {
        return links.map(link => {
            return (
                <a target="__blank" href={`${link.url}`}>
                    <div className="links">
                        {`${link.name}`}
                    </div>
                </a>
            )
        })
    }

    return (
        <div className="allLinks">
            {getRender()}
        </div>
    )
}

export default AllLinks;