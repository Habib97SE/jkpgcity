import React, { useEffect, useState } from "react";
import TodoController from "../../controller/TodoController";
import "../Square/Square.css";
import AddTodoModal from "./AddTodoModal";
import ShowTodoModal from "./ShowTodoModal";
import "./styles.css"


const todaysDate = new Date();


function generateBackgroundColor(year, month, day) {
    // if the date is today, return a light blue color
    if (year === todaysDate.getFullYear() && month === todaysDate.getMonth() && day === todaysDate.getDate()) {
        return "lightblue";
    }

    // if the date is passed, return a light grey color
    if (new Date(year, month, day) < todaysDate) {
        return "lightgrey";
    }
    // if the date is in the future, return a light green color
    return "lightgreen";
}

/**
 * It creates a square for each day in the calendar. It fetches the todos for that day and displays them in the square. 
 * If there are no todos, the square is colored according to the color prop.
 * @param {*} param0 
 * @returns 
 */
function Square({ size, color, year, month, day, children }) {
    const [showTodoModal, setShowTodoModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        console.log("fetching todos");
        const fetchTodos = async () => {
            const todosFromDB = await TodoController.getTodos({ dueDate: `${year}-${parseInt(month) + 1}-${day}` });

            if (!todosFromDB.data) {
                setTodos([]);
            } else {
                setTodos(todosFromDB.data);
            }
        };

        fetchTodos();
    }, [year, month, day]);

    const handleTodoClick = (todo) => {
        setSelectedTodo(todo);
        setShowTodoModal(true);
    };

    return (
        <div
            className="square d-flex flex-column justify-content-center align-items-center p-4"
            style={{
                flexGrow: 1,
                flexBasis: "0",
                backgroundColor: generateBackgroundColor(year, month, day),
                borderRadius: "10px",
            }}
        >
            {children}
            <hr />
            {todos.length > 0 && (
                <div>
                    <ul>
                        {todos.map((todo, index) => (
                            <li
                                style={{ cursor: "pointer", listStyleType: "none" }}
                                key={index}
                                className="fs-6 bg-light rounded p-1"
                                onClick={() => handleTodoClick(todo)}
                            >
                                {todo.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedTodo && (
                <ShowTodoModal
                    todo={selectedTodo}
                    show={showTodoModal}
                    setShow={setShowTodoModal}
                />
            )}
        </div>
    );
}


export default Square;