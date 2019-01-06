const express = require('express');

const adminRoutes = require('./routes/admin');

const rootDir = require('./util/path');
console.log('hey:', rootDir.toString());

const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded());

//All admin routes will now be precedd by /admin/
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '../', 'views', '404.html'));
});

app.listen(3000);