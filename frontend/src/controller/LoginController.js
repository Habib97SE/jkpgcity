import {useState} from "react";
import Login from "../models/Login";

function LoginController() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleOnSubmit = async (data) => {
        return await Login.loginUser(data.email, data.password);
    }

    return {
        email,
        password,
        showPassword,
        handleEmail,
        handlePassword,
        handleShowPassword,
        handleOnSubmit
    };
}

export default LoginController;