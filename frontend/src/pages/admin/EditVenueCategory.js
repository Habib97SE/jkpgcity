import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import VenuesController from "../../controller/VenuesController";
import { useParams } from "react-router-dom";

// Define the schema for the form
const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().max(500, "Description is too long")
});

function EditVenueCategory() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    let venueCategoryId = useParams().id;
    const [venueCategory, setVenueCategory] = useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVenueCategory = async () => {
            const response = await VenuesController.getCategory(venueCategoryId);
            setVenueCategory(response.data);
        }
        fetchVenueCategory();
    }, [venueCategoryId]);

    const onSubmit = async (data) => {
        setLoading(true);
        const response = await VenuesController.updateCategory(venueCategoryId, data);
        if (response.message === "Success") {
            setSuccess(true);
            setMessage("Venue category updated successfully");
            // update venue category in state 
            setVenueCategory(response.data);
        } else {
            setError(true);
            setMessage("An error occurred. Please try again");
        }
        setLoading(false);
    }

    if (!venueCategory) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    return (
        <div className={"col-12"}>
            <h1>Edit Venue Category</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"form-group"}>
                    <label htmlFor={"name"}>Name</label>
                    <input
                        {...register("name")}
                        type={"text"}
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        id={"name"}
                        value={venueCategory.name}
                        onChange={(e) => setVenueCategory({ ...venueCategory, name: e.target.value })}
                    />
                    <p className={"text-danger"}>{errors.name?.message}</p>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"description"}>Description</label>
                    <textarea
                        {...register("description")}
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        id={"description"}
                        value={venueCategory.description}
                        onChange={(e) => setVenueCategory({ ...venueCategory, description: e.target.value })}
                    />
                    <p className={"text-danger"}>{errors.description?.message}</p>
                </div>
                <button type={"submit"} className={"btn btn-primary"}>{loading ? "Loading ..." : "Update"}</button>
                <div className="m-2">
                    {success && <div className="alert alert-success" role="alert">{message}</div>}
                    {error && <div className="alert alert-danger" role="alert">{message}</div>}
                </div>
            </form>
        </div>
    );
}

export default EditVenueCategory;
