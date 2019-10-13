const awsServerlessExpress = require('aws-serverless-express');
const url = require('url');

const server = awsServerlessExpress.createServer((req, res) => {
    const parsedURL = url.parse(req.url);

    res.setHeader('Cache-Control', 'no-cache');

    if (/\/shows\/[0-9]+$/.test(parsedURL.pathname)) {
        require('./pages/shows/[showID]').render(req, res);
    } else if (/\/shows\/[0-9]+\/seasons\/[0-9]+$/.test(parsedURL.pathname)) {
        require('./pages/shows/[showID]/seasons/[seasonID]').render(req, res);
    } else if (/\/shows\/[0-9]+\/seasons\/[0-9]+\/episodes\/[0-9]+$/.test(parsedURL.pathname)) {
        require('./pages/shows/[showID]/seasons/[seasonID]/episodes/[episodeID]').render(req, res);
    } else {
        res.statusCode = 404;
        res.end();
    }
});

exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
};
