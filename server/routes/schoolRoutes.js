const express = require('express');
const schoolController = require('../controller/schoolController');

const router = express.Router();

// Add School API
router.post('/addSchool', schoolController.addSchool);

// List Schools API
router.get('/listSchools', schoolController.listSchools);

module.exports = router;
