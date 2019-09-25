const awsServerlessExpress = require('aws-serverless-express');

const server = awsServerlessExpress.createServer((req, res) => {
    const page = require(`./pages/[year]/[month]/[showID].js`);

    res.setHeader('Cache-Control', 'no-cache');
    page.render(req, res);
});

exports.handler = (event, context) => {
    awsServerlessExpress.proxy(server, event, context);
};
