import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import VenuesController from "../../controller/VenuesController";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
    name: yup.string().required("Name is required").min(5, "Name must be at least 5 characters").max(100, "Name must be at most 100 characters"),
    category: yup.string().required("Category is required"),
    address: yup.string().required("Address is required").min(5, "Address must be at least 5 characters").max(100, "Address must be at most 100 characters"),
    phone: yup.string().required("Phone is required").matches(/^[0-9]{10}$/, "Phone must be a valid phone number"),
    email: yup.string().required("Email is required").email("Email must be a valid email"),
    website: yup.string().required("Website is required").url("Website must be a valid URL"),
    bio: yup.string().required("Bio is required").min(20, "Bio must be at least 20 characters").max(500, "Bio must be at most 500 characters"),
});


function EditVenue() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [venue, setVenue] = useState({
        name: "",
        venueCategoryId: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        bio: "",
    });


    // Get the id from the URL
    const id = useParams().id;

    const [categories, setCategories] = useState([]);

    const onSubmit = async (data) => {
        setLoading(true);
        const result = await VenuesController.update(id, data);
        if (result.message === "Success") {
            setMessage("Venue updated successfully");
            setError(false);
            setSuccess(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await VenuesController.getCategories();
                const categoryNames = categoriesResponse.map(category => category);
                setCategories(categoryNames);
                const venueResponse = await VenuesController.find(id);
                setVenue(venueResponse.data.data);

            } catch (error) {
                setError(true);
                setMessage("An error occurred. Please try again");
                console.error(error);
            }
        };
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

            <h1>Edit Venue</h1>
            {error && <div className="alert alert-danger">{message}</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        id="name"
                        placeholder="Enter name"
                        value={venue.name}
                        onChange={(e) => setVenue({ ...venue, name: e.target.value })}
                        {...register("name")}
                    />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        className={`form-select ${errors.category ? "is-invalid" : ""}`}
                        id="category"
                        name="venueCategoryId"
                        {...register("category")}
                    >
                        <option value="">Select category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.venueCategoryId}>{category.name}</option>
                        ))}
                    </select>
                    <div className="invalid-feedback">{errors.category?.message}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
                        id="address"
                        placeholder="Enter address"
                        defaultValue={venue.address}
                        {...register("address")}
                    />
                    <div className="invalid-feedback">{errors.address?.message}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        id="phone"
                        placeholder="Enter phone"
                        defaultValue={venue.phone}
                        {...register("phone")}
                    />
                    <div className="invalid-feedback">{errors.phone?.message}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        id="email"
                        placeholder="Enter email"
                        defaultValue={venue.email}
                        {...register("email")}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input
                        type="text"
                        className={`form-control ${errors.website ? "is-invalid" : ""}`}
                        id="website"
                        placeholder="Enter website"
                        defaultValue={venue.website}
                        {...register("website")}
                    />
                    <div className="invalid-feedback">{errors.website?.message}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        className={`form-control ${errors.bio ? "is-invalid" : ""}`}
                        id="bio"
                        placeholder="Enter bio"
                        defaultValue={venue.bio}
                        {...register("bio")}
                    />
                    <div className="invalid-feedback">{errors.bio?.message}</div>
                </div>
                <button type="submit" className="btn btn-primary m-2">
                    {loading ? <div className="spinner-border text-light" role="status">
                        <span className="sr-only"></span>
                    </div> : "Update"}
                </button>
                {success && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{message}</div>}
            </form>
        </div>
    );
}

export default EditVenue;