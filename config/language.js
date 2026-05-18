const LANGUAGES = {
    en: require('../language/en.json'),
    bn: require('../language/bn.json')
};

function getLanguage(headers) {
    const acceptLanguage = (typeof headers.get === 'function'
        ? headers.get('accept-language')
        : headers['accept-language']) || 'en';
    const languages = acceptLanguage.split(',');
    return languages[0].trim();
}

function getMessage(language, messageKey) {
    try {
        const languageData = LANGUAGES[language] || LANGUAGES['en'];
        return languageData[messageKey] || 'Message not found';
    } catch (error) {
        return 'Error loading language data or accessing message';
    }
}

module.exports = { getLanguage, getMessage };
