const News = require('../../models/v1/News');


class NewsController {
    async getNews(req, res) {
        try {
            const news = await News.find();
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async getNewsById(req, res) {
        try {
            const news = await News.findById(req.params.id);
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async createNews(req, res) {
        try {
            const news = new News(req.body);
            await news.save();
            res.status(201).json(news);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async updateNews(req, res) {
        try {
            const news = await News.findById(req.params.id);
            Object.assign(news, req.body);
            await news.save();
            res.status(200).json(news);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async deleteNews(req, res) {
        try {
            const news = await News.findById(req.params.id);
            await news.remove();
            res.status(204).json();
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}


module.exports = new NewsController();