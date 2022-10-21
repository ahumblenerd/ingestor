const express = require('express');
const { healthController } = require('../../controllers/index');

const router = express.Router();

router.route('/').get(healthController.health);

module.exports = router;
