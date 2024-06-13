import React from "react";
import { FaCheckCircle, FaRegHandshake } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa6";

function About() {
    return (
        <div className="container">
            <div className="row">
                <div className="bg-white p-5 my-2">
                    <h1>About JKPG City!</h1>
                    <p>Our mission is to provide the best service to our customers.</p>
                    <p>Our vision is to be the best in our industry.</p>
                    <p>Our core values are quality, service and innovation.</p>
                    <p>Our goal is to make our customers happy.</p>
                </div>
            </div>
            <div className="row d-flex justify-content-between text-center">
                {/* Create three equal boxes next to each other */}
                <div className="col-3 bg-white p-5">
                    <h2>Quality</h2>
                    <p>We provide the best quality in our industry.</p>
                    <FaCheckCircle style={{ fontSize: "3rem", color: "green" }} />
                </div>
                <div className="col-3 bg-white p-5">
                    <h2>Service</h2>
                    <p>We provide the best service in our industry.</p>
                    <FaRegHandshake style={{ fontSize: "3rem", color: "gray" }} />
                </div>
                <div className="col-3 bg-white p-5">
                    <h2>Innovation</h2>
                    <p>We provide the best innovation in our industry.</p>
                    <FaRegLightbulb style={{ fontSize: "3rem", color: "gold" }} />
                </div>
            </div>
            <div className="row">
                <div className="bg-white p-5 my-2">
                    <h1>Our Team</h1>
                    <p>Our team consists of the best professionals in our industry.</p>
                    <p>Our team is dedicated to providing the best service to our customers.</p>
                    <p>Our team is always looking for new ways to improve our service.</p>
                    <p>Our team is always looking for new ways to improve our products.</p>
                </div>
            </div>
        </div>
    );
}

export default About;