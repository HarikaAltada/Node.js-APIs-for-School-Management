const express = require('express');
const schoolController = require('../controller/schoolController');
const validateSchoolData = require('../middlewares/validation');

const router = express.Router();

// Add School API with validation middleware
router.post('/addSchool', validateSchoolData, schoolController.addSchool);

// List Schools API
router.get('/listSchools', schoolController.listSchools);

module.exports = router;
