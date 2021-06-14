const mongoose = require('mongoose');

const SpeakingSchema = new mongoose.Schema(
  {
    "kind": {
      "type": "String"
    },
    "etag": {
      "type": "String"
    },
    "nextPageToken": {
      "type": "String"
    },
    "regionCode": {
      "type": "String"
    },
    "pageInfo": {
      "totalResults": {
        "type": "Number"
      },
      "resultsPerPage": {
        "type": "Number"
      }
    },
    "items": {
      "type": [
        "Mixed"
      ]
    }
  }
);

module.exports = mongoose.model('Speaking', SpeakingSchema);
