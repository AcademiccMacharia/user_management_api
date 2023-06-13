const express = require('express');
const { router } = require('./routes/userRoutes');
const app = express();

app.use(express.json());

app.use('/', router)

const port = 6000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
}) 