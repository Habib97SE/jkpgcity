import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination";
import { MdDelete, MdEdit } from "react-icons/md";
import Table from "../../components/Table/Table";
import UsersController from "../../controller/UserController";

function ShowUsers() {

    const [users, setUsers] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [countSearchResults, setCountSearchResults] = useState(0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");


    useEffect(() => {
        const fetchUsers = async () => {
            const response = await UsersController.all();
            setUsers(response);
        }
        fetchUsers();

    }, []);


    /**
     * Delete a user based on his/her ID
     * @param {Int} id : ID of given user to delete 
     */
    const handleDeleteUser = async (id) => {
        const response = await UsersController.delete(id);
        if (response.message === "Success") {
            setError(false);
            setUsers(users.filter(user => user.id !== id));
            setSuccess(true);
            setMessage("User deleted successfully");
        } else {
            setError(true);
            setMessage("An error occurred. Please try again");
        }

    }

    return (
        <div
            className={"col-md-12"}
            style={{
                backgroundColor: "#fff",
                display: "inline-block",
                padding: "20px",
                borderRadius: "10px"
            }}
        >
            <div className="row d-flex ">
                <h1>Users</h1>
                <a href={"/admin/users/new"} className={"btn btn-primary"}>Add User</a>
            </div>
            <p>View and manage users</p>
            <table className="table table-striped table-hover text-center">
                <thead>
                    <tr>
                        <th>Full name</th>
                        <th>E-mail</th>
                        <th>Phone no.</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr
                            key={user.id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.phone === null ? "-" : user.phone}</td>
                            <td>{user.role}</td>
                            <td>
                                <a href={`/admin/users/${user.userId}`} className={"btn btn-sm btn-warning text-white"}><MdEdit /> Edit</a>
                                <button onClick={() => {
                                    setUserToDelete(user);
                                    setShowDeleteModal(true);
                                }} className={"btn btn-sm btn-danger mx-2"}  ><MdDelete /> Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="row">
                {error && <div className="alert alert-danger">{message}</div>}
                {success && <div className="alert alert-success">{message}</div>}
            </div>
            <Pagination totalPages={10} />
            {/* Delete modal */}
            {showDeleteModal && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete user</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete <strong>{userToDelete.firstName} {userToDelete.lastName}</strong> user?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Close</button>
                                <button type="button" className="btn btn-danger" onClick={() => {
                                    handleDeleteUser(userToDelete.id);
                                    setShowDeleteModal(false);
                                }}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ShowUsers;