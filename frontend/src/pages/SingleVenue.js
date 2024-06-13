import React, { useState, useEffect } from "react";
import VenuesController from "../controller/VenuesController";
import { useParams } from "react-router-dom";

function SingleVenue() {
    const [venue, setVenue] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const venueId = useParams().id;

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const response = await VenuesController.find(venueId);

                setVenue(response.data.data);
            } catch (e) {
                setError(e.message);
            }
        }

        fetchData();
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="alert alert-info">
                <h1 className="text-center">
                    Loading...
                </h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                <h1 className="text-center">
                    {error}
                </h1>
            </div>
        );
    }

    return (
        <div className="container bg-white rounded m-2">
            <div className="row col-12">

                <div className="col-8 m-auto">
                    <img
                        src={venue.logo === "null" ? "https://cdn.gracestudio.io/jkpg-city/Jkpgcity_thumbnail_7c92fabae3/Jkpgcity_thumbnail_7c92fabae3.png" : venue.logo}
                        alt={`${venue.name} in ${venue.address} at Jönköping`}
                        className="img-cover"
                        style={{ width: "100%", height: "300px", objectFit: "contain", objectPosition: "center" }} // Adjust height as needed
                    />
                    <h1>{venue.name}</h1>
                    <hr />
                    <p>{venue.bio}</p>
                    <footer>
                        <p>
                            Address: <address style={{ display: "inline-block" }}>{venue.address}, Jönköping</address>
                        </p>
                        <p>
                            Phone: {venue.phone === "Unknown" ? "Unknown" : <a href={`tel:${venue.phone}`}>{venue.phone}</a>}
                        </p>
                        <p>
                            Email: {venue.email === "Unknown" ? "Unknown" : <a href={`mailto:${venue.email}`}>{venue.email}</a>}
                        </p>
                        <p>
                            Website: {venue.website === "Unknown" ? "Unknown" : <a href={venue.website} target="_blank" rel="noreferrer">{venue.website}</a>}
                        </p>
                    </footer>
                </div>

            </div>
        </div >
    );
}

export default SingleVenue;