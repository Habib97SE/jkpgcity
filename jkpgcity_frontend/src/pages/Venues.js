import React, { useState, useEffect } from "react";
import Venue from "../components/Venue/Venue";
import Pagination from "../components/Pagination/Pagination";
import venue from "../components/Venue/Venue";
import VenuesController from "../controller/VenuesController";

function Venues() {
    const [currentVenues, setCurrentVenues] = useState([]);
    const [error, setError] = useState("");
    const [allVenues, setAllVenues] = useState([]);
    const [queries, setQueries] = useState({});
    const [venueCategories, setVenueCategories] = useState([]);



    useEffect(() => {
        async function fetchData() {
            try {
                const venues = await VenuesController.all();
                const categories = await VenuesController.getCategories();
                setVenueCategories(categories);
                setAllVenues(venues.data);
                setCurrentVenues(venues.data); // This line ensures that all venues are displayed initially

            } catch (e) {
                setCurrentVenues([]);
                setError(e.message);
            }
        }
        fetchData();
        document.title = "Venues";
    }, []);


    const fetchData = async (queries) => {
        try {
            const page = queries.page || 1;
            const pageSize = queries.pageSize || 10;
            const sortField = queries.sortField || "name";
            const sortDirection = queries.sortDirection || "asc";
            const venues = await VenuesController.all(queries);
            setCurrentVenues(venues.data);

        } catch (e) {
            setCurrentVenues([])
            setError(e.message);
        }
    }

    const handleVenueTypeChange = (e) => {
        const selectedCategoryId = parseInt(e.target.value);
        if (selectedCategoryId === NaN || selectedCategoryId === 0 || selectedCategoryId === "All") {
            setCurrentVenues(allVenues);
        } else {
            const filteredVenues = allVenues.filter(venue => parseInt(venue.venueCategoryId) === selectedCategoryId);
            setCurrentVenues(filteredVenues);
        }
    }


    /**
     * Sets the number of venues per page based on the user's selection
     * @param {object} e - The event object to get the value of the number of venues per page 
     * 
     * @returns - void
     * 
     * @example
     * const e = { target: { value: 20 } };
     * handleNumberOfVenuesChange(e);
     * // returns 20 venues per page
     */
    const handleNumberOfVenuesChange = (e) => {
        // 
        const number = parseInt(e.target.value);

    }

    /**
     * Handle the search input for venues and filter the venues based on the search input. 
     * When the search input is empty, it sets the currentVenues state equal to the allVenues array.
     * 
     * @param {string} e - The event object to get the value of the search input
     * @returns - void Querying the allVenues array based on the search input and setting the currentVenues state equal to the filtered array
     * 
     * @example
     * const e = { target: { value: "Jönköping" } };
     * handleSearchVenue(e);
     * // returns all venues that have "Jönköping" in their name
     */
    const handleSearchVenue = (e) => {
        if (e.target.value === "") {
            setCurrentVenues(allVenues);
            return;
        }

        const name = e.target.value.toLowerCase();
        setCurrentVenues(prevVenues => prevVenues.filter(venue => venue.name.toLowerCase().includes(name)));
    }

    return (
        <div className={"container-fluid col-11 bg-white p-4"}>
            <div className={"row"}>
                <div className={"col-12"}>
                    <h1>Venues</h1>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-4"}>
                    <label htmlFor={"venue-type"}>
                        Venue type:
                    </label>
                    <select id={"venue-type"} onChange={handleVenueTypeChange} className={"form-select form-select-lg mb-3"}>
                        <option value="0">All</option>
                        {venueCategories.map(category => (
                            <option key={category.venueCategoryId} value={category.venueCategoryId}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                </div>
                <div className={"col-4"}>
                    <label htmlFor={"venue-name"}>
                        Venue name:
                    </label>
                    <input type={"text"} id={"venue-name"} onChange={handleSearchVenue}
                        className={"form-control form-control-lg mb-3"} />
                </div>
                <div className={"col-4"}>
                    <label htmlFor={"number-of-venues"}>
                        Number of venues per page:
                    </label>
                    <select id={"number-of-venues"} onChange={handleNumberOfVenuesChange}
                        className={"form-select form-select-lg mb-3"}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>
            <div className={"row"}>
                <h3>Total Venues: {currentVenues.length}</h3>
            </div>
            <div className={"row"}>
                {currentVenues.length > 0 ? currentVenues.map(venue => <Venue key={venue.venueId} venue={venue} />) :
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="col-6 m-auto alert alert-danger text-center">
                                    <h2>No venue found</h2>
                                </div>
                            </div>
                        </div>
                    </div>}
                {error && <div className={"alert alert-danger"}>{error}</div>}
            </div>

        </div>
    );
}

export default Venues;