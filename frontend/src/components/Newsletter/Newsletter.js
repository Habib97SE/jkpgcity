import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NewsletterController from "../../controller/NewsletterController";


const schema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Email is required"),
});

function Newsletter() {

    const [successMessage, setSuccessMessage] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const {
        email,
        handleEmail,
        handleOnSubmit
    } = NewsletterController();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await handleOnSubmit(data);
            if (response.status === 200) {
                setSuccessMessage("You have been successfully subscribed to our newsletter");
                setErrorMessage("");
                setIsLoading(false);
            } else {
                setErrorMessage("There was an error. Please try again");
                setSuccessMessage("");
                setIsLoading(false);
            }
        } catch (e) {
            setErrorMessage("There was an error. Please try again");
            setSuccessMessage("");
            setIsLoading(false);
        }
    }

    return (
        <form className={"form-inline"} onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
                <button className={"btn btn-outline-light"} style={{ color: "gray" }}><FaEnvelope /></button>
                <input
                    {...register("email")}
                    type="email"
                    className="form-control rounded mx-2"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmail}
                    required={true}
                />

                <button className="btn btn-dark rounded mx-2" type="submit">{
                    isLoading ? <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div> : "Subscribe"
                }</button>
            </div>
            {errors.email && <div className="alert alert-danger">{errors.email.message}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </form>
    );
}

export default Newsletter;