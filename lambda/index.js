const awsServerlessExpress = require('aws-serverless-express');
const url = require('url');

const server = awsServerlessExpress.createServer((req, res) => {
    const parsedURL = url.parse(req.url);

    res.setHeader('Cache-Control', 'no-cache');

    if (/\/[0-9]{4}\/[0-9]{2}\/[0-9]+/.test(parsedURL.pathname)) {
        require('./pages/[year]/[month]/[showID]').render(req, res);
    } else {
        res.statusCode = 404;
        res.end();
    }
});

exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
};
