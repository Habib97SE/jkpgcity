import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import UserController from "../../controller/UserController";
import NewsController from "../../controller/NewsController";
import CustomDate from "../../utils/CustomDate";
import Helper from "../../utils/Helper";

function NewsCard({ key, article }) {

    const [authorFullName, setAuthorFullName] = useState("");
    const [category, setCategory] = useState("");
    const [customMadeDateText, setCustomMadeDateText] = useState("");



    useEffect(() => {
        const fetchAuthor = async () => {
            const response = await UserController.getUserFullName(article.authorId);
            setAuthorFullName(response);
            const categoryName = await NewsController.getCategory(article.newsCategoryId);
            setCategory(categoryName);
            setCustomMadeDateText(CustomDate.generateCustomeMadeDateText(article.createdAt));
        }

        fetchAuthor();
    }, [article.authorId, article.newsCategoryId, article.createdAt]);

    return (
        <Link key={key} to={`${window.location.href}/${article.newsId}`} className={"col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 m-2"}>
            <div className="bg-light rounded" style={{ display: "inline-block", color: "#000" }}>
                <div className={""}>
                    <img
                        className={"img-fluid card-img"} src={"https://via.placeholder.com/150"}
                        style={{ width: "100%" }}
                        alt="Hello world"
                    />
                    <div className="p-5">
                        <span className="my-2">
                            <small className="text-danger mx-2">{authorFullName}</small>
                            <GoDotFill style={{ color: "#a6a6a6" }} />
                            <small className="mx-2" style={{ color: "#a6a6a6" }}>{Helper.calculateReadTime(article.content)} min reading</small>
                        </span>
                        <h5 className={"text-capitalize"}>{article.title}</h5>
                        <p>
                            {article.summary}
                        </p>
                        <footer>
                            <span>
                                <small className={"text-danger mx-2"}>{category}</small>
                                <GoDotFill style={{ color: "#a6a6a6" }} />
                                <small className={"mx-2"} style={{ color: "#a6a6a6" }}>{customMadeDateText}</small>
                            </span>
                        </footer>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default NewsCard;