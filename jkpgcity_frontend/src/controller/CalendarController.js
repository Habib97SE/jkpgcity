import Calendar from "../models/Calendar";
class CalendarController {
    static async getCalendar(req, res) {
        const { year, month } = req.params;
        const calendar = new Calendar();
        const data = await calendar.getCalendar(year, month);
        res.json(data);
    }

    static async getTodosByDate(req, res) {
        const { year, month, day } = req.params;
        const calendar = new Calendar();
        const data = await calendar.getTodosByDate(year, month, day);
        res.json(data);
    }

    static async createCalendar(req, res) {
        const { year, month } = req.body;
        const calendar = new Calendar();
        const data = await calendar.createCalendar(year, month);
        res.json(data);
    }

    static async updateCalendar(req, res) {
        const { year, month, day } = req.params;
        const data = req.body;
        const calendar = new Calendar();
        const updated = await calendar.updateCalendar(year, month, day, data);
        res.json(updated);
    }

    static async deleteCalendar(req, res) {
        const { year, month, day } = req.params;
        const calendar = new Calendar();
        const data = await calendar.deleteCalendar(year, month, day);
        res.json(data);
    }

    static async createTodoByDate(req, res) {
        const { year, month, day } = req.params;
        const data = req.body;
        const calendar = new Calendar();
        const created = await calendar.createTodoByDate(year, month, day, data);
        res.json(created);
    }

    static async updateTodoByDate(req, res) {
        const { year, month, day, id } = req.params;
        const data = req.body;
        const calendar = new Calendar();
        const updated = await calendar.updateTodoByDate(year, month, day, id, data);
        res.json(updated);
    }
}

export default CalendarController;