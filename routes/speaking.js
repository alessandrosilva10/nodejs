const express = require('express');
const { 
    getYoutubeEnglishSpeeches, 
    createYoutubeEnglishSpeeches,
    getYoutubeEnglishSpeech, 
    } = require('../controllers/speaking');
const router = express.Router();

router.route('/')
.post(createYoutubeEnglishSpeeches)
.get(getYoutubeEnglishSpeeches);

router.route('/:id')
.post(getYoutubeEnglishSpeech);

module.exports = router;