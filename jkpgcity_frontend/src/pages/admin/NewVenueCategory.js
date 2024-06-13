import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import VenuesController from "../../controller/VenuesController";

// Define the schema for the form
const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().max(500, "Description is too long")
});

function NewVenueCategory() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        setLoading(true);
        const result = await VenuesController.createCategory(data);
        if (result.data.message === "Success") {
            setSuccess(true);
            setError(false);
            setMessage("Venue category added successfully");
        }
        else {
            setError(true);
            setMessage("An error occurred. Please try again");
        }
        setLoading(false);
    }

    return (
        <div className={"col-12"}>
            <h1>New Venue Category</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"form-group"}>
                    <label htmlFor={"name"}>Name</label>
                    <input
                        type={"text"}
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        id={"name"}
                        {...register("name")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className={"text-danger"}>{errors.name?.message}</p>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"description"}>Description</label>
                    <textarea
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        id={"description"}
                        {...register("description")}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <p className={"text-danger"}>{errors.description?.message}</p>
                </div>
                <button type={"submit"} className={"btn btn-primary"}>{loading ? "Loading ..." : "Add new venue category"}</button>
                {success && <p className={"text-success"}>{message}</p>}
                {error && <p className={"text-danger"}>{message}</p>}
            </form>
        </div>
    )
}

export default NewVenueCategory;