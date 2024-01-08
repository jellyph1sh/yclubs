const express = require('express');
const cors = require('cors');

const stuffRoutes = require('./routes.js');

const app = express();

const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use('/api', stuffRoutes);

app.listen(PORT, () => {
    console.log('Server started ! http://localhost:3001');
    console.log(`Server now listening on ${PORT}`);
})