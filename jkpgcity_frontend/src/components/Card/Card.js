import React from "react";
import "./Card.css";

function Card({title, image, text, additionalStyle, imageInLeft = true}) {
    return (
        <div className="card my-4 d-flex flex-row">
            <div className="col-md-6">
                <img src={image} className="w-100 card-img" alt={title}/>
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5"
                 style={additionalStyle}>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
            </div>
        </div>
    );
}


export default Card;