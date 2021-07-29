import {colors} from '@/modules/vars.js'

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

        if(storage.getItem('preferredLocale')){
            locale = storage.getItem('preferredLocale')
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
    },

    getTheme(){
        let theme = 'light'

        if(storage.getItem('preferredTheme')){
            let themePreference = storage.getItem('preferredTheme')

            if(['dark', 'light'].includes(themePreference)){
                theme = themePreference
            } else if (themePreference === 'system'){
                theme = window.matchMedia('(prefers-color-scheme: dark)') ? 'dark':'light'
            } else if (themePreference === 'time'){
                theme = getThemeFromCurrentTime()
            }
        } else {
            storage.setItem('preferredTheme', theme)
        }

        return theme
    },

    resetStoredSettings(){
        storage.removeItem('preferredLocale')
        storage.setItem('preferredTheme', 'light')
        storage.setItem('darkThemeStart', '20:00')
        storage.setItem('darkThemeEnd', '20:00')
    },

    getCssColors(){
        let cssColors = {}

        for (let [key, value] of Object.entries(colors)) {
            cssColors[`--${camelCaseToSnakeCase(key)}`] = value
        }

        return cssColors
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

function getThemeFromCurrentTime(){
    let now = new Date()
    let darkThemeStart = new Date()
    let darkThemeEnd = new Date()
    let theme = 'light'

    let darkThemeStartStr= storage.getItem('darkThemeStart')
    darkThemeStartStr = darkThemeStartStr ? darkThemeStartStr: '20:00'
    let darkThemeEndStr = storage.getItem('darkThemeEnd')
    darkThemeEndStr = darkThemeEndStr ? darkThemeEndStr : '06:00'

    darkThemeStart.setHours(darkThemeStartStr.split(':')[0])
    darkThemeStart.setMinutes(darkThemeStartStr.split(':')[1])
    darkThemeEnd.setHours(darkThemeEndStr.split(':')[0])
    darkThemeEnd.setMinutes(darkThemeEndStr.split(':')[1])

    if(now.getTime() >= darkThemeStart.getTime() || now.getTime() <= darkThemeEnd.getTime()){
        theme = 'dark'
    }
    return theme
}

function camelCaseToSnakeCase(str){
    // From https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case-in-javascript

    return str.split('').map((letter, idx) => {
      return letter.toUpperCase() === letter
       ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
       : letter;
    }).join('');
 }


export {utils, storage}