import React from "react";
import News from "../models/News";

class NewsController {
    static async all(page = 1, limit = 10, filter = {}, sort = {}) {
        const result = await News.all(page, limit, filter, sort);
        return result.data;
    }

    static async create(data) {
        const result = await News.create(data);
        return result.data;
    }

    static async find(id) {
        const result = await News.find(id);
        return result.data;
    }

    static async update(id, data) {
        return await News.update(id, data);
    }

    static async delete(id) {
        return await News.delete(id);
    }

    static async getCategories() {
        const result = await News.getCategories();
        return result.data;
    }

    static async getCategory(id) {
        const result = await News.getCategory(id);
        return result.data.data.name;
    }

    /**
     * Like the news with the given news id, by the user with the given user id
     * If user already liked the news, it will not like again
     * @param {number} userId : The user id
     * @param {number} newsId : The news id
     * @returns {void} 
     * 
     * @example
     * const result = await NewsController.like(2, 1);
     * console.log(result); // statusCode: 200 { message: "Success" }
     * 
     * @example
     * const result = await NewsController.like(2, 2);
     * console.log(result); // statusCode: 400 { message: "Already liked" }
     * 
     * @example
     * const result = await NewsController.like(2, 3);
     * console.log(result); // statusCode: 500 { message: Error.message }
     */
    static async like(userId, newsId) {
        console.log(`userId: ${userId}, newsId: ${newsId}`)
        const result = await News.like(userId, newsId);
        return result.data;
    }

    /**
     * Unlike the news with the given news id, by the user with the given user id
     * @param {number} userId : The user id
     * @param {number} newsId : The news id
     * @returns {void} 
     * 
     * @example
     * const result = await NewsController.unlike(2, 1);
     * console.log(result); // { message: "Success" }
     * 
     * @example
     * const result = await NewsController.unlike(2, 2);
     * console.log(result); // { message: "Success" }
     */
    static async unlike(userId, newsId) {
        const result = await News.unlike(userId, newsId);
        return result.data;
    }

    /**
     * Retrieve a list of all users who liked the news with the given news id
     * @param {number} userId : The user id
     * @param {number} newsId : The news id
     * @returns : boolean : true if the user liked the news, false otherwise
     * 
     * @example
     * const result = await NewsController.userLikedNews(2, 1);
     * console.log(result); // true
     * 
     * @example 
     * const result = await NewsController.userLikedNews(2, 2);
     * console.log(result); // false
     */
    static async userLikedNews(userId, newsId) {
        const result = await News.getusersLikes(newsId);
        const likes = result.data.data;
        for (let i = 0; i < likes.length; i++) {
            if (likes[i].newsId === newsId && likes[i].userId === userId) {
                return true;
            }
        }
        return false;
    }
}

export default NewsController;