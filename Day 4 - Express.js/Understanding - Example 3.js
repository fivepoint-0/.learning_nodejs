//You'll notice that next() reloads the web request
// output:
/*

In another middleware!
returning Wed Jan 02 2019 20:40:39 GMT-0500 (Eastern Standard Time)
In middleware!
In another middleware!
returning Wed Jan 02 2019 20:40:41 GMT-0500 (Eastern Standard Time)
In middleware!

*/

const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('In another middleware!');
    let date = Date();
    console.log("returning " + date);
    setTimeout(function() {
        res.send("<h1>Hello :)</h1>" + date);
    }, 1500);
    //next() allows the other middleware modules 
    // to execute after this middleware.
    next();
});

app.use((req, res, next) => {
    console.log('In middleware!');
});

app.listen(3000);
