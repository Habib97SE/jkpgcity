import axios from "axios";

class Newsletter {
    static subscribe(email) {
        const endpoint = "http://localhost:5000/api/newsletter";
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        const data = {
            email: email
        };
        return axios.post(endpoint, data, {headers: headers});
    }

    static unsubscribe(email) {
        const endpoint = "http://localhost:5000/api/newsletter";
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        const data = {
            email: email
        };
        return axios.delete(endpoint, data, {headers: headers});
    }
}

export default Newsletter;