const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const db=require('./config/db')
const app = express();
app.use(bodyParser.json());
const userRoutes=require('./routes/userRoutes')
const PORT = process.env.PORT ;

app.use('/', userRoutes)



app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
