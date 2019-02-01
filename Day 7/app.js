const express = require('express');

const adminData = require('./routes/admin');

const rootDir = require('./util/path');

console.log('LOG | ', rootDir.toString());

const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');

const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "public")));

// All admin routes will now be preceded by /admin/
app.use('/admin', adminData.routes);

app.use('/add-product', (req, res, next) => {
  res.redirect('/admin/add-product');
});

app.use(shopRoutes);


app.use((req, res, next) => {
  res.render('404', {pageTitle: ":("});
});

app.listen(3000);