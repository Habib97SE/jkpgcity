import axios from "axios";


class Calendar {
    baseUrl = "http://localhost:3000/api/v1/calendar";

    async getCalendar(year, month) {
        const response = await axios.get(`${this.baseUrl}/${year}/${month}`);
        return response.data;
    }

    async getTodosByDate(year, month, day) {
        const response = await axios.get(`${this.baseUrl}/${year}/${month}/${day}`);
        return response.data;
    }

    async createCalendar(year, month) {
        const response = await axios.post(`${this.baseUrl}`, {year, month});
        return response.data;
    }

    async updateCalendar(year, month, day, data) {
        const response = await axios.put(`${this.baseUrl}/${year}/${month}/${day}`, data);
        return response.data;
    }

    async deleteCalendar(year, month, day) {
        const response = await axios.delete(`${this.baseUrl}/${year}/${month}/${day}`);
        return response.data;
    }
}

export default Calendar;