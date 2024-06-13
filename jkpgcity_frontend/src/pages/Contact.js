import React, { useState, useEffect } from "react";
import { MdOutlinePhone } from "react-icons/md";
import { FaRegEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoLocationOutline, IoPaperPlane } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { contactForm } from "../utils/form-fields";

const validationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required').min(2, 'First Name must be at least 2 characters'),
    lastName: yup.string().required('Last Name is required').min(2, 'Last Name must be at least 2 characters'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone is required').matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Phone number is not valid'),
    message: yup.string().required('Message is required').min(5, 'Message must be at least 5 characters')
});

function Contact() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    // store contact form data
    const [contact, setContact] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log("onSubmit", data);
        setError(false);
        setSuccess(true);
        setMessage("Message sent successfully");
        setIsLoading(false);
    }


    useEffect(() => {
        document.title = "Contact us - Jönköping City";
    }, [])

    return (
        <div className="container">
            <div className="row col-12">
                <div
                    style={{
                        paddingLeft: "2rem"
                    }}
                    className="col-6 bg-white py-5 my-5 m-auto">
                    <h1>Contact</h1>
                    <p>Any questions? We would like to help you!</p>
                    <div className="py-5">
                        <button className="btn btn-outline-dark d-block my-3 col-10 m-auto">
                            <MdOutlinePhone /> +46 36 10 10 00
                        </button>
                        <button className="btn btn-primary d-block my-3 col-10 m-auto">
                            <FaRegEnvelope /> info@jkpgcity.se
                        </button>
                        <button className="btn btn-outline-dark d-block my-3 col-10 m-auto">
                            <IoLocationOutline />  Jönköping, Sweden
                        </button>
                    </div>
                    <footer
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "50%",
                            margin: "auto"
                        }}
                    >
                        <FaFacebook style={{ fontSize: "2rem" }} />
                        <FaTwitter style={{ fontSize: "2rem" }} />
                        <FaInstagram style={{ fontSize: "2rem" }} />
                        <FaLinkedin style={{ fontSize: "2rem" }} />
                    </footer>
                </div>
                <div className="col-6 bg-white py-5 my-5"
                    style={{
                        paddingLeft: "2rem",
                        borderLeft: "1px solid #ccc"
                    }}
                >
                    <form className="col-10 m-auto" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group py-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text">First and Last name:</span>
                            </div>
                            <input
                                {...register("firstName")}
                                type={contactForm.firstName.type}
                                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                placeholder={contactForm.firstName.placeholder}
                                value={contact.firstName}
                                onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                            />
                            <input
                                {...register("lastName")}
                                type={contactForm.lastName.type}
                                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                placeholder={contactForm.lastName.placeholder}
                                value={contact.lastName}
                                onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                            />
                        </div>
                        {errors.firstName && <p className="error text-danger">{errors.firstName.message}</p>}
                        {errors.lastName && <p className="error text-danger">{errors.lastName.message}</p>}
                        <div className="form-group py-2">
                            <label htmlFor={contactForm.email.id}>{contactForm.email.label}</label>
                            <input
                                {...register("email")}
                                type={contactForm.email.type}
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                id={contactForm.email.id}
                                placeholder={contactForm.email.placeholder}
                                value={contact.email}
                                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                            />
                            {errors.email && <p className="error text-danger">{errors.email.message}</p>}
                        </div>
                        <div className="form-group py-2">
                            <label htmlFor={contactForm.phone.id}>{contactForm.phone.label}</label>
                            <input
                                {...register("phone")}
                                type={contactForm.phone.type}
                                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                id={contactForm.phone.id}
                                placeholder={contactForm.phone.placeholder}
                                value={contact.phone}
                                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                            />
                            {errors.phone && <p className="error text-danger">{errors.phone.message}</p>}
                        </div>
                        <div className="form-group py-2">
                            <label htmlFor={contactForm.message.id}>{contactForm.message.label}</label>
                            <textarea
                                {...register("message")}
                                value={contact.message}
                                onChange={(e) => setContact({ ...contact, message: e.target.value })}
                                className={`form-control ${errors.message ? "is-invalid" : ""}`}
                                id={contactForm.message.id}

                                rows="3"
                            >
                            </textarea>
                            {errors.message && <p className="error text-danger">{errors.message.message}</p>}
                        </div>
                        <div className="form-check py-2">
                            <input type="checkbox" className="form-check-input" id="agreement" required={true} />
                            <label className="form-check-label" htmlFor="agreement">I agree the privacy policy and how <strong>JKPG City</strong> handles my personal data.</label>
                        </div>
                        <button type="submit" className="btn btn-primary my-3 py-2 col-12">
                            {isLoading ? <div className="spinner-border text-light" role="status"></div> : <span>Send < IoPaperPlane /></span>}
                        </button>
                    </form>
                    {success && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{message}</div>}
                </div>
            </div>
        </div>
    );
}

export default Contact;