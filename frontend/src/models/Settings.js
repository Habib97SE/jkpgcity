import axios from "axios";

class Settings {

    // endpoint specific to the settings API
    static endpoint = "http://localhost:5001/api/v1/settings";

    // headers for the settings API
    static headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "true"
    }

    /**
     * Retrieves the settings from the settings API
     * @returns {Promise} - Returns a promise containing the settings
     * @example
     * SettingsController.getSettings();
     * // returns { title: "Title", keywords: "Keywords", description: "Description" }
     * @example
     * SettingsController.getSettings();
     * // returns { title: "New Title", keywords: "New Keywords", description: "New Description" }
     */
    static async getSettings() {
        return await axios.get(`${Settings.endpoint}`, Settings.headers);
    }

    /**
     * Updates the settings in the settings API
     * @param {Object} data - The data to update the settings with
     * @returns {Promise} - Returns a promise containing the updated settings
     * @example
     * SettingsController.updateSettings({
     *    title: "New Title",   
     *   keywords: "New Keywords",
     *   description: "New Description"
     * });
     */
    static async getSettingById(id) {
        return await axios.get(`${Settings.endpoint}/${id}`, Settings.headers);
    }

    /**
     * Retrieves a setting by its key from the settings API
     * @param {String} key - The key of the setting to retrieve
     * @returns {Promise} - Returns a promise containing the setting
     * @example
     * SettingsController.getSetting("google_analytics");
     * // returns { google_analytics: "UA-123456789-1" }
     * @example
     * SettingsController.getSetting("facebook_pixel");
     * // returns { facebook_pixel: "123456789" }
     */
    static async getSettingByKey(key) {
        return await axios.get(`${Settings.endpoint}/key/${key}`, Settings.headers);
    }

    /**
     * Creates a setting in the settings API
     * @param {Object} data - The data to create the setting with
     * @returns {Promise} - Returns a promise containing the created setting
     * @example
     * SettingsController.createSetting({ google_analytics: "UA-123456789-1" });
     * // returns { google_analytics: "UA-123456789-1" }
     * @example
     * SettingsController.createSetting({ facebook_pixel: "123456789" });
     * // returns { facebook_pixel: "123456789" }
     */
    static async createSetting(data) {
        return await axios.post(`${Settings.endpoint}`, data, Settings.headers);
    }

    /**
     * Updates a setting in the settings API by its ID
     * @param {String} id - The ID of the setting to update
     * @param {Object} data - The data to update the setting with
     * @returns {Promise} - Returns a promise containing the updated setting
     * @example
     * SettingsController.updateSettingById("123456789", { google_analytics: "UA-123456789-1" });
     * // returns { google_analytics: "UA-123456789-1" }
     * @example
     * SettingsController.updateSettingById("987654321", { facebook_pixel: "123456789" });
     * // returns { facebook_pixel: "123456789" }
     */
    static async updateSettingById(id, data) {
        return await axios.put(`${Settings.endpoint}/${id}`, data, Settings.headers);
    }

    /**
     * Updates a setting in the settings API by its key
     * @param {String} key - The key of the setting to update
     * @param {Object} data - The data to update the setting with
     * @returns {Promise} - Returns a promise containing the updated setting
     * @example
     * SettingsController.updateSettingByKey("google_analytics", { google_analytics: "UA-123456789-1" });
     * // returns { google_analytics: "UA-123456789-1" }
     * @example
     * SettingsController.updateSettingByKey("facebook_pixel", { facebook_pixel: "123456789" });
     * // returns { message: "Success", data: {id: 1, key: "facebook_pixel", value: "123456789", description: "Facebook Pixel ID"}
     */
    static async updateSettingByKey(key, data) {
        console.log(key, data);
        return await axios.put(`${Settings.endpoint}/key/${key}`, data, Settings.headers);
    }

    /**
     * Deletes a setting in the settings API by its ID
     * @param {String} id - The ID of the setting to delete
     * @returns {Promise} - Returns a promise containing the deleted setting
     * @example
     * SettingsController.deleteSettingById("123456789");
     * // returns { message: "Setting deleted" }
     * @example
     * SettingsController.deleteSettingById("987654321");
     * // returns { message: "Success", data: Setting }
     * 
     * @example
     * SettingsController.deleteSettingById("123456789");
     * // returns { message: "Error occured while deleting setting"}
     */
    static async deleteSettingById(id) {
        return await axios.delete(`${Settings.endpoint}/${id}`, Settings.headers);
    }

    /**
     * Deletes a setting in the settings API by its key
     * @param {String} key - The key of the setting to delete
     * @returns {Promise} - Returns a promise containing the deleted setting    
     * @example
     * SettingsController.deleteSettingByKey("google_analytics");
     * // returns { message: "Setting deleted" }
     * @example
     * SettingsController.deleteSettingByKey("facebook_pixel");
     * // returns { message: "Setting deleted" }
     */
    static async deleteSettingByKey(key) {
        return await axios.delete(`${Settings.endpoint}/key/${key}`, Settings.headers);
    }
}

export default Settings;