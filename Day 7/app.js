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
app.use(shopRoutes);


app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);