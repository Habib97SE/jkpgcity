const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelize');
const app = express();
const port = 5000 || process.env.PORT;
const FirstVersionRoutes = require('./routes/v1/DistributeRoutes');

app.use(express.json());

app.use('/api/v1', FirstVersionRoutes);

app.use(bodyParser.json());

sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(port, () => {
        console.log('Server started on port', port);
    });
}).catch((err) => {
    console.log('Error: ', err);
});