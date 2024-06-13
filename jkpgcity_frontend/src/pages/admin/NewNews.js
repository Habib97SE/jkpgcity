import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { newNewsForm } from "../../utils/form-fields";

import NewsController from "../../controller/NewsController";

import TinyMCE from "../../components/TinyMCE";

const schema = yup.object().shape({
    title: yup.string().required("Title is required").min(5, "Title must be at least 5 characters").max(100, "Title must be at most 100 characters"),
    slug: yup.string().required("Slug is required"),
    image: yup.string().required("Image is required"),
    category: yup.number().required("Category is required"),
    summary: yup.string().required("Summary is required").min(20, "Summary must be at least 20 characters").max(200, "Summary must be at most 200 characters"),
    published: yup.boolean().required("Published is required"),
});

/**
 * NewNews component is aimed to create a new news article by using TinyMCE editor.
 * @returns {JSX.Element} NewNews component
 */
function NewNews() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [summary, setSummary] = useState("");
    const [published, setPublished] = useState(false);
    const [categories, setCategories] = useState([]);

    // content error handling
    const [contentError, setContentError] = useState(false);
    const [contentErrorMessage, setContentErrorMessage] = useState("");

    // form submit error handling
    const [submitError, setSubmitError] = useState(false);
    const [message, setMessage] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);

    /**
     * onSubmit function is used to handle form submission, send data to the server and handle the response.
     * @param {Object} data: Form data
     * @returns {Promise<void>}
     */
    const onSubmit = async (data) => {
        if (content.length === 0) {
            setContentError(true);
            setContentErrorMessage("Content is required");
            return;
        }
        // Update the data object to include all form fields
        data = {
            ...data,
            title: title.trim(),
            content: content.trim(),
            slug: slug.trim(),
            image: image.trim(),
            newsCategoryId: parseInt(category.trim()),
            summary: summary.trim(),
            published: published,
            authorId: 2, // Assuming this is static for now
            likes: 0,
            views: 0
        };
        console.log("Submitting Data:", data);
        const result = await NewsController.create(data);
        if (result.message === "Success") {
            setSubmitSuccess(true);
            setMessage("News article created successfully");
            setSubmitError(false);
        } else {
            setSubmitError(true);
            setMessage(`Error: ${result.message}`);
            setSubmitSuccess(false);
        }
    };


    const handleChangeContent = (content) => {
        setContent(content.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await NewsController.getCategories();
            setCategories(result.data);
        };

        fetchData();


    }, []);



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
            <h1>New News</h1>
            <p>Add news</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title, input[text]: News article title */}
                <div className="form-group my-4">
                    <label htmlFor={newNewsForm.title.id}>{newNewsForm.title.label}</label>
                    <input
                        {...register("title")}
                        name={newNewsForm.title.id}
                        type={newNewsForm.title.type}
                        className={`form-control ${errors.title ? "is-invalid" : ""}`}
                        placeholder={newNewsForm.title.placeholder}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <p className={"text-danger"}>{errors.title.message}</p>}
                </div>
                {/* Content, textarea: Content of the article */}
                <div className="form-group my-4">
                    <label>{newNewsForm.content.label}</label>
                    <TinyMCE
                        id={newNewsForm.content.id}
                        value={content}
                        onChange={handleChangeContent}
                        register={register}
                        name={newNewsForm.content.id}
                        className={`form-control`}
                    />
                    {contentError && <p className={"text-danger"}>{contentErrorMessage}</p>}
                </div>
                {/* Slug, input[text]: To set the slug of the article */}
                <div className="form-group my-4">
                    <label htmlFor={newNewsForm.slug.id}>{newNewsForm.slug.label}</label>
                    <input
                        {...register("slug")}
                        name={newNewsForm.slug.id}
                        type={newNewsForm.slug.type}
                        id={newNewsForm.slug.id}
                        className={`form-control ${errors.slug ? "is-invalid" : ""}`}
                        placeholder={newNewsForm.slug.placeholder}
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                    />
                    {errors.slug && <p className={"text-danger"}>{errors.slug.message}</p>}
                </div>
                {/* Image: input[file]: To upload main image of the article */}
                <div className="form-group my-4">
                    <label htmlFor={newNewsForm.image.id}>{newNewsForm.image.label}</label>
                    <input
                        {...register("image")}
                        name={newNewsForm.image.id}
                        type={newNewsForm.image.type}
                        id={newNewsForm.image.id}
                        accept={newNewsForm.image.accept}
                        className={`form-control ${errors.image ? "is-invalid" : ""}`}
                        placeholder={newNewsForm.image.placeholder}
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    {errors.image && <p className={"text-danger"}>{errors.image.message}</p>}
                </div>
                {/* Category, select: The category of written article */}
                <div className="form-group my-4">
                    <label htmlFor={newNewsForm.category.id}>{newNewsForm.category.label}</label>
                    <select
                        {...register("category")}
                        name={newNewsForm.category.id}
                        id={newNewsForm.category.id}
                        className={`form-select ${errors.category ? "is-invalid" : ""}`}
                        value={category}
                        onChange={(e) => {
                            console.log("Selected Category ID:", e.target.value);
                            setCategory(e.target.value);
                        }}
                    >
                        {categories.map((category) => (
                            <option key={category.newsCategoryId} value={category.newsCategoryId}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category && <p className={"text-danger"}>{errors.category.message}</p>}
                </div>
                {/* Summary: textarea: A short text to be shown in the newslist or homepage */}
                <div className="form-group my-4">
                    <label htmlFor={newNewsForm.summary.id}>{newNewsForm.summary.label}</label>
                    <textarea
                        {...register("summary")}
                        name={newNewsForm.summary.id}
                        id={newNewsForm.summary.id}
                        className={`form-control ${errors.summary ? "is-invalid" : ""}`}
                        placeholder={newNewsForm.summary.placeholder}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />
                    {errors.summary && <p className={"text-danger"}>{errors.summary.message}</p>}
                </div>
                {/* Published: select: To choose whether publish the article directly or wait */}
                <div className="form-group my-1">
                    <label htmlFor={newNewsForm.published.id}>{newNewsForm.published.label}</label>
                    <select
                        {...register("published")}
                        name={newNewsForm.published.id}
                        id={newNewsForm.published.id}
                        className={`form-control ${errors.published ? "is-invalid" : ""}`}
                        value={published}
                        onChange={(e) => setPublished(e.target.value)}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    {errors.published && <p className={"text-danger"}>{errors.published.message}</p>}
                </div>

                <br />
                <button type="submit" className="btn btn-primary">
                    Add News
                </button>
            </form>
            {submitError && <div className={"alert alert-danger my-4"}>{message}</div>}
            {submitSuccess && <div className={"alert alert-success my-4"}>{message}</div>}
        </div>
    );
}

export default NewNews;