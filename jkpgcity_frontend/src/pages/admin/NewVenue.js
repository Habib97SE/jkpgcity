import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import TinyMCE from "../../components/TinyMCE";
import { newVenueForm } from "../../utils/form-fields";
import VenuesController from "../../controller/VenuesController";

// Define the schema for the form
const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    phone: yup.string().required("Phone is required"),
    email: yup.string().email("Please enter a valid email address").required("Email is required"),
    website: yup.string().url().required("Website is required"),
    category: yup.string().required("Category is required"),
    image: yup.mixed().required("Image is required")
});

/**
 * NewVenue component to add a new venue
 *
 * @example
 * return <NewVenue />
 * @returns {Element} NewVenue component
 */
function NewVenue() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [venueName, setVenueName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    // set the venue categories
    const [venueCategories, setVenueCategories] = useState([]);

    const onSubmit = async (data) => {
        const venue = {
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            website: data.website,
            venueCategoryId: data.category,
            description: description,
            image: data.image[0]
        }
        console.log(venue);
        const result = await VenuesController.create(venue);
        if (result.message === "Success") {
            alert("Venue created successfully");
        }
        else {
            alert("Venue creation failed");
        }
    }

    const handleChangeDescription = (content, editor) => {
        console.log(content.target.value);
        setDescription(content.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            const categories = await VenuesController.getCategories();
            setVenueCategories(categories);
        }
        fetchData();
    }, []);

    return (
        <div className={"col-12"}
            style={{
                backgroundColor: "#fff",
                display: "inline-block",
                padding: "20px",
                borderRadius: "10px"
            }}
        >
            <h1>New Venue</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor={newVenueForm.name.id}>{newVenueForm.name.label}</label>
                    <input
                        {...register("name")}
                        type={newVenueForm.name.type}
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        id={newVenueForm.name.id}
                        placeholder={newVenueForm.name.placeholder}
                        value={venueName}
                        onChange={(e) => setVenueName(e.target.value)}
                    />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor={newVenueForm.address.id}>{newVenueForm.address.label}</label>
                    <input
                        {...register("address")}
                        type={newVenueForm.address.type}
                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
                        id={newVenueForm.address.id}
                        placeholder={newVenueForm.address.placeholder}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && <p className="text-danger">{errors.address.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor={newVenueForm.phone.id}>{newVenueForm.phone.label}</label>
                    <input
                        {...register("phone")}
                        type={newVenueForm.phone.type}
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        id={newVenueForm.phone.id}
                        placeholder={newVenueForm.phone.placeholder}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor={newVenueForm.email.id}>{newVenueForm.email.label}</label>
                    <input
                        {...register("email")}
                        type={newVenueForm.email.type}
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        id={newVenueForm.email.id}
                        placeholder={newVenueForm.email.placeholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor={newVenueForm.website.id}>{newVenueForm.website.label}</label>
                    <input
                        {...register("website")}
                        type={newVenueForm.website.type}
                        className={`form-control ${errors.website ? "is-invalid" : ""}`}
                        id={newVenueForm.website.id}
                        placeholder={newVenueForm.website.placeholder}
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    {errors.website && <p className="text-danger">{errors.website.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor={newVenueForm.category.id}>{newVenueForm.category.label}</label>
                    {venueCategories.length > 0 && (

                        <select
                            {...register("category")}
                            className={`form-select ${errors.category ? "is-invalid" : ""}`}
                            id={newVenueForm.category.id}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select a category</option>
                            {venueCategories.map((category) => (
                                <option key={category.venueCategoryId} value={category.venueCategoryId}>{category.name}</option>
                            ))}
                        </select>
                    )}
                    {errors.category && <p className="text-danger">{errors.category.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor={newVenueForm.description.id}>{newVenueForm.description.label}</label>
                    <TinyMCE
                        id="description"
                        value={description}
                        onChange={handleChangeDescription}
                        register={register}
                        name="description"
                        className={`form-control`}
                    />
                    {errors.description && <p className="text-danger">{errors.description.message}</p>}
                </div>
                <div className="form-group my-2">
                    <label htmlFor={newVenueForm.image.id}>{newVenueForm.image.label}</label>
                    <input
                        {...register("image")}
                        type={newVenueForm.image.type}
                        className={`form-control ${errors.image ? "is-invalid" : ""}`}
                        id={newVenueForm.image.id}
                        value={image}
                        onChange={(e) => console.log(e.target.files[0])}
                    />
                    {errors.image && <p className="text-danger">{errors.image.message}</p>}
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value={"Submit"}
                />
            </form>
        </div>
    );
}

export default NewVenue;