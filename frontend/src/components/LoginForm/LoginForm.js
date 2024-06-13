import React, { useState } from "react";
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UserController from "../../controller/UserController";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Validate from "../../utils/Validate"
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../utils/userSlice";


const schema = yup.object().shape({
    email: yup.string().email("Email is not valid.").required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters").matches(/(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$)/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
});



function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const user = useSelector(state => state.user);


    const dispatch = useDispatch();

    const [login, setLogin] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const onSubmit = async (data) => {
        setIsLoading(true);
        if (!Validate.isLoginValid(login.email, login.password)) {
            setError("Invalid email or password");
            setIsLoading(false);
            return;
        }
        const response = await UserController.login(login.email, login.password);
        console.log(response);
        switch (response.status) {
            case 200:
                setError(false);
                setSuccess(true);
                const user = response.data;
                console.log(user);
                dispatch(setUser(user));
                setMessage("Login successful");
                break;
            case 500:
                setError(response.data.message);
                break;
            default:
                setError("An error occurred. Please try again later.");
                break;
        }
        setIsLoading(false);
    }


    if (user.isAuthenticated) {
        return (
            <div className="alert alert-success">
                <p>You are already logged in</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className={"form-group"}>
                    <label htmlFor={"email"}>Email address</label>
                    <div className={"input-group"}>
                        <span className={"btn btn-outline-secondary"}>
                            <MdEmail />
                        </span>
                        <input
                            {...register("email")}
                            onChange={(e) => setLogin({ ...login, email: e.target.value })}
                            type={"email"}
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            id={"email"}
                            value={login.email}
                            placeholder={"Enter email"}
                        />
                    </div>
                    {errors.email && <p className="error text-danger">{errors.email.message}</p>}
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"password"}>Password</label>
                    <div className="input-group">
                        <input
                            {...register("password")}
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            id="password"
                            value={login.password}
                            onChange={(e) => setLogin({ ...login, password: e.target.value })}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleShowPassword}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                    {errors.password && <p className="error text-danger">{errors.password.message}</p>}
                </div>
                <div>
                    <button type="submit" className={"btn btn-primary col-12 my-2"}>{
                        isLoading ? <div className="spinner-border text-light" role="status">
                            <span className="sr-only"></span>
                        </div> : "Login"
                    }</button>
                </div>
                {error && <p className="error text-danger">{error}</p>}
                {success && <p className="success text-success">{message}</p>}
            </div>
        </form>
    );
}

export default LoginForm;