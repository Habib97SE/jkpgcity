import Settings from "../models/Settings";
class SettingsController {

    /**
     * Gets all settings from the settings API
     * @returns {Promise} - Returns a promise containing all settings
     */
    static async getSettings() {
        return await Settings.getSettings();
    }

    /**
     * Gets the homepage title, meta keywords and meta description from the settings API
     * @returns {object} - Returns an object containing the homepage settings
     * @example
     * SettingsController.getHomePageSettings();
     * // returns { title: "Home Page Title", metaKeywords: "Home, Page, Title", metaDescription: "This is the home page description" }
     */
    static async getHomePageSettings() {
        let title = await Settings.getSettingByKey("homepageTitle");
        title = title.data.data.value;
        let metaKeywords = await Settings.getSettingByKey("homepageMetaKeywords");
        metaKeywords = metaKeywords.data.data.value;
        let metaDescription = await Settings.getSettingByKey("homepageDescription");
        metaDescription = metaDescription.data.data.value;
        const result = {
            title: title,
            metaKeywords: metaKeywords,
            metaDescription: metaDescription
        };
        return result;
    }

    /**
     * Retrieves a specific setting by its key from the settings API 
     * @param {String} key - The key of the setting to retrieve
     * @returns {Promise} - Returns a promise containing the setting
     * @example
     * SettingsController.getSettingByKey("google_analytics");
     * // returns { google_analytics: "UA-123456789-1" }
     */
    static async getSettingByKey(key) {
        return await Settings.getSettingByKey(key);
    }

    /**
     * Retrieves a specific setting by its ID from the settings API
     * @param {String} id - The ID of the setting to retrieve
     * @returns {Promise} - Returns a promise containing the setting
     * @example
     * SettingsController.getSettingById("123456789");
     * // returns { title: "Title", keywords: "Keywords", description: "Description" }
     */
    static async getSettingById(id) {
        return await Settings.getSettingById(id);
    }



    /**
     * Updates settings in the settings API
     * @param {Object} data - The data to update the settings with
     * @returns {Promise} - Returns a promise containing the updated settings
     */
    static async updateSettings(data) {
        console.log(data);
        const result = await Settings.updateSettingByKey(data.key, data);
        return result.data;
    }

    static async updateHomePageSettings(data) {
        const result = {
            title: await Settings.updateSettingByKey("homepageTitle", data.title),
            metaKeywords: await Settings.updateSettingByKey("homepageMetaKeywords", data.metaKeywords),
            metaDescription: await Settings.updateSettingByKey("homepageMetaDescription", data.metaDescription)
        };
        return result;
    }

    /**
     * Deletes settings in the settings API
     * @returns {Promise} - Returns a promise containing the deleted settings
     */
    static async getFacebookPixel() {
        return await Settings.getSetting("facebook_pixel");
    }

    /**
     * Updates a setting in the settings API by its ID
     * @param {String} id - The ID of the setting to update
     * @param {Object} data - The data to update the setting with
     * @returns {Promise} - Returns a promise containing the updated setting
     */
    static async updateFacebookPixel(data) {
        return await Settings.updateSetting(data);
    }

    /**
     * Deletes a setting in the settings API by its ID
     * @param {String} id - The ID of the setting to delete
     * @returns {Promise} - Returns a promise containing the deleted setting
     */
    static async deleteFacebookPixel() {
        return await Settings.deleteSetting("facebook_pixel");
    }

    /**
     * Creates a setting in the settings API
     * @param {Object} data - The data to create the setting with
     * @returns {Promise} - Returns a promise containing the created setting
     */
    static async createFacebookPixel(data) {
        return await Settings.createSetting(data);
    }

    /**
     * Gets a setting in the settings API by its key
     * @param {String} key - The key of the setting to get
     * @returns {Promise} - Returns a promise containing the setting
     */
    static async getGoogleAnalytics() {
        return await Settings.getSetting("google_analytics");
    }

    /**
     * Updates a setting in the settings API by its key
     * @param {String} key - The key of the setting to update
     * @param {Object} data - The data to update the setting with
     * @returns {Promise} - Returns a promise containing the updated setting
     */
    static async updateGoogleAnalytics(data) {
        return await Settings.updateSetting(data);
    }

    /**
     * Deletes a setting in the settings API by its key
     * @param {String} key - The key of the setting to delete
     * @returns {Promise} - Returns a promise containing the deleted setting
     */
    static async deleteGoogleAnalytics() {
        return await Settings.deleteSetting("google_analytics");
    }

    /**
     * Creates a setting in the settings API
     * @param {Object} data - The data to create the setting with
     * @returns {Promise} - Returns a promise containing the created setting
     */
    static async createGoogleAnalytics(data) {
        return await Settings.createSetting(data);
    }

    /**
     * Gets a setting in the settings API by its key
     * @param {String} key - The key of the setting to get
     * @returns {Promise} - Returns a promise containing the setting
     */
    static async getSettings(req, res) {
        res.json({ message: "getSettings" });
    }

    /**
     * Updates settings in the settings API
     * @param {Object} data - The data to update the settings with
     * @returns {Promise} - Returns a promise containing the updated settings
     */
    static async updateSettings(req, res) {
        res.json({ message: "updateSettings" });
    }

    /**
     * Deletes settings in the settings API
     * @returns {Promise} - Returns a promise containing the deleted settings
     */
    static async deleteSettings(req, res) {
        res.json({ message: "deleteSettings" });
    }

    /**
     * Gets a setting in the settings API by its key
     * @param {String} key - The key of the setting to get
     * @returns {Promise} - Returns a promise containing the setting
     */
    static async createSettings(req, res) {
        res.json({ message: "createSettings" });
    }

    static async getSetting(req, res) {
        res.json({ message: "getSetting" });
    }

    /**
     * Updates a setting in the settings API by its ID
     * @param {String} id - The ID of the setting to update
     * @param {Object} data - The data to update the setting with
     * @returns {Promise} - Returns a promise containing the updated setting
     */
    static async updateSetting(data) {
        const result = await Settings.updateSettingByKey(data.key, data);
        return result.data;
    }

    /**
     * Deletes a setting in the settings API by its ID
     * @param {String} id - The ID of the setting to delete
     * @returns {Promise} - Returns a promise containing the deleted setting
     */
    static async deleteSetting(req, res) {
        res.json({ message: "deleteSetting" });
    }

    /**
     * Creates a setting in the settings API
     * @param {Object} data - The data to create the setting with
     * @returns {Promise} - Returns a promise containing the created setting
     */
    static async createSetting(req, res) {
        res.json({ message: "createSetting" });
    }
}

export default SettingsController;