import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UserController from "../../controller/UserController";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required").min(2, "First Name must be at least 2 characters").max(100, "First Name must be at most 100 characters"),
    lastName: yup.string().required("Last Name is required").min(2, "Last Name must be at least 2 characters").max(100, "Last Name must be at most 100 characters"),
    email: yup.string().required("Email is required").email("Email must be a valid email"),
    role: yup.string().required("Role is required"),
    phone: yup.string().required("Phone is required").matches(/^[0-9]{10}$/, "Phone must be a valid phone number"),
    bio: yup.string().max(500, "Bio must be at most 500 characters"),
    facebook: yup.string().url("Facebook must be a valid URL"),
    twitter: yup.string().url("Twitter must be a valid URL"),
    instagram: yup.string().url("Instagram must be a valid URL"),
});

function EditUser() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { id } = useParams();


    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        phone: "",
        bio: "",
        facebook: "",
        twitter: "",
        instagram: "",
    });

    const [roles, setRoles] = useState([]);

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const onSubmit = async (data) => {
        const result = await UserController.update(id, data);
        if (result.message === "Success") {
            setError(false);
            setSuccess(true);
            setMessage("User updated successfully");
        } else {
            setError(true);
            setSuccess(false);
            setMessage("An error occurred. Please try again");
        }

    }

    useEffect(() => {
        const fetchData = async () => {

            const response = await UserController.get(id);

            if (response != null) {
                setUser(response);
            }
            const roles = await UserController.getRoles();
            setRoles(roles);
        }
        fetchData();
    }, [id]);



    return (
        <div
            className={"col-md-12"}
            style={{
                backgroundColor: "#fff",
                display: "inline-block",
                padding: "20px",
                borderRadius: "10px"
            }}
        >
            <h1>Edit User</h1>
            <p>Edit user</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group my-4">
                    <label htmlFor={"firstName"}>First Name</label>
                    <input
                        {...register("firstName")}
                        name={"firstName"}
                        type={"text"}
                        className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        placeholder={"First Name"}
                        value={user.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    />
                    {errors.firstName && <p className={"text-danger"}>{errors.firstName.message}</p>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor={"lastName"}>Last Name</label>
                    <input
                        {...register("lastName")}
                        name={"lastName"}
                        type={"text"}
                        className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                        placeholder={"Last Name"}
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    />
                    {errors.lastName && <p className={"text-danger"}>{errors.lastName.message}</p>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor={"email"}>Email</label>
                    <input
                        {...register("email")}
                        name={"email"}
                        type={"email"}
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        placeholder={"Email"}
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    {errors.email && <p className={"text-danger"}>{errors.email.message}</p>}
                </div>

                <div className="form-group my-4">
                    <label htmlFor="role">Role</label>
                    <select
                        {...register("role")}
                        name="role"
                        className={`form-select ${errors.role ? "is-invalid" : ""}`}
                        value={user.roleId}
                        onChange={(e) => setUser({ ...user, roleId: e.target.value })}
                    >

                        {roles.map(role => (
                            <option key={role.roleId} value={role.roleId}>
                                {role.roleName}
                            </option>
                        ))}
                    </select>
                    {errors.role && <p className="text-danger">{errors.role.message}</p>}
                </div>

                <div className="form-group my-4">
                    <label htmlFor={"phone"}>Phone</label>
                    <input
                        {...register("phone")}
                        name={"phone"}
                        type={"text"}
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        placeholder={"Phone"}
                        value={user.phone}
                        onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    />
                    {errors.phone && <p className={"text-danger"}>{errors.phone.message}</p>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor={"bio"}>Bio</label>
                    <textarea
                        {...register("bio")}
                        name={"bio"}
                        className={`form-control ${errors.bio ? "is-invalid" : ""}`}
                        placeholder={"Bio"}
                        value={user.bio}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    />
                    {errors.bio && <p className={"text-danger"}>{errors.bio.message}</p>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor={"facebook"}>Facebook</label>
                    <input
                        {...register("facebook")}
                        name={"facebook"}
                        type={"text"}
                        className={`form-control ${errors.facebook ? "is-invalid" : ""}`}
                        placeholder={"Facebook"}
                        value={user.facebook}
                        onChange={(e) => setUser({ ...user, facebook: e.target.value })}
                    />
                    {errors.facebook && <p className={"text-danger"}>{errors.facebook.message}</p>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor={"twitter"}>Twitter</label>
                    <input
                        {...register("twitter")}
                        name={"twitter"}
                        type={"text"}
                        className={`form-control ${errors.twitter ? "is-invalid" : ""}`}
                        placeholder={"Twitter"}
                        value={user.twitter}
                        onChange={(e) => setUser({ ...user, twitter: e.target.value })}
                    />
                    {errors.twitter && <p className={"text-danger"}>{errors.twitter.message}</p>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor={"instagram"}>Instagram</label>
                    <input
                        {...register("instagram")}
                        name={"instagram"}
                        type={"text"}
                        className={`form-control ${errors.instagram ? "is-invalid" : ""}`}
                        placeholder={"Instagram"}
                        value={user.instagram}
                        onChange={(e) => setUser({ ...user, instagram: e.target.value })}
                    />
                    {errors.instagram && <p className={"text-danger"}>{errors.instagram.message}</p>}
                </div>
                <button type={"submit"} className={"btn btn-primary"}>Submit</button>
            </form>
            <div className="row">
                {error && <div className="alert alert-danger">{message}</div>}
                {success && <div className="alert alert-success">{message}</div>}
            </div>
        </div>
    );
}

export default EditUser;

