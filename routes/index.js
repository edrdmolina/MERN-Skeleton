// Libraries
const express = require('express');
const router = express.Router();

// Controller modules
const controller = require('../controller/index.js')

// Middleware
const {
    catchAsync
} = require('../middleware');

// GET testing server
router.get('/testing', catchAsync(controller.testing));

// POST testing mongo connection
router.post('/testing', catchAsync(controller.postTesting))

module.exports = router;