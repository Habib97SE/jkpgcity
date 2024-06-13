import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import ForgotPassword from "../components/LoginForm/ForgotPassword";
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { useSelector } from "react-redux";


function Login() {

    const user = useSelector(state => state.user);

    if (user.isAuthenticated) {
        window.location.href = "/profile";
    }


    return (
        <div className={"container-fluid"}>
            <div className={"row justify-content-center"}>
                <div className={"col-12"}>
                    <img className={"img-fluid"} src={"https://placehold.co/1600x600"} alt={"logo"} />
                </div>
                <div className={"col-sm-12 col-md-8 col-lg-5"}>
                    <div className={"text-center"}>
                        <h1>Welcome back</h1>
                        <p>Don't have an account? <a href={"/register"}>Register</a></p>
                    </div>
                    <LoginForm />
                    <div>
                        <ForgotPassword />
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary col-xs-12 col-sm-12 col-md-6">
                            <FaFacebookF /> Continue with Facebook
                        </button>
                        <button className={"btn btn-danger col-xs-12 col-sm-12 col-md-6"}>
                            <FaGoogle /> Continue with Google
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;