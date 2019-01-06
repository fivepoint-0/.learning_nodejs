const express = require('express');
const app = express();

app.use('/users', (req, res, next) => {
    console.log(1);
    res.send("You are viewing the users page.");
});

app.use('/', (req, res, next) => {
    console.log('In another middleware!');
    let date = Date();
    setTimeout(function() {
        res.send("<h1>Hello :)</h1>" + date);
    }, 100);
    //next() allows the other middleware modules 
    // to execute after this middleware.
});

app.listen(3000);