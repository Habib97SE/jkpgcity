import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function NewUser () {
    return (
        <div className={"col-12"}
             style={{
                backgroundColor: "#fff",
                display: "inline-block",
                padding: "20px",
                borderRadius: "10px"
            }}
        >
            <RegisterForm />
        </div>
    );
}

export default NewUser;
