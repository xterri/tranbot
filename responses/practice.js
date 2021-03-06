/*
** Practice.js handles responses and return statements if user
** initializes the bot's translation/language convesation function
*/
const accessToDatabase = require('../helpers/saveData');

function setLanguage(userId, language, defaultMsg) {
    accessToDatabase("set", userId, language);

    // save user's data and check which language they want to translate to
    switch (language) {
        case "german":
            return "Okay, let's practice German!";
        case "english":
            return "English it is!";
        case "japanese":
            return "Konnichiwa!";
        default:
            // respond with "sorry" if some other language given
            return defaultMsg;
    }
};

module.exports = (response, userId) => {
    var languageParam = response.result.parameters.Languages.toLowerCase();

    // goes to async function >> "result" / promise = passed into then()'s function param
    return accessToDatabase("get", userId).then(function(result) {
        return result;
        // "language" = return value from '.then(function(result))
    }).then(function(language) {
        if (languageParam) { 
            return setLanguage(userId, languageParam, response.result.fulfillment.speech);
        }
        // anything to be done with the results must be done in here
            // cannot pass outside the promise, else it will be the last thing done
        return "Language already set to " + language.charAt(0).toUpperCase() + language.slice(1) + ".\nTo change the language, please type in 'German', 'English', or 'Japanese'";
    }).catch(function(err) {
        if (languageParam) {
            return setLanguage(userId, languageParam, response.result.fulfillment.speech);
        } else {
            return "Sorry, please pick either English, German or Japanese";
        }
    });
};