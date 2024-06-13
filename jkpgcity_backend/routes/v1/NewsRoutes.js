const express = require('express');
const router = express.Router();
const NewsController = require('../../controllers/v1/NewsController');
const NewsCategoryController = require('../../controllers/v1/NewsCategoryController');

// News Category Controller routes
router.get('/categories', (req, res) => {
    NewsCategoryController.getNewsCategories(req, res)
});

router.get('/categories/:id', (req, res) => {
    NewsCategoryController.getNewsCategoryById(req, res)
});

router.post('/categories', (req, res) => {
    NewsCategoryController.createNewsCategory(req, res)
});

router.put('/categories/:id', (req, res) => {
    NewsCategoryController.updateNewsCategory(req, res)
});

router.delete('/categories/:id', (req, res) => {
    NewsCategoryController.deleteNewsCategory(req, res)
});


// News Controller routes
router.get('/', (req, res) => {
    NewsController.getNews(req, res)
});

router.get('/:id', (req, res) => {
    NewsController.getNewsById(req, res)
});

router.post('/', (req, res) => {
    NewsController.createNews(req, res)
});

router.put('/:id', (req, res) => {
    NewsController.updateNews(req, res)
});

router.delete('/:id', (req, res) => {
    NewsController.deleteNews(req, res)
});

module.exports = router;