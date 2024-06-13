import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import VenuesController from "../../controller/VenuesController";

function ShowVenueCategories() {
    const [venueCategories, setVenueCategories] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for modal visibility
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null); // State to store the category ID to delete
    const [categoryToDelete, setCategoryToDelete] = useState(null); // State to store the category to delete

    useEffect(() => {
        const fetchData = async () => {
            const categories = await VenuesController.getCategories();
            setVenueCategories(categories);
        }
        fetchData();
    }, []);

    const handleClick = async (id) => {
        setCategoryToDelete(venueCategories.find(category => category.venueCategoryId === id)); // Set the category to delete
        setCategoryIdToDelete(id); // Set the category ID to delete
        setShowConfirmationModal(true); // Show the confirmation modal
    }

    const handleDeleteConfirmed = async () => {
        setShowConfirmationModal(false); // Hide the confirmation modal
        const response = await VenuesController.deleteCategory(categoryIdToDelete);
        // if delete is successful, update the venue categories
        if (response.message === "Success") {
            const categories = await VenuesController.getCategories();
            setVenueCategories(categories);
            setSuccess(true);
            setMessage("Category deleted successfully");
        }
        // if delete is not successful, show an error message
        else {
            setError(true);
            setMessage("An error occurred. Please try again");
        }
    }

    if (!venueCategories) {
        return <div>Loading...</div>; // Or any other loading indicator
    }

    if (venueCategories.length === 0) {
        return (
            <div className="container-fluid bg-white rounded">
                <h1>Venue Categories</h1>
                <p>No venue categories found</p>
                <div className="d-flex justify-content-end p-2">
                    <Link to={"/admin/venue-categories/new"} className={"btn btn-primary"}>New Category</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid bg-white rounded">
            <h1>Venue Categories</h1>
            {error && <p className={"text-danger"}>{message}</p>}
            {success && <p className={"text-success"}>{message}</p>}
            <table className={"table"}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {venueCategories.map((category) => (
                        <tr key={category.venueCategoryId}>
                            <td>{category.venueCategoryId}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <Link to={`/admin/venues/categories/${category.venueCategoryId}`} className={"btn btn-warning m-2 text-white"}><MdEdit /> Edit</Link>
                                <button className={"btn btn-danger m-2"} onClick={() => { handleClick(category.venueCategoryId) }}><MdDelete /> Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-end p-2">
                <Link to={"/admin/venue-categories/new"} className={"btn btn-primary"}>New Category</Link>
            </div>

            {/* Confirmation Modal */}
            {showConfirmationModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion of {categoryToDelete.name}</h5>
                                <button type="button" className="close" aria-label="Close" onClick={() => setShowConfirmationModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete <strong>{categoryToDelete.name}</strong> category?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline" onClick={() => setShowConfirmationModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDeleteConfirmed}><MdDelete /> Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowVenueCategories;
