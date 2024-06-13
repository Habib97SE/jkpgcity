import Todo from "../models/Todo";

class TodoController {

    /**
     * 
     * @returns {Promise<Array>} List of todos
     * 
     * @example
     * const todos = await TodoController.getTodos();
     * // returns [{ id: 1, title: "Buy milk", description: "short description", userId: 1, status: 0, priority: "high", tag: "Instance" }]
     */
    static async getTodos(options) {

        const todos = await Todo.getTodos(options);
        return todos.data;
    }

    /**
     * Retrieve a todo by ID 
     * 
     * @param {number} id - The ID of the todo
     * @returns {Promise<Object>} A todo object
     * 
     * @example
     * const todo = await TodoController.getTodo(1);
     * // returns { id: 1, title: "Buy milk", description: "short description", userId: 1, status: 0, priority: "high", tag: "Instance" }
     */
    static async getTodo(id) {
        if (!id) throw new Error("ID is required");
        if (isNaN(id)) throw new Error("ID must be a number");
        const todo = await Todo.getTodo(parseInt(id));
        return todo.data;
    }

    /**
     * Retrieve a list of todos by user ID
     * 
     * @param {number} userId - The ID of the user
     * @returns {Promise<Array>} List of todos
     * 
     * @example
     * const todos = await TodoController.getTodosByUserId(1);
     * // returns [{ id: 1, title: "Buy milk", description: "short description", userId: 1, status: 0, priority: "high", tag: "Instance" }]
     */
    static async getTodosByUserId(userId) {
        if (!userId) throw new Error("User ID is required");
        if (isNaN(userId)) throw new Error("User ID must be a number");
        const todos = await Todo.getTodosByUserId(parseInt(userId));
        return todos.data;
    }

    /**
     * Add a new todo
     * 
     * @param {Object} data - The todo data
     * @param {string} data.title - The title of the todo
     * @param {number} data.userId - The ID of the user
     * @returns {Promise<Object>} The newly created todo object
     * 
     * @example
     * const todo = await TodoController.addTodo({
     *    title: "Buy milk",
     *   userId: 1
     * });
     *  
     * // returns { id: 1, title: "Buy milk", description: "short description", userId: 1, status: 0, priority: "high", tag: "Instance" }
     */
    static async addTodo(data) {
        if (!data) throw new Error("Data is required");
        if (!data.title) throw new Error("Title is required");
        if (!data.userId) throw new Error("User ID is required");
        if (isNaN(data.userId)) throw new Error("User ID must be a number");
        const todo = await Todo.addTodo(data);
        return todo.data;
    }

    /**
     * Delete a todo by ID
     * 
     * @param {number} id - The ID of the todo
     * @returns {Promise<Object>} The deleted todo object
     * 
     * @example
     * const todo = await TodoController.deleteTodoById(1);
     * // returns { id: 1, title: "Buy milk", description: "short description", userId: 1, status: 0, priority: "high", tag: "Instance" }
     */
    static async deleteTodoById(id) {
        if (!id) throw new Error("ID is required");
        if (isNaN(id)) throw new Error("ID must be a number");
        const todo = await Todo.deleteTodo(parseInt(id));
        return todo.data;
    }

    static async updateTodoById(id, data) {
        if (!id) throw new Error("ID is required");
        if (isNaN(id)) throw new Error("ID must be a number");
        if (!data) throw new Error("Data is required");
        if (!data.title) throw new Error("Title is required");
        if (!data.userId) throw new Error("User ID is required");
        if (isNaN(data.userId)) throw new Error("User ID must be a number");
        const todo = await Todo.updateTodo(parseInt(id), {
            title: data.title,
            userId: parseInt(data.userId)
        });
        return todo.data;
    }
}



export default TodoController;