import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ProfileSection from "../components/Profile/ProfileSection";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileSettings from "../components/Profile/ProfileSettings";

function Profile() {

    return (
        <div className={"container-fluid"}>
            <div className={"row col-10 mx-auto my-3 bg-dark-subtle p-2"}>
                <h1 className={"mx-2"} style={{ color: "#4d5966" }}>Profile</h1>
                <div className={"col-xs-12 col-sm-12 col-md-5 col-lg-4 col-xl-3"}>

                </div>
                <div>
                    <Sidebar items={["General", "Settings"]} />
                    <div className="col-8">
                        <ProfileSection />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;