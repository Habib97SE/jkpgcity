import React from "react";
import Pagination from "../../components/Pagination/Pagination";
import { MdDelete, MdEdit } from "react-icons/md";
import Article from "../../components/Article/Article";
import Item from "../../components/Item/Item";
import News from "../News";
import NewsList from "../../components/News/NewsList";

const squareImageStyle = {
    width: "250px",
    height: "250px",
    objectFit: "cover",
}

function NewsPage() {

    return (
        <div className={"col-md-12"}
            style={{
                backgroundColor: "#fff",
                display: "inline-block",
                padding: "20px",
                borderRadius: "10px"
            }}
        >
            <div className="row d-inline-block">
                {/* title in the left and button in the right side */}
                <h1>News</h1>
                <a href={"/admin/news/new"} className={"btn btn-primary"}>Add News</a>
            </div>
            <p>View and manage news</p>
            <hr />
            <div className="row">
                <NewsList />
            </div>
            <div className="row">
                <Pagination totalPages={10} currentPageUrl={"localhost:5001/news/1"} />
            </div>
        </div>
    );
}

export default NewsPage;