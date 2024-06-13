const express = require('express');
const router = express.Router();
const UserRoutes = require('./UserRoutes');
const VenueRoutes = require('./VenueRoutes');
const NewsRoutes = require('./NewsRoutes');

router.use('/users', UserRoutes);
router.use('/venues', VenueRoutes);
router.use('/news', NewsRoutes);


module.exports = router;