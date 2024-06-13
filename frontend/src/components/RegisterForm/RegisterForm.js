import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UserController from "../../controller/UserController";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


const validationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required').min(2, 'First Name must be at least 2 characters'),
    lastName: yup.string().required('Last Name is required').min(2, 'Last Name must be at least 2 characters'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(/(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$)/, 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
    confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
    agreement: yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});

function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreement: false
    });

    /**
     *  Handle show password, toggle between text and password 
     */
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const onSubmit = async (data) => {
        console.log("onSubmit", data);
        setIsLoading(true);
        const result = await UserController.create(data);
        if (result.message === "Success") {
            setError(false);
            setSuccess(true);
            setMessage("User registered successfully");
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setError(true);
            setSuccess(false);
            setMessage(`Error: ${result.message}`);
            setError(result.data);
        }
    }


    return (
        <form className={"col-12"} onSubmit={handleSubmit(onSubmit)}>
            <div className={"form-group"}>
                <label htmlFor={"first-name"}>First name</label>
                <input
                    {...register("firstName")}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    type={"text"}
                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                    id={"first-name"}
                    value={user.firstName}
                    placeholder={"John"} />
                {errors.firstName && <p className="error text-danger">{errors.firstName.message}</p>}
            </div>
            <div className={"form-group"}>
                <label htmlFor={"last-name"}>Last name</label>
                <input
                    {...register("lastName")}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    type={"text"}
                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                    id={"last-name"}
                    value={user.lastName}
                    placeholder={"Doe"} />
                {errors.lastName && <p className="error text-danger">{errors.lastName.message}</p>}
            </div>
            <div className={"form-group"}>
                <label htmlFor={"email"}>Email address</label>
                <div className={"input-group"}>
                    <span className={"btn btn-outline-secondary"}>
                        <MdEmail />
                    </span>
                    <input
                        {...register("email")}
                        type={"email"}
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        id={"email"}
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder={"Enter email"} />
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
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder={"Password"}
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
            <div className={"form-group"}>
                <label htmlFor={"confirm-password"}>Confirm Password</label>
                <input {...register("confirmPassword")}
                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                    type={"password"}
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    id={"confirm-password"}
                    value={user.confirmPassword}
                    placeholder={"Confirm Password"} />
                {errors.confirmPassword && <p className="error text-danger">{errors.confirmPassword.message}</p>}
            </div>
            <div className="form-group">
                {/* Add checkbox and label for agreement */}
                <div className="form-check m-2">
                    <input
                        {...register("agreement")}
                        type="checkbox"
                        className={`form-check-input ${errors.agreement ? "is-invalid" : ""}`}
                        id="agreement"
                        required={true}
                    />
                    <label className="form-check-label" htmlFor="agreement">I agree to the terms and conditions</label>
                    {errors.agreement && <p className="error text-danger">{errors.agreement.message}</p>}
                </div>
            </div>
            <button type={"submit"} className={"btn btn-primary col-12 my-2"}>{
                isLoading ? <div className="spinner-border text-light" role="status">
                    <span className="sr-only"></span>
                </div> : "Register"
            }</button>
            {error && <div className="alert alert-danger">{message}</div>}
            {success && <div className="alert alert-success">{message}</div>}

        </form>
    );
}

export default RegisterForm;