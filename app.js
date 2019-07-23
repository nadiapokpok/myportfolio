const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

app.use('/index', require("./routes/index"));


//utilisation de express basic authentification
function auth(req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
        return;
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'pompon' && pass == 'rouxminet') {
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
    }
}

app.use('/admin', auth);

app.use('/admin', require("./routes/admin"));
app.use('/admin.supp', require ("./routes/admin.supp"));
app.use('/edit', require ("./routes/admin_edit"));



app.listen(port, () => console.log(`Allo j'écoute!`));