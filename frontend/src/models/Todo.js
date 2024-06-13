import axios from "axios";

class Todo {
    static endpoint = "http://localhost:5001/api/v1/todos";
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "true"
    };


    static async getTodos(options) {
        // go through options object and set the key as the query parameter and the value as the value 

        let query = "";
        for (const key in options) {
            query += `${key}=${options[key]}&`;
        }
        return await axios.get(`${Todo.endpoint}?${query}`, { headers: Todo.headers });
    }

    static async getTodoById(id) {
        return await axios.get(`${this.endpoint}/${id}`, { headers: this.headers });
    }

    static async getTodosByUserId(userId) {
        return await axios.get(`${Todo.endpoint}?userId=${userId}`, { headers: Todo.headers });
    }

    static async addTodo(data) {
        console.log(data);
        return await axios.post(Todo.endpoint, data, { headers: Todo.headers });
    }

    static async deleteTodo(id) {
        return await axios.delete(`${this.endpoint}/${id}`, { headers: this.headers });
    }

    static async updateTodo(id, data) {
        return await axios.put(`${this.endpoint}/${id}`, data, { headers: this.headers });
    }
}

export default Todo;