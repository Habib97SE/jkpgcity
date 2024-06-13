import React from "react";

function ForgotPassword() {
    return (
        <>
            <a type="button" className={"my-3"} data-bs-toggle="modal" data-bs-target="#forgotPasswordModal">
                Forgot password?
            </a>
            <div className="modal fade" id="forgotPasswordModal" tabIndex="-1" aria-labelledby="forGotPasswordModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="forGotPasswordModalLabel">Reset your password</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="modalEmailAddressInput">Email address</label>
                                <input type="email" className="form-control" id="modalEmailAddressInput" aria-describedby="modalEmailAddressInputHelp"/>
                                <small id="modalEmailAddressInputHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Send link</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;