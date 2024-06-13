const VenueCategory = require('../../models/v1/VenueCategory');


class VenueCategoryController {
    async getVenueCategories(req, res) {
        try {
            const venueCategories = await VenueCategory.findAll();
            res.status(200).json({
                message: "Success",
                data: venueCategories
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async getVenueCategory(req, res) {
        if (!Validate.isValidId(req.params.id)) {
            res.status(400).json({
                message: 'Invalid id'
            });
            return;
        }
        try {
            const venueCategory = await VenueCategory.findByPk(req.params.id);
            if (!venueCategory) {
                res.status(404).json({
                    message: 'Venue category not found'
                });
                return;
            }
            res.status(200).json({
                message: "Success",
                data: venueCategory
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async createVenueCategory(req, res) {
        try {
            const venueCategory = await VenueCategory.create(req.body);
            res.status(201).json({
                message: "Success",
                data: venueCategory
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async updateVenueCategory(req, res) {
        if (!Validate.isValidId(req.params.id)) {
            res.status(400).json({
                message: 'Invalid id'
            });
            return;
        }
        try {
            const venueCategory = await VenueCategory.findByPk(req.params.id);
            if (!venueCategory) {
                res.status(404).json({
                    message: 'Venue category not found'
                });
                return;
            }
            await venueCategory.update(req.body);
            res.status(200).json({
                message: "Success",
                data: venueCategory
            });
            return;
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
            return;
        }
    }

    async deleteVenueCategory(req, res) {
        if (!Validate.isValidId(req.params.id)) {
            res.status(400).json({
                message: 'Invalid id'
            });
            return;
        }
        try {
            const venueCategory = await VenueCategory.findByPk(req.params.id);
            if (!venueCategory) {
                res.status(404).json({
                    message: 'Venue category not found'
                });
                return;
            }
            await venueCategory.destroy();
            res.status(200).json({
                message: "Success"
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

module.exports = new VenueCategoryController();