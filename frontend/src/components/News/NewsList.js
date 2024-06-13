import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import NewsCard from "./NewsCard";
import NewsController from "../../controller/NewsController";


function NewsList() {
    const [news, setNews] = useState([]);
    const [filterBy, setFilterBy] = useState("date");
    const [sortBy, setSortBy] = useState("newest");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
        document.title = "News";
        const fetchNews = async () => {
            const response = await NewsController.all(1, 10, { filterBy }, { sortBy });

            if (response.message === "Success") {
                setNews(response.data);
            } else {
                console.log(response.error);

            }
        }

        fetchNews();
    }, [filterBy, sortBy]);

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value);
    }

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    }

    if (loading) {
        return (
            <div className="alert alert-info">
                <h1 className="text-center">
                    Loading...
                </h1>
            </div>
        );
    }

    if (news.length === 0) {
        return (
            <div className="alert alert-info">
                <h1 className="text-center">
                    No news found
                </h1>
            </div>
        );
    }

    return (
        <div className={"col-9 mx-auto"}>

            <hr />
            <div className={"row d-flex flex-wrap justify-content-center align-items-center"}>
                {news.map((article, index) => {
                    return <NewsCard key={article.newsId} article={article} />
                })}
            </div>
            <hr />

        </div>
    );
}

export default NewsList;