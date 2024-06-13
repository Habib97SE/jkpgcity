import axios from "axios";

class User {

    baseUrl = "http://localhost:5000/api/v1/users/";
    static async getUserData(userId) {
        const endpoint = `http://localhost:5001/api/v1/users/${userId}`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true",
        }
        // add credentials include to the request
        // send the cookie with the request
        const user = await axios.get(endpoint, { headers: headers });
        return user.data;
    }

    static async create(data) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true",
        }

        return axios.post(`http://localhost:5001/api/v1/users`, data, { headers: headers });
    }



    static find() {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true",
        }

        return axios.get(`http://localhost:5001/api/v1/users`, { headers: headers });
    }

    static async login(email, password) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true",
        }
        const endpoint = "http://localhost:5001/api/v1/users/login";
        const data = {
            email: email,
            password: password
        }
        return axios.post(endpoint, data, { headers: headers });

    }

    static findByIdAndUpdate(id, data) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true",
        }

        return axios.put(`http://localhost:5001/api/v1/users/${id}`, data, { headers: headers });
    }

    static findById(id) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true",
        }

        return axios.get(`http://localhost:5001/api/v1/users/${id}`, { headers: headers });
    }

    static async update(id, data) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true",
        }

        return axios.put(`http://localhost:5001/api/v1/users/${id}`, data, { headers: headers });
    }

    static async getRoles() {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true",
        }

        return await axios.get(`http://localhost:5001/api/v1/users/roles`, { headers: headers });
    }
}

export default User;