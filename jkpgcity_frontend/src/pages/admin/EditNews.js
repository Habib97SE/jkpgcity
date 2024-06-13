import React, {useEffect, useState} from "react";
import { useForm} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import NewsController from "../../controller/NewsController";


const schema = yup.object().shape({
    title: yup.string().required("Title is required").min(5, "Title must be at least 5 characters").max(100, "Title must be at most 100 characters"),
    content: yup.string().required("Content is required").min(20, "Content must be at least 20 characters"),
    slug: yup.string().required("Slug is required").matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab case (slug)"),
    image: yup.string().required("Image is required").url("Image must be a valid URL"),
    category: yup.string().required("Category is required"),
    summary: yup.string().required("Summary is required").min(20, "Summary must be at least 20 characters").max(200, "Summary must be at most 200 characters"),
    published: yup.boolean().required("Published is required"),
});


function EditNews ({ id }) {
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

    const onSubmit = (data) => {
        NewsController.update(id, data).then(r => console.log(r)).catch(e => console.error(e));
    }

    useEffect(() => {
        // fetch data from the server
        const news = NewsController.find(id);
        setTitle(news.title);
        setContent(news.content);
        setSlug(news.slug);
        setImage(news.image);
        setCategory(news.category);
        setSummary(news.summary);
        setPublished(news.published);
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
            <h1>Edit News</h1>
            <p>Edit news</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group my-4">
                    <label htmlFor={"title"}>Title</label>
                    <input
                        {...register("title")}
                        name={"title"}
                        type={"text"}
                        className={`form-control ${errors.title ? "is-invalid" : ""}`}
                        placeholder={"Title"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <div className={"invalid-feedback"}>{errors.title.message}</div>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor={"content"}>Content</label>
                    <textarea
                        {...register("content")}
                        name={"content"}
                        className={`form-control ${errors.content ? "is-invalid" : ""}`}
                        placeholder={"Content"}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {errors.content && <div className={"invalid-feedback"}>{errors.content.message}</div>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor={"slug"}>Slug</label>
                    <input
                        {...register("slug")}
                        name={"slug"}
                        type={"text"}
                        className={`form-control ${errors.slug ? "is-invalid" : ""}`}
                        placeholder={"Slug"}
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                    />
                    {errors.slug && <div className={"invalid-feedback"}>{errors.slug.message}</div>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor={"image"}>Image</label>
                    <input
                        {...register("image")}
                        name={"image"}
                        type={"text"}
                        className={`form-control ${errors.image ? "is-invalid" : ""}`}
                        placeholder={"Image"}
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    {errors.image && <div className={"invalid-feedback"}>{errors.image.message}</div>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor={"category"}>Category</label>
                    <select
                        {...register("category")}
                        name={"category"}
                        className={`form-control ${errors.category ? "is-invalid" : ""}`}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value={""}>Select a category</option>
                        <option value={"technology"}>Technology</option>
                        <option value={"sports"}>Sports</option>
                        <option value={"politics"}>Politics</option>
                    </select>
                    {errors.category && <div className={"invalid-feedback"}>{errors.category.message}</div>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor={"summary"}>Summary</label>
                    <textarea
                        {...register("summary")}
                        name={"summary"}
                        className={`form-control ${errors.summary ? "is-invalid" : ""}`}
                        placeholder={"Summary"}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />
                    {errors.summary && <div className={"invalid-feedback"}>{errors.summary.message}</div>}
                </div>
                <div className="form-group my-4">
                    <label htmlFor={"published"}>Published</label>
                    <input
                        {...register("published")}
                        name={"published"}
                        type={"checkbox"}
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                    />
                    {errors.published && <div className={"invalid-feedback"}>{errors.published.message}</div>}
                </div>
                <button type={"submit"} className={"btn btn-primary"}>Edit News</button>
            </form>
        </div>
    );
}

export default EditNews;