const express = require('express');
const router = express.Router();
const VenueController = require('../../controllers/v1/VenueController');
const VenueCategoryController = require('../../controllers/v1/VenueCategoryController');
const VenueNewsController = require('../../controllers/v1/VenueNewsController');

// Venue Category Controller routes
router.get('/categories', (req, res) => {
    VenueCategoryController.getVenueCategories(req, res);
});

router.get('/categories/:id', (req, res) => {
    VenueCategoryController.getVenueCategory(req, res);
});

router.post('/categories', (req, res) => {
    VenueCategoryController.createVenueCategory(req, res);
});

router.put('/categories/:id', (req, res) => {
    VenueCategoryController.updateVenueCategory(req, res);
});

router.delete('/categories/:id', (req, res) => {
    VenueCategoryController.deleteVenueCategory(req, res);
});

// Venue News Controller routes
router.get('/news', (req, res) => {
    VenueNewsController.getVenueNews(req, res);
});

router.get('/news/:id', (req, res) => {
    VenueNewsController.getVenueNews(req, res);
});

router.post('/news', (req, res) => {
    VenueNewsController.createVenueNews(req, res);
});

router.put('/news/:id', (req, res) => {
    VenueNewsController.updateVenueNews(req, res);
});

router.delete('/news/:id', (req, res) => {
    VenueNewsController.deleteVenueNews(req, res);
});

// Venue Controller routes
router.get('/', (req, res) => {
    VenueController.getVenues(req, res);
});

router.get('/:id', (req, res) => {
    VenueController.getVenue(req, res);
});

router.post('/', (req, res) => {
    VenueController.createVenue(req, res);
});

router.put('/:id', (req, res) => {
    VenueController.updateVenue(req, res);
});

router.delete('/:id', (req, res) => {
    VenueController.deleteVenue(req, res);
});

// Correct the typo in the export statement
module.exports = router;