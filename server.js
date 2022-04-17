const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('The server is running').end();
})

const PORT = process.env.PORT || 3001;

app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
    console.log('Server is running');
})