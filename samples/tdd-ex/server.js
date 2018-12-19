const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    if (userId === 1) {
        res.send({
            "id": 1,
            "name": "Code Grit",
            "email": "info@codegrit.jp"
        });
    } else {
        console.log(userId);
        res.status(403).send({
            error: "No resource found."
        });
    }
});

app.listen(3000, () => console.log('listening on port 3000!'));