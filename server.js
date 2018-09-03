let express = require('express');
let app = express();

// When client connects, send "Hello World"
app.get('/', function (req, res) {
    res.send('Hello World');
});

// Server listen on port 3000
let server = app.listen(80, function () {
    let port = server.address().port;

    console.log("Server listening on port %s", port)
});