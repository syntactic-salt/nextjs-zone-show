const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    target: 'serverless',
    assetPrefix: isProd ? '/show' : '',
};
