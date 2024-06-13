import { useState } from "react";
import Newsletter from "../models/Newsletter";

/**
 * NewsletterController: Controller for the Newsletter component
 * @returns {{handleEmail: handleEmail, email: string, handleOnSubmit: (function(*): Promise<Promise<AxiosResponse<any>> | Promise<axios.AxiosResponse<any>> | *>)}}
 * @constructor
 */
function NewsletterController()
{
    const [email, setEmail] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleOnSubmit = async (data) => {
        return Newsletter.subscribe(data.email);
    }

    return {
        email,
        handleEmail,
        handleOnSubmit
    };
}

export default NewsletterController;