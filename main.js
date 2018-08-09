
var admin = require("firebase-admin");
var serviceAccount = require("./fb-auth.json");
var {FetchWordInformation, FetchWordInformationPromise} = require('./aonware.js')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pidi-8d04b.firebaseio.com"
});
var words = []
let db = admin.firestore();
db.settings({timestampsInSnapshots: true});

var AddExtendedWordDefinitions = (word, definitions) => {
    console.log('saving for:', word.word, ',found definitions:', definitions.length)
}

let allWords = db.collection("words").limit(3);
allWords.get().then( allWordsSnapshot => {
            allWordsSnapshot.forEach( wordDocument => {
                let word = wordDocument.data();
                words.push(word)
            })
        }).then( ref => {
                // console.log(words)
                words.forEach((w) => {
                    // console.log(w)
                    let extendedWordDefinitions = FetchWordInformationPromise(w, AddExtendedWordDefinitions)
                    //console.log(extendedWordDefinitions)
                })

        })

