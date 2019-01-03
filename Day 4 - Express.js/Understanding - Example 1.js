//You'll notice that next() reloads the web request
// output:
/*

In middleware!
In another middleware!
In middleware!
In another middleware!

*/

const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('In middleware!');
    //next() allows the other middleware modules 
    // to execute after this middleware.
    next();
});

app.use((req, res, next) => {
    console.log('In another middleware!');
    res.send("<h1>Hello :)</h1>");
});

app.listen(3000);
