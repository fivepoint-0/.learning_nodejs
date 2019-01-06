const express = require('express');

const router = express.Router();


//The same URL path can be used if the methods differ
// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.send('<form action="./add-product" method="POST"><input type="text" name="title"><button type="submit">Submit</button></form>')
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
