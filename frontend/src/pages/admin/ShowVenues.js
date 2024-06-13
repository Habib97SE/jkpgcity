import React, { useState, useEffect } from "react";
import VenuesController from "../../controller/VenuesController";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImNewTab } from "react-icons/im";
import Pagination from "../../components/Pagination/Pagination";

function ShowVenues() {
    const [venues, setVenues] = useState([]);
    const [venueId, setVenueId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [countSearchResults, setCountSearchResults] = useState(0);

    useEffect(() => {
        const fetchVenues = async () => {
            const response = await VenuesController.all();
            setVenues(response.data);
        }
        fetchVenues();
    }, []);

    const handleClick = (id) => {
        setVenueId(id);
        setShowDeleteModal(true);
        // Ensure that the modal is appended to the DOM
        const modal = document.getElementById('deleteVenueModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
        }
    }

    const handleDelete = async () => {
        await VenuesController.delete(venueId);
        setShowDeleteModal(false);
        const response = await VenuesController.all();
        setVenues(response.data);
    }

    const handleChangeSearchField = (e) => {
        if (e.target.value.length < 3) {
            setCountSearchResults(0);
            return;
        }

        const searchValue = e.target.value;
        const fetchData = async () => {
            const response = await VenuesController.search(searchValue);
            setVenues(response);
            setCountSearchResults(response.length);
        };
        fetchData();
    }

    return (
        <>
            {/* Venue table */}
            <div className={"col-md-12"} style={{ backgroundColor: "#fff", display: "inline-block", padding: "20px", borderRadius: "10px" }}>
                <div className="row d-inline-block">
                    <h1>Venues</h1>
                    <Link to={"/admin/venues/new"} className={"btn btn-primary"}>New Venue</Link>
                </div>
                <p>View and manage venues</p>
                <p>
                    You might need to see over all available venue categories. You can do that by clicking on the link below.
                    <br />
                    <Link to={"/admin/venues/categories"}>Venue Categories</Link>
                </p>
                <p>
                    Or you can create a new venue category by clicking on the link below.
                    <br />
                    <Link to={"/admin/venues/categories/new"}>New Venue Category</Link>
                </p>
                <hr />
                {/* Show search field */}
                <div className="row">
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Search" onChange={handleChangeSearchField} />
                    </div>
                    {countSearchResults > 0 && (
                        <div className="col-md-4">
                            <p>{countSearchResults} results found</p>
                        </div>
                    )}
                </div>
                <table className={"table"}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>E-mail</th>
                            <th>Website</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {venues.length === 0 && (
                            <tr>
                                <td colSpan={6}>No venues found</td>
                            </tr>
                        )}
                        {venues.map((venue, index) => (
                            <tr key={index}>
                                <td>{venue.name}</td>
                                <td>{venue.address}</td>
                                <td><a href={`tel:${venue.phone}`}>{venue.phone}</a></td>
                                <td><a href={`mailto:${venue.email}`}>{venue.email}</a></td>
                                <td><a href={venue.website} target="_blank" rel="noopener noreferrer">{venue.website}</a> <ImNewTab /></td>
                                <td>
                                    <Link to={`/admin/venues/${venue.venueId}`} className="btn btn-warning text-white m-2">
                                        <MdEdit /> Edit
                                    </Link>
                                    <button className="btn btn-danger m-2" onClick={() => handleClick(venue.venueId)}>
                                        <MdDelete /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination totalPages={10} />
                </div>
            </div>

            {/* Modal for deleting a venue */}
            {showDeleteModal && (
                <div className="modal fade show" id="deleteVenueModal" tabIndex="-1" role="dialog" aria-labelledby="deleteVenueModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteVenueModalLabel">Delete Venue</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this venue?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ShowVenues;
