import axios from "axios";
import stores from "./stores.json";



class Venues {

    static baseUrl = "http://localhost:5001/api/v1/venues";

    static async postAll() {
        console.log("Posting all stores");
        for (let i = 0; i < stores.length; i++) {
            let store = stores[i];
            if (store.url != null) {
                if (store.url.startsWith !== "https://") {
                    store.url = `https://${store.url}`;
                }
            }
            if (store.address === undefined) {
                if (store.district !== null) {
                    store.address = store.district;
                } else {
                    store.address = "Unknown";
                }
            }
            if (store.phone === undefined) {
                store.phone = "Unknown";
            }
            if (store.email === undefined) {
                store.email = "Unknown";
            }
            if (store.bio === undefined) {
                store.bio = "Unknown";
            }
            // check type of store and based on that add the venueCategoryId
            switch (store.type) {
                case "store":
                    store.venueCategoryId = 4;
                    break;
                case "department store":
                    store.venueCategoryId = 6;
                    break;
                case "grocery store":
                    store.venueCategoryId = 7;
                    break;
                case "Health care":
                    store.venueCategoryId = 8;
                    break;
                case "pharmacy":
                    store.venueCategoryId = 9;
                    break;
                case "art gallery":
                    store.venueCategoryId = 10;
                    break;
                case "second hand store":
                    store.venueCategoryId = 11;
                    break;
                case "tailor":
                    store.venueCategoryId = 12;
                    break;
                case "exchange office":
                    store.venueCategoryId = 13;
                    break;
                default:
                    store.venueCategoryId = 4;
                    break;
            }
            // make call to post store
            const headers = {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "true"
            };
            try {
                await axios.post("http://localhost:5001/api/v1/venues", store, { headers: headers })
            } catch (error) {
                console.error(`Error posting store: ${store.name}`)
                console.log(error)
            }

        }
        console.log("Done posting all stores")
        console.log(`Length: ${stores.length}`)
    }


    static async all(page = 1, pageSize = 10) {

        if (pageSize > 50 || pageSize < 1) {
            return {
                message: "Invalid page size. Page size must be between 1 and 50.",
                data: []
            };
        }

        if (page < 1) {
            return {
                message: "Invalid page number. Page number must be greater than 0.",
                data: []
            };
        }


        let endpoint = "http://localhost:5001/api/v1/venues";
        endpoint = `${endpoint}`;


        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        return await axios.get(endpoint, { headers: headers });
    }

    static async getCategories() {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        };
        console.log(headers)
        console.log(this.baseUrl)
        return await axios.get(`${this.baseUrl}/categories`, { headers, withCredentials: true });
    }

    static async create(data) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        return await axios.post(this.baseUrl, data, { headers: headers });
    }

    static async find(id) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        return await axios.get(`${this.baseUrl}/${id}`, { headers: headers });
    }

    static async update(id, data) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        return await axios.put(`${this.baseUrl}/${id}`, data, { headers: headers });
    }

    static async delete(id) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        const endpoint = `${this.baseUrl}/${id}`;
        return await axios.delete(endpoint, { headers: headers });
    }

    /**
     * Search for venues
     * @param {String} searchValue 
     * @returns 
     */
    static async search(searchValue) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        const endpoint = `${this.baseUrl}/search?search=${searchValue}`;
        return await axios.get(endpoint, { headers: headers });
    }

    static async categories() {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        };
        const endpoint = `${this.baseUrl}/categories`;
        return await axios.get(endpoint, { headers: headers });
    }

    static async findByIdAndUpdate(id, data) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        return await axios.put(`${this.baseUrl}/${id}`, data, { headers: headers });
    }

    static async findByIdAndDelete(id) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        return await axios.delete(`${this.baseUrl}/${id}`, { headers: headers });
    }

    /**
     * 
     * @param {Object} data : {name: String, description: String} : The data to create a new category 
     * @returns <Promise> : The response from the server
     */
    static async createCategory(data) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        return await axios.post(`${this.baseUrl}/categories`, data, { headers: headers });
    }

    static async deleteCategory(id) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        return await axios.delete(`${this.baseUrl}/categories/${id}`, { headers: headers });
    }

    static async findCategortyById(id) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        console.log("findCategortyById in Venues")
        return await axios.get(`${this.baseUrl}/categories/${id}`, { headers: headers });
    }

    static async updateCategory(id, data) {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "true"
        };
        return await axios.put(`${this.baseUrl}/categories/${id}`, data, { headers: headers });
    }

}

export default Venues;