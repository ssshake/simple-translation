import en from "./languages/english.js"
import fr from "./languages/french.js"

const localeData = { en, fr }

const language = (navigator.languages && navigator.languages[0]) ||
                  navigator.language ||
                  navigator.userLanguage

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]

export default (localeData[languageWithoutRegionCode] || localeData[language] || localeData.en)

export const getLocale = (lang) => {
  return localeData[lang]
}
