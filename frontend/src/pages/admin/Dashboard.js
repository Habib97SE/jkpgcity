import React from "react";
import "./style.css"
import BarChart from "../../components/D3/BarChart";
import LineChart from "../../components/D3/LineChart";

function Dashboard() {
    const userData = [
        {name: "User 1", value: 20},
        {name: "User 2", value: 40},
        {name: "User 3", value: 60},
        {name: "User 4", value: 80}
    ]
    return (
        <div className="dashboard col-md-12">
            <div className={"col-md-4"}
                 style={{
                     backgroundColor: "#fff",
                     display: "inline-block",
                     padding: "20px",
                     borderRadius: "10px"
                 }}
            >
                <h3>Users</h3>
                <p>View and manage users</p>
                <BarChart elementId={"user-overview"} data={[5, 10, 1, 3]} width={300} height={300}/>
                <foooter>
                    <a href={"/admin/users"}>View users</a>
                </foooter>
            </div>
            <div className={"col-md-4 m-2"}
                 style={{
                        backgroundColor: "#fff",
                        display: "inline-block",
                        padding: "20px",
                        borderRadius: "10px"
                 }}
            >
                <h3>Visit</h3>
                <p>You can see daily visit</p>
                <LineChart elementId="myLineChart" data={[5, 10, 1, 3]} width={500} height={300} backgroundColor="aliceblue" foregroundColor="darkblue" />
                <foooter>
                    <a href={"/admin/users"}>Daily visits</a>
                </foooter>
            </div>
        </div>
    );
}

export default Dashboard;