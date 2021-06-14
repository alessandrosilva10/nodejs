const Speaking = require('../models/Speaking');
const axios = require('axios')

exports.createYoutubeEnglishSpeeches  = async (req, res, next) => {
    try {
        let result = '';
            await axios
            .get(process.env.YOUTUBE_API, {
                headers: {
                  'Content-Type': 'application/json'
                },
            })
            .then(res => {
                result = res.data
            })
        
        let pages = Math.ceil(result.pageInfo.totalResults / 50);
        console.log(result.nextPageToken)
        console.log(result.pageInfo.totalResults)
        console.log(pages)
        const speaking = await Speaking.create(result);

        res.status(201).json({ success: true, data: speaking});
    }catch(err) {
        res.status(400).json({ success: false})
    }
};

exports.getYoutubeEnglishSpeeches = async(req, res, next) => {
    try {
        const speaking = await Speaking.find();
        res.status(200).json({
            success: true,
            data: speaking
        })
    }catch(err) {
        res.status(400).json({ success: false })
    }
};

/*
exports.getYoutubeEnglishSpeeches = async(req, res, next) => {
    let result = '';
    try {
        await axios
        .get(process.env.YOUTUBE_API, {
            headers: {
              'Content-Type': 'application/json'
            },
        })
        .then(res => {
            result = res.data
        })
    }catch(err){
        res.status(400).json({ success: false, error: err });
    }
    res.status(200).json(result);
};
*/
exports.getYoutubeEnglishSpeech = async (req, res, next) => {
    let videoId = req.params.id;
    var parseString = require('xml2js').parseString;
    var stringified = '';
    try {
        await axios
        .post('https://video.google.com/timedtext?lang=en&v='+videoId, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => {
            parseString(res.data, function (err, result) {
                stringified = JSON.stringify(result);
                if(stringified){
                    stringified =  JSON.parse(stringified.replace(/\\n/g, ' ').replace(/\&#39;/g, '\'')); 
                }
            });
        })
    }catch(err){
        res.status(400).json({ success: false, error: err });
    }
    res.status(200).json(stringified.transcript.text);
};