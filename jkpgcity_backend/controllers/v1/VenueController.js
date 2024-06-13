const Venue = require('../../models/v1/Venue');

class VenueController {
    async getVenues(req, res) {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 10;
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        if (pageSize > 50) {
            res.status(400).json({
                message: 'Page size must not exceed 50'
            });
            return;
        }

        let queryOptions = {
            where: {},
            order: []
        };

        if (req.query.name) {
            queryOptions.where.name = req.query.name;
        }

        if (req.query.sort) {
            const [field, direction] = req.query.sort.split(',');
            queryOptions.order.push([field, direction]);
        }

        queryOptions.offset = offset;
        queryOptions.limit = limit;

        try {
            const venues = await Venue.findAll(queryOptions);
            // create hateoas links
            venues.forEach(venue => {
                venue.dataValues.links = {
                    self: {
                        href: `api/v1/venues/${venue.id}`,
                        method: 'GET'
                    },
                    update: {
                        href: `api/v1/venues/${venue.id}`,
                        method: 'PUT'
                    },
                    delete: {
                        href: `api/v1/venues/${venue.id}`,
                        method: 'DELETE'
                    }
                }
            });
            res.status(200).json({
                message: "Success",
                data: venues
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async getVenue(req, res) {
        if (!Validate.isValidId(req.params.id)) {
            res.status(400).json({
                message: 'Invalid id'
            });
            return;
        }
        try {
            const venue = await Venue.findByPk(req.params.id);
            if (!venue) {
                res.status(404).json({
                    message: 'Venue not found'
                });
                return;
            }
            venue.dataValues.links = {
                self: {
                    href: `api/v1/venues/${venue.id}`,
                    method: 'GET'
                },
                update: {
                    href: `api/v1/venues/${venue.id}`,
                    method: 'PUT'
                },
                delete: {
                    href: `api/v1/venues/${venue.id}`,
                    method: 'DELETE'
                }
            };
            res.status(200).json({
                message: "Success",
                data: venue
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async createVenue(req, res) {
        try {
            const venue = {
                venueCategoryId: req.body.venueCategoryId,
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                website: req.body.website,
                bio: req.body.bio
            };

            if (!Validate.newVenue(venue)) {
                res.status(400).json({
                    message: 'Invalid data'
                });
                return;
            }
            const newVenue = await Venue.create(venue);
            res.status(201).json({
                message: 'Venue created',
                data: newVenue
            });

            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async updateVenue(req, res) {
        if (!Validate.isValidId(req.params.id)) {
            res.status(400).json({
                message: 'Invalid id'
            });
            return;
        }
        try {
            const venue = {
                venueCategoryId: req.body.venueCategoryId,
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                website: req.body.website,
                bio: req.body.bio
            };

            if (!Validate.newVenue(venue)) {
                res.status(400).json({
                    message: 'Invalid data'
                });
                return;
            }
            const updatedVenue = await Venue.update(venue, {
                where: {
                    venueId: req.params.id
                }
            });
            if (updatedVenue[0] === 0) {
                res.status(404).json({
                    message: 'Venue not found'
                });
                return;
            }
            res.status(200).json({
                message: 'Venue updated'
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async deleteVenue(req, res) {
        if (!Validate.isValidId(req.params.id)) {
            res.status(400).json({
                message: 'Invalid id'
            });
            return;
        }
        try {
            const deletedVenue = await Venue.destroy({
                where: {
                    venueId: req.params.id
                }
            });
            if (deletedVenue === 0) {
                res.status(404).json({
                    message: 'Venue not found'
                });
                return;
            }
            res.status(200).json({
                message: 'Venue deleted'
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

module.exports = new VenueController();