const VenueNews = require('../../models/v1/VenueNews');


class VenueNewsController {
    async getVenueNews(req, res) {
        const page = req.query.pages || 1;
        const pageSize = req.query.pagesize || 10;
        const offset = (pages - 1) * pagesize;
        const limit = pagesize;

        if (pageSize > 50) {
            res.status(400).json({
                message: 'Page size too large'
            });
            return;
        }

        let queryOptions = {
            where: {},
            order: []
        };

        if (req.query.title) {
            queryOptions.where.title = req.query.title;
        }
        if (req.query.content) {
            queryOptions.where.content = req.query.content;
        }
        if (req.query.venueId) {
            queryOptions.where.venueId = req.query.venueId;
        }
        if (req.query.createdAt) {
            queryOptions.where.createdAt = req.query.createdAt;
        }
        if (req.query.userId) {
            queryOptions.where.userId = req.query.userId;
        }

        if (req.query.sort) {
            if (req.query.sort === 'asc') {
                queryOptions.order.push(['createdAt', 'ASC']);
            } else if (req.query.sort === 'desc') {
                queryOptions.order.push(['createdAt', 'DESC']);
            }
        }


        try {
            const {
                count,
                rows: venueNews
            } = await VenueNews.findAndCountAll(queryOptions);
            venueNews.forEach(element => {
                element.dataValues.links = {
                    self: {
                        href: `http://${req.headers.host}/api/v1/venueNews/${element.id}`,
                        method: 'GET'
                    },
                    update: {
                        href: `http://${req.headers.host}/api/v1/venueNews/${element.id}`,
                        method: 'PUT'
                    },
                    delete: {
                        href: `http://${req.headers.host}/api/v1/venueNews/${element.id}`,
                        method: 'DELETE'
                    }
                }
            });
            res.status(200).json({
                message: "Success",
                data: venueNews,
                pagination: {
                    totalItems: count,
                    currentPage: page,
                    pageSize: pageSize,
                    totalPages: totalPages
                }
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async getVenueNews(req, res) {
        if (!Validate.isValidId(req.params.id)) {
            res.status(400).json({
                message: 'Invalid id'
            });
            return;
        }
        try {
            const venueNews = await VenueNews.findByPk(req.params.id);
            if (!venueNews) {
                res.status(404).json({
                    message: 'Venue news not found'
                });
                return;
            }
            res.status(200).json({
                message: "Success",
                data: venueNews
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async createVenueNews(req, res) {
        try {
            const venueNews = await VenueNews.create(req.body);
            res.status(201).json({
                message: "Success",
                data: venueNews
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async updateVenueNews(req, res) {
        if (!Validate.isValidId(req.params.id)) {
            res.status(400).json({
                message: 'Invalid id'
            });
            return;
        }
        try {
            const venueNews = await VenueNews.findByPk(req.params.id);
            if (!venueNews) {
                res.status(404).json({
                    message: 'Venue news not found'
                });
                return;
            }
            await venueNews.update(req.body);
            res.status(200).json({
                message: "Success",
                data: venueNews
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async deleteVenueNews(req, res) {
        if (!Validate.isValidId(req.params.id)) {
            res.status(400).json({
                message: 'Invalid id'
            });
            return;
        }
        try {
            const venueNews = await VenueNews.findByPk(req.params.id);
            if (!venueNews) {
                res.status(404).json({
                    message: 'Venue news not found'
                });
                return;
            }
            await venueNews.destroy();
            res.status(200).json({
                message: "Success",
                data: venueNews
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }
}

module.exports = new VenueNewsController();