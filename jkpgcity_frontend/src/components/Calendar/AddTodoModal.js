import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TodoController from "../../controller/TodoController";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
});

/**
 * TodoModal is responsible for displaying a modal to add a new todo for a specific day. 
 * The day is passed in as parameters and the modal is displayed when the show prop is true.
 * @param {Object} param0 
 * @returns 
 */
function AddTodoModal({ show, setShow }) {
    // State management for the form fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    // State management for the error and success messages
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    // error handling for date-picker
    const [datePickerError, setDatePickerError] = useState(false);
    const [datePickerErrorMessage, setDatePickerErrorMessage] = useState("Due date is required");

    // Handle changes on the date-picker form field and set the due date
    const handleDateChange = (date) => {
        if (!date) {
            setDatePickerError(true);
            setDatePickerErrorMessage("Due date is required");
            return;
        }

        // check if the date is in the past 
        const today = new Date();
        if (date < today) {
            setDatePickerError(true);
            setDatePickerErrorMessage("Due date cannot be in the past");
            return;
        }

        // if no errors, set the due date
        setDatePickerError(false);
        setDueDate(formatDate(date));
    }



    // Removed the show state management from here and use props instead
    const { register, unregister, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const formatDate = (date) => {
        if (!date) return '';

        const d = new Date(date);
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }


    const onSubmit = async (data) => {
        if (!dueDate) {
            setDatePickerError(true);
            setDatePickerErrorMessage("Due date is required");
            return;
        }
        const todo = {
            title: data.title,
            description: data.description,
            userId: 2,
            dueDate: dueDate,
            status: 0,
            priority: "high",
        };
        const result = await TodoController.addTodo(todo);
        console.log(result);
        if (result.message === "Success") {
            setError(false);
            setSuccess(true);
            setMessage("Todo added successfully");
            return;
        }
        // If there is an error, show the error message
        setError(true);
        setSuccess(false);
        setMessage("An error occurred. Please try again");

    }

    const handleClickDisableModal = () => {
        setError(false); // reset the error state
        setSuccess(false); // reset the success state
        setMessage(""); // remove the message if any
        setShow(false); // hide the modal
    }


    if (!show) return null;


    return (
        <div className="modal-backdrop" onClick={() => setShow(false)}>
            <div className="modal-content col-6 bg-white" onClick={e => e.stopPropagation()}>
                {/* Modal form and content go here */}
                <div className="col-6 mx-auto">
                    <h3>Add new todo</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-group my-4">
                            <label htmlFor="title" className={"my-3"}>Title</label>
                            <input
                                {...register("title")}
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                            />
                            {errors.title && <p className={"text-danger"}>{errors.title.message}</p>}
                        </div>

                        <div className="form-group my-4">
                            <label htmlFor="dueDate" className={"my-3"}>Due Date</label>
                            <DatePicker
                                todayButton="Today"
                                onChange={handleDateChange}
                                dateFormat={"yyyy-MM-dd"}
                                selected={new Date()}
                                className={`form-control`}
                                value={dueDate}
                            />
                            {datePickerError && <p className={"text-danger"}>{datePickerErrorMessage}</p>}
                        </div>

                        <div className="form-group my-4">
                            <label htmlFor="description" className={"my-3"}>Description</label>
                            <textarea
                                id="description"
                                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                {...register("description")}
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                            {errors.description && <p className={"text-danger"}>{errors.description.message}</p>}
                        </div>
                        <button type="submit" className={"btn btn-primary m-3 px-5 py-2"}>Add</button>
                        <button className={"btn btn-secondary m-3 px-5 py-2"} onClick={() => handleClickDisableModal()}>Close
                        </button>
                    </form>
                    {error && <div className="alert alert-danger">{message}</div>}
                    {success && <div className="alert alert-success">{message}</div>}
                </div>
            </div>
        </div>
    );
}

export default AddTodoModal;