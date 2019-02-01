const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('shop.js', adminData.products);
    const products = adminData.products;


    //Instead of sending shop.html, use the templating engine PUG.
    res.render('shop', {prods: products, pageTitle: 'Shopping', path: '/'});
});

module.exports = router;