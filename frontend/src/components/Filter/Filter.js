import React from "react";
import "./Filter.css"

function Filter({handleChange}) {


    return (
        <>
            <div className={"col-xs-12 col-md-6 col-lg-4"}>
                <div className={"input-group"}>
                    <label htmlFor={"filter"} className={"form-label px-2"}>Filter by:</label>
                    <select className={"form-select"} onChange={handleChange} aria-label={"Default select example"}>
                        <option value={"1"}>Date</option>
                        <option value={"2"}>Category</option>
                        <option value={"3"}>Author</option>
                    </select>
                </div>
            </div>
        </>
    );
}

export default Filter;