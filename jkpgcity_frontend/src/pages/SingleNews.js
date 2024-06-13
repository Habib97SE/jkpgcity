import Article from "../components/Article/Article";
import { useParams } from "react-router-dom";
import NewsArticle from "../components/News/NewsArticle";

function SingleNews() {

    let { id } = useParams();


    return (
        <NewsArticle />
    );
}

export default SingleNews;