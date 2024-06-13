import React from "react";

function AddNewNewsCategoryModal() {

    // This is a modal that will be used to add a new news category 
    return (
        <div
            className="modal fade"
            id="addNewNewsCategoryModal"
            tabIndex="-1"
            aria-labelledby="addNewNewsCategoryModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addNewNewsCategoryModalLabel">Add New News Category</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="newsCategoryName">Category Name</label>
                                <input type="text" className="form-control" id="newsCategoryName" aria-describedby="newsCategoryNameHelp" />
                                <small id="newsCategoryNameHelp" className="form-text text-muted">Enter the name of the news category</small>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNewNewsCategoryModal;