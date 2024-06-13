import React, { useState, useEffect } from "react";
import TodoController from "../../controller/TodoController";
import UserController from "../../controller/UserController";


const modalBackdrop = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zindex: 1050
}

const modalContent = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    zIndex: 2
}



function ShowTodoModal({ todo, setShow, show }) {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userFullname, setUserFullname] = useState("");

    const formatDate = (date) => {
        // convert date to string
        date = date.toString();
        // split date string by space
        const dateParts = date.split(" ");
        // get the date part
        const datePart = dateParts[0];
        console.log(datePart);
        return datePart;
    }
    todo.dueDate = formatDate(todo.dueDate);

    const handleClickCloseTodo = () => {
        setShow(false);
    }

    const handleClickDeleteTodo = async () => {
        const result = await TodoController.deleteTodoById(todo.todoId);

        console.log(result);
        if (result.message === "Success") {
            setShow(false);
        } else {
            setError(true);
            setErrorMessage(`An error occurred. Please try again. Error: ${result.message}`);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            const userFullname = await UserController.getUserFullName(todo.userId);

            setUserFullname(userFullname);
        }

        fetchUser();
    }, [todo.userId]);

    if (!show) {
        return null;
    }


    return (
        <div style={modalBackdrop} onClick={handleClickCloseTodo}>
            <div style={modalContent} className="col-6" onClick={e => e.stopPropagation()}> {/* Stop propagation to prevent clicks inside the modal from closing it */}
                <div style={{ borderBottom: "1px solid black" }}>
                    <h2 className="text-center">{todo.title}</h2>
                    <p >
                        {todo.description}
                    </p>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >
                    <p>Due date: {todo.dueDate}</p>
                    <p>Priority: <span className="text-capitalize">{todo.priority}</span></p>
                    <p>Status: {todo.status ? "Completed" : "Not completed"}</p>
                </div>
                <footer
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        borderTop: "1px solid black",
                    }}
                >
                    <div>
                        <button className="btn btn-dark m-2" onClick={handleClickCloseTodo}>Close</button>
                        <button className="btn btn-danger m-2" onClick={handleClickDeleteTodo}>Delete</button>
                    </div>
                    <div>
                        <span>
                            This todo was created by {userFullname}
                            <img
                                className="m-2"
                                src={`https://randomuser.me/api/portraits/women/${todo.userId}.jpg`}
                                alt="User"
                                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                            />
                        </span>
                    </div>
                </footer>
                {error && <div className="alert alert-danger">{errorMessage}</div>}
            </div>
        </div>
    );
}

export default ShowTodoModal;