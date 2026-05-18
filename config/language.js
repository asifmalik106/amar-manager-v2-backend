import en from '../language/en.json' with { type: 'json' };
import bn from '../language/bn.json' with { type: 'json' };

const LANGUAGES = { en, bn };

export function getLanguage(headers) {
    const acceptLanguage = (typeof headers.get === 'function'
        ? headers.get('accept-language')
        : headers['accept-language']) || 'en';
    return acceptLanguage.split(',')[0].trim();
}

export function getMessage(language, messageKey) {
    try {
        const languageData = LANGUAGES[language] || LANGUAGES['en'];
        return languageData[messageKey] || 'Message not found';
    } catch (error) {
        return 'Error loading language data or accessing message';
    }
}
