import React, {useState, useEffect} from "react";

function Pagination({totalPages, currentPageUrl, fetchData}) {
    // State to keep track of the current page
    const [currentPage, setCurrentPage] = useState(1);
    // Calculate page numbers to display
    const [visiblePages, setVisiblePages] = useState([]);

    useEffect(() => {
        // Determine the page numbers to display
        updateVisiblePages(currentPage, totalPages);
    }, [currentPage, totalPages]);

    const updateVisiblePages = (currentPage, totalPages) => {
        let pages = [];
        if (totalPages <= 3) {
            // If there are 3 or fewer total pages, show all pages
            pages = Array.from({length: totalPages}, (_, i) => i + 1);
        } else {
            // Ensure the current page is always visible along with up to 2 pages
            const startPage = Math.max(1, Math.min(currentPage - 1, totalPages - 2));
            const pageLimit = Math.min(startPage + 2, totalPages);
            pages = Array.from({length: pageLimit - startPage + 1}, (_, i) => startPage + i);
        }
        setVisiblePages(pages);
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Fetch assets for the selected page
        fetchData(`http://localhost:5000/api/v1/venues?page=${pageNumber}`);
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    return (
        <div className={"row pagination"}>
            <div className={"col-12"}>
                <nav aria-label={"Page navigation example"}>
                    <ul className={"pagination justify-content-center"}>
                        {currentPage > 1 && (
                            <li className={"page-item"}>
                                <button className={"page-link"} onClick={handlePrevious} aria-label={"Previous"}>
                                    <span aria-hidden={"true"}>&laquo;</span>
                                </button>
                            </li>
                        )}
                        {visiblePages.map(pageNumber => (
                            <li key={pageNumber} className={"page-item"}>
                                <button className={"page-link"} onClick={() => goToPage(pageNumber)}>
                                    {pageNumber}
                                </button>
                            </li>
                        ))}
                        {currentPage < totalPages && (
                            <li className={"page-item"}>
                                <button className={"page-link"} onClick={handleNext} aria-label={"Next"}>
                                    <span aria-hidden={"true"}>&raquo;</span>
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Pagination;

