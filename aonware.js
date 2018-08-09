
var request = require('request')
var rp = require('request-promise');
const parseString = require('xml2js').parseString;

const AONAWARE_ENDPOINT = "http://services.aonaware.com/DictService/DictService.asmx/Define?word="

var fetchWordInformationPromise = (word, callback) => {
    const endpoint = AONAWARE_ENDPOINT + word.word;
    rp(endpoint)
        .then(function (xmlData) {
            let wordDefinitions = []
            parseString(xmlData, function (err, result) {
                result.WordDefinition.Definitions.forEach(e => {
                    e.Definition.forEach(ed => {
                        wordDefinitions.push(ed.WordDefinition)
                    })
                })
            });
            callback(word, wordDefinitions)
        })
        .catch(function (err) {

        });
}
var fetchWordInformation = (word) => {
        const endpoint = AONAWARE_ENDPOINT + word;
        request(endpoint, (err, res, body) => {
            if (err) { return console.log(err); }
            //console.log(body);
            let wordDefinitions = []
            parseString(body, function (err, result) {
                // console.log(result)
                result.WordDefinition.Definitions.forEach(e => {
                    e.Definition.forEach(ed => {
                        // console.log(ed.WordDefinition)
                        wordDefinitions.push(ed.WordDefinition)
                    })
                })
            });
            console.log(wordDefinitions)
            return wordDefinitions;
        });
    }

module.exports = {
    FetchWordInformation: fetchWordInformation,
    FetchWordInformationPromise: fetchWordInformationPromise
}
