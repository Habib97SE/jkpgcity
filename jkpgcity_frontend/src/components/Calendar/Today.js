import React, { useEffect, useState } from "react";
import TodoController from "../../controller/TodoController";


function Today() {
    const [todos, setTodos] = useState([]);


    useEffect(() => {
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }

        const fetchData = async () => {
            const response = await TodoController.getTodos({ dueDate: `${year}-${month}-${day}` });
            setTodos(response.data);
        }
        fetchData();
    }, []);

    // If there are todos, display them, otherwise display a message "No todos for today"
    if (todos !== undefined && todos.length > 0) {
        return (
            <div
                style={{

                    borderRadius: "10px",
                }}
            >
                <h2>Today's Todos</h2>
                <ul>
                    {todos.map((t, index) => (
                        <li
                            style={{
                                listStyleType: "none",
                                backgroundColor: "lightgray",
                                textAlign: "center",
                                padding: "5px",
                                borderRadius: "5px",
                            }}
                            key={index}>
                            {t.title}
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Today's Todos</h2>
                <p>No todos for today</p>
            </div>
        );
    }
}

export default Today;