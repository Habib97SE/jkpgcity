import React from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import {FaFacebookF, FaGoogle} from "react-icons/fa6";
import "./style.css";

function Register() {
    return (
        <div className="container-fluid">
            <div className="row" style={{height: "100vh"}}>
                {/* Left column for the picture */}
                <div className="col-sm-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src="https://placehold.co/500x500" alt="Registration" className="img-fluid"/>
                </div>
                {/* Right column for the registration form */}
                <div className="col-sm-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="col-8">
                        <h1 className="text-center">Create new account</h1>
                        <RegisterForm/>
                        <div className="text-center">
                            <a href="/login">Already have an account?</a>
                        </div>
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary btn-block-sm" style={{marginBottom: "10px"}}>
                                Continue with Facebook
                            </button>
                            <button className="btn btn-danger btn-block-sm" style={{marginBottom: "10px"}}>
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Register;