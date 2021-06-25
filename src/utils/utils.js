// Public
const storage = window.localStorage;

const utils = {
    getLocale(){
        // Determines the appropriate locale to be used.
        // If the user has defined a preferred locale, it is used.
        // Otherwise, a locale is determined from properties of the
        // navigator object, in order of known reliability. If no
        // locale is found, the 'en-US' locale is used.
        // 
        // Reference: https://stackoverflow.com/questions/673905/best-way-to-determine-users-locale-within-browser#674570

        let locale = 'en-US'

        if(storage.getItem('userPreferredLocale')){
            locale = storage.getItem('userPreferredLocale')
        } else {
            if(navigator.languages){
                locale = localeSupported(navigator.languages[0]) ? navigator.languages[0] : locale
            } else if(navigator.userLanguage){
                locale = localeSupported(navigator.userLanguage) ? navigator.userLanguage : locale
            } else if (navigator.language){
                locale = localeSupported(navigator.language) ? navigator.language : locale
            } else if (navigator.browserLanguage){
                locale = localeSupported(navigator.browserLanguage) ? navigator.browserLanguage : locale
            }  else {
                locale = localeSupported(navigator.systemLanguage) ? navigator.systemLanguage : locale
            }
        }
        
        return locale
    }
}

// Local
function localeSupported(locale){
    // Assert whether a given locale is supported by the browser or not.

    let supported = false
    if(Intl.DateTimeFormat.supportedLocalesOf([locale]).length > 0){
        supported = true
    }

    return supported
}


export {utils, storage}