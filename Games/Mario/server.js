const express = require('express');
const server = express();
server.use(express.json());

const PORT = 3030;

server.use(express.static('public'))

server.listen(PORT, err => {
    if (err) {
        console.log('Error starting server');
    } else {
        console.log(`App listening on port ${PORT}`);
    }
});
