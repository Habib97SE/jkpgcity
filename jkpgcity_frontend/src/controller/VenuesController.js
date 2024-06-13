import Venues from "../models/Venues";


class VenuesController {
    static async all(filter = {}, sort = {}) {
        //await Venues.postAll();

        const page = filter.page || 1;
        const pageSize = filter.pageSize || 10;
        if (pageSize > 50 || pageSize < 1) {
            return {
                message: "Invalid page size. Page size must be between 1 and 50.",
                data: []
            };
        }
        const result = await Venues.all(page, pageSize);

        return result.data;
    }

    static async find(id) {
        return await Venues.find(id);
    }

    static async create(data) {
        const result = await Venues.create(data);
        console.log(result);
        return result.data;
    }

    static async update(id, data) {
        return await Venues.findByIdAndUpdate(id, data, { new: true });
    }

    static async delete(id) {
        return await Venues.findByIdAndDelete(id);
    }

    static async search(searchValue) {
        console.log("searchValue: " + searchValue);
        // safeguard against empty search value and other invalid values that can be used for injections and other types of attacks
        if (!searchValue) {
            return [];
        }

        const result = await Venues.search(searchValue);

        if (result.data.message === "Success") {
            return result.data.data;
        }
        return [];
    }


    /**
     * 
     * Managing Venue Categories: These functions are used to manage venue categories in the application.
     * 1. createCategory(data) - This function is used to create a new venue category.
     * 2. getCategories() - This function is used to get all venue categories.
     * 3. getCategory(id) - This function is used to get a single venue category.
     * 4. updateCategory(id, data) - This function is used to update a venue category.
     * 5. deleteCategory(id) - This function is used to delete a venue category.
     */


    /**
     * getCategories - This function is used to get all venue categories. 
     * @returns {Promise<*>} 
     */
    static async getCategories() {
        console.log("getCategories() in controller")
        const categories = await Venues.categories();
        console.log(`categories: ${categories.data.data}`)
        console.dir(categories.data.data)
        if (categories.data) {
            return categories.data.data;
        }
        return [];
    }

    static async getCategory(id) {
        console.log("getCategory in controller: " + id);
        const result = await Venues.findCategortyById(id);
        console.log("getCategory in controller: " + result.data);
        return result.data;
    }

    static async createCategory(data) {
        console.log(data);
        if (!data) {
            return;
        }
        if (data.name === "") {
            return;
        }
        return await Venues.createCategory(data);
    }

    static async deleteCategory(id) {
        const result = await Venues.deleteCategory(id);
        return result.data;
    }

    static async updateCategory(id, data) {
        const result = await Venues.updateCategory(id, data);
        return result.data;
    }
}


export default VenuesController;