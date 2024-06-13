import React, { useEffect, useState } from "react";

function NewsletterConsent() {
    const [newsletterEmailAddress, setNewsletterEmailAddress] = useState("");
    const [emailAddressIsValid, setEmailAddressIsValid] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        // Extract the query string from the URL
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const emailAddress = urlParams.get("email");

        if (emailAddress) {
            // Regex to validate the email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(emailAddress)) {
                setEmailAddressIsValid(true);
                setNewsletterEmailAddress(emailAddress);
                setError(false);
                setMessage("");
            } else {
                setEmailAddressIsValid(false);
                setError(true);
                setMessage("Invalid email address provided.");
            }
        } else {
            setEmailAddressIsValid(false);
            setError(true);
            setMessage("No email address provided in the query.");
        }
    }, []);

    const handleClick = (e) => {
        if (e.target.checked) {
            setError(false);
            setSuccess(true);
            setMessage("You have successfully subscribed to our newsletter");
        } else {
            setSuccess(false);
            setMessage("You have unsubscribed from our newsletter");
            setError(true);
        }
    };

    return (
        <div
            className="container-fluid"
        >
            <div className="row">
                <div
                    className="bg-white rounded p-5 col-6 m-auto"
                    style={{
                        minHeight: "40vh"
                    }}
                >
                    {emailAddressIsValid && (
                        <div>
                            <p>Subscribe to our newsletter</p>

                            <input type="checkbox" id="newsletterConsent" onClick={handleClick} />
                            <label htmlFor="newsletterConsent" style={{ marginLeft: "5px" }}> I consent to receiving the newsletter</label>
                            <br />
                            {success && <div className="alert alert-success text-center"><p>{message}</p></div>}
                            {error && <div className="alert alert-danger text-center"><p>{message}</p></div>}
                        </div>
                    )}
                    {!emailAddressIsValid && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                            className="alert alert-danger text-center">
                            <p>{message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NewsletterConsent;
