const express = require('express');
const config = require('../../config/config');
const healthRoute = require('./healthRoute')
const router = express.Router();
const logger = require('../../config/logger');


const defaultRoutes = [
    {
        path: '/health',
        route: healthRoute,
    },
];

const devRoutes = [];

defaultRoutes.forEach((route) => {
    logger.info(`[default] init route ${route.path}`)
    router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
    devRoutes.forEach((route) => {
        logger.info("[dev] init route ${route.path}")
        router.use(route.path, route.route);
    });
}

module.exports = router;
