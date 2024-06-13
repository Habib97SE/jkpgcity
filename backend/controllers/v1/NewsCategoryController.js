const NewsCategory = require('../../models/v1/NewsCategory');
const Permission = require('../../models/v1/Permission');


class NewsCategoryController {

    async checkAccess(req, res, next) {
        try {
            const permission = await Permission.findOne({
                name: 'news_category'
            });
            if (permission) {
                if (req.user.role.permissions.includes(permission._id)) {
                    next();
                } else {
                    res.status(403).json({
                        message: 'Access denied'
                    });
                }
            } else {
                res.status(403).json({
                    message: 'Access denied'
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async getNewsCategories(req, res) {
        try {
            const newsCategories = await NewsCategory.find();
            res.status(200).json(newsCategories);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async getNewsCategoryById(req, res) {
        try {
            const newsCategory = await NewsCategory.findById(req.params.id);
            res.status(200).json(newsCategory);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async createNewsCategory(req, res) {
        try {
            const newsCategory = new NewsCategory(req.body);
            await newsCategory.save();
            res.status(201).json(newsCategory);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async updateNewsCategory(req, res) {
        try {
            const newsCategory = await NewsCategory.findById(req.params.id);
            Object.assign(newsCategory, req.body);
            await newsCategory.save();
            res.status(200).json(newsCategory);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async deleteNewsCategory(req, res) {
        try {
            const newsCategory = await NewsCategory.findById(req.params.id);
            await newsCategory.remove();
            res.status(204).json();
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = new NewsCategoryController();