import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import Helper from "../../utils/Helper";
import { GoDotFill } from "react-icons/go";

/**
 * This component is used to display a single article (news, venue news, etc.) in detail.
 * @returns 
 */
function Article() {
    const [news, setNews] = useState({});
    const [liked, setLiked] = useState(false);
    const [countLike, setCountLike] = useState(0);
    let { id } = useParams();

    const selectRandomCategory = () => {
        const categories = ["Technology", "Business", "Health", "Entertainment", "Science", "Sports", "Politics"];
        return categories[Math.floor(Math.random() * categories.length)];
    }

    useEffect(() => {
        const fetchNews = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const data = await response.json();
            setNews(data);
        }

        fetchNews();
    }, [id]); // Include 'id' in the dependency array

    const handleClick = () => {
        setLiked(!liked);
        setCountLike(prevCount => liked ? prevCount - 1 : prevCount + 1);
    }

    // Guard against accessing properties of 'news' before it is defined
    if (!news || Object.keys(news).length === 0) {
        return <div
            style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
        >Loading...</div>;
    }

    return (
        <div className={"row col-sm-12 col-md-8 col-lg-8 mx-auto"} style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            marginTop: "20px"
        }}>
            <img style={{ borderRadius: "8px", width: "100%", height: "500px" }} src={`https://picsum.photos/seed/picsum/500/700`}
                className={"img-fluid w-100"} alt={news.title} />

            <h1 className={"text-capitalize"}>{news.title}</h1>
            <span style={{ color: " #a6a6a6", fontSize: "1.2rem" }}>
                <small className={"px-3"}>By <span className="text-danger">John Doe</span></small>
                <GoDotFill />
                <small className={"px-3"}>{Helper.calculateReadTime(news.body)} min reading</small>
            </span>
            <div style={{
                lineHeight: "1.5",
                fontSize: "1.2rem",
                letterSpacing: "0.5px",
                margin: "20px 0"
            }} className={"text-black"}>{news.body}</div>
            <hr style={{ marginTop: "2%" }} />
            <footer className={"col-xs-12 col-sm-12 col-md-8 col-lg-6"} style={{ fontSize: "1.2rem" }}>
                <div className={""}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >
                    <span>
                        <span onClick={handleClick}>
                            {
                                liked ? <IoMdHeart className={"text-danger"} /> : <CiHeart />
                            }
                            <span className={"px-1"}>{countLike} Likes</span>
                        </span>
                    </span>
                    <span>
                        <GoDotFill style={{ color: "#a6a6a6" }} />
                        <small className={"mx-2"} style={{ color: "#a6a6a6" }}>10 minutes ago</small>
                    </span>
                    <span>
                        <GoDotFill style={{ color: "#a6a6a6" }} />
                        <small className={"mx-2 text-danger"}>{selectRandomCategory()}</small>
                    </span>
                </div>
            </footer>
        </div>
    );
}

export default Article;
