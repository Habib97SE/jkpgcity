import React from "react";
import "./SocialMedia.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function SocialMedia() {

    return (
        <div className="bg-light container-fluid">
            <div className="row">
                <div className="col-12 text-center py-2">
                    <h1 className="text-center">Follow Us</h1>
                    <FaFacebook className="social-icon" style={{ color: "#4267B2" }} />
                    <FaTwitter className="social-icon" style={{ color: "#1DA1F2" }} />
                    <FaInstagram className="social-icon" style={{ color: "#E4405F" }} />
                    <FaLinkedin className="social-icon" style={{ color: "#0A66C2" }} />
                </div>
            </div>
        </div>
    );
}

export default SocialMedia;


