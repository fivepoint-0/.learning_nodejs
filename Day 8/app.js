const express = require('express');

const adminData = require('./routes/admin');

const rootDir = require('./util/path');

console.log('LOG | ', rootDir.toString());

const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');

const path = require('path');

const app = express();

const expressHbs = require('express-handlebars');

app.engine('hbs', expressHbs({
  layoutsDir: 'views/layouts',
  defaultLayout: 'main-layout',
  extname: 'hbs'
}));
// app.set('view engine', 'pug');
app.set('view engine', 'hbs'); // arg2 Has to match app.engine(arg1)
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
  res.render('404', {pageTitle: "Hbs not found :("});
});

app.listen(3000);
