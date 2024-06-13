import React, { useEffect, useState } from "react";
import Calendar from "../../components/Calendar/Calendar";
import CustomDate from "../../utils/CustomDate";


function CalendarPage() {
    const [month, setMonth] = useState(CustomDate.getMonthAndYear().month);
    const [year, setYear] = useState(CustomDate.getMonthAndYear().year);

    useEffect(() => {
        // change title
        document.title = "Calendar - Admin Dashboard";

    });

    return (
        <div>
            <div
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: "20px"
                }}
            >
                <h1>Calendar</h1>
                <div className={"form-group"}>
                    <label htmlFor={"month"}>Month</label>
                    <select id={"month"} className={"form-select"} value={month}
                        onChange={(e) => setMonth(e.target.value)}>
                        <option value={0}>January</option>
                        <option value={1}>February</option>
                        <option value={2}>March</option>
                        <option value={3}>April</option>
                        <option value={4}>May</option>
                        <option value={5}>June</option>
                        <option value={6}>July</option>
                        <option value={7}>August</option>
                        <option value={8}>September</option>
                        <option value={9}>October</option>
                        <option value={10}>November</option>
                        <option value={11}>December</option>
                    </select>
                </div>
                <div className={"form-group"}>
                    <label htmlFor={"year"}>Year</label>
                    <select id={"year"} className={"form-select my-2"} value={year}
                        onChange={(e) => setYear(e.target.value)}>
                        <option value={year - 1}>{year - 1}</option>
                        <option value={year}>{year}</option>
                        <option value={year + 1}>{year + 1}</option>
                    </select>
                </div>
            </div>

            <Calendar year={year} month={month} />
        </div>
    );
}

export default CalendarPage;