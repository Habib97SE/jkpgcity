import React from "react";
import { useSelector } from "react-redux";
import { FaEnvelope, FaFacebook, FaInstagram, FaPhone, FaTwitter } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ProfilePicture from "./ProfilePicture";
import "./style.css";
import Helper from "../../utils/Helper";

function ProfileSection() {
    const user = useSelector(state => state.user.userData);
    const userAuthenticated = useSelector(state => state.user.isAuthenticated);

    if (!userAuthenticated) {
        window.location.href = "/login";
    }

    const imageSrc = Helper.getAvatarUrl(user.firstName + " " + user.lastName)

    return (
        <div className="col-12">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <ProfilePicture src={imageSrc} />
                        <h5 className="card-title ms-3 mb-0">{user.firstName + ' ' + user.lastName}</h5>
                    </div>
                    <p className="card-text">{user.bio}</p>
                </div>
            </div>
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">Personal details:</h5>
                        <span className="edit-pen">
                            <MdEdit />
                        </span>
                    </div>
                    <div>
                        <div>
                            <p className="card-text"><FaEnvelope />{" " + user.email}</p>
                            <p className="card-text"><FaPhone />{user.phone === null ? " Not entered" : " " + user.phone}</p>
                            <a href={user.facebook} className="btn btn-outline-info col-3 m-2"><p className="card-text d-inline-block"><FaFacebook /></p></a>
                            <a href={user.twitter} className="btn btn-outline-info  col-3 m-2"><p className="card-text"><FaTwitter /></p></a>
                            <a href={user.instagram} className="btn btn-outline-info  col-3 m-2"><p className="card-text"><FaInstagram /></p></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSection;
