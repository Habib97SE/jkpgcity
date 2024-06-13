import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function CookieBar() {

    const [consent, setConsent] = useState(false);

    useEffect(() => {
        // check if the user has already accepted the cookie policy
        const userConsent = Cookies.get("cookie_consent");
        if (userConsent === "accepted") {
            setConsent(true);
        }
    }, []);

    const handleAcceptClick = () => {
        // add cookie to the browser to remember the user's choice
        Cookies.set("cookie_consent", "accepted", { expires: 365 });
        setConsent(true);
    }

    const handleDeclineClick = () => {
        // add cookie to the browser to remember the user's choice
        Cookies.set("cookie_consent", "declined", { expires: 365 });
        document.querySelector(".cookieBar").style.display = "none";
        setConsent(false);
    }

    // if user has already accepted the cookie policy, do not show the cookie bar
    if (consent) {
        return null;
    }

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000
            }}
            className="bg-dark text-center text-white p-2 cookieBar">
            <p className="m-0">We use cookies to ensure that we give you the best experience on our website. If you continue to use this site we will assume that you are happy with it.</p>
            <div className="m-2 p-2">
                <button className="btn btn-primary mx-2" onClick={handleAcceptClick}>Accept</button>
                <button className="btn btn-danger" onClick={handleDeclineClick}>Decline</button>
            </div>
        </div>
    );
}

export default CookieBar;