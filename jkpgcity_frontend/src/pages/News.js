import React, { useEffect, useState } from "react";
import NewsList from "../components/News/NewsList";
import Filter from "../components/Filter/Filter";
import Sort from "../components/Sort/Sort";
import Pagination from "../components/Pagination/Pagination";

/**
 * News page is aimed to show a brief overview of all news. It will show the latest news first.
 * It will also have a filter and sort option to filter and sort the news.
 * @returns {JSX.Element}
 */
function News() {

    const [filterBy, setFilterBy] = useState("date");
    const [sortBy, setSortBy] = useState("newest");
    useEffect(() => {
        document.title = "News";
    }, [filterBy, sortBy]);

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value);
    }

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    }

    const randomCategory = () => {
        const categories = ["Technology", "Business", "Health", "Entertainment", "Science", "Sports", "Politics"];
        return categories[Math.floor(Math.random() * categories.length)];
    }

    return (
        <div className={"col-9 mx-auto"}>
            <h1 className={"text-center"}>News</h1>
            <hr />
            <div className="row">
                <div className="col-6">
                    <Filter handleFilterChange={handleFilterChange} />
                </div>
                <div className="col-6">
                    <Sort handleSortChange={handleSortChange} />
                </div>
            </div>
            <div className={"row d-flex flex-wrap justify-content-center align-items-center"}>
                <NewsList />
            </div>
            <hr />
            <div className="row">
                <Pagination />
            </div>

        </div>
    );
}

export default News;