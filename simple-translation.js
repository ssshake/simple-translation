export default class SimpleTranslation{
  constructor(...languageFiles){
    this.localeData = {}
    this.browserLanguageCode = (
      typeof navigator === "undefined"
      ? "en"
      : (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage
    ).toLowerCase().split(/[_-]+/)[0]
    languageFiles.forEach((language) => {
      this.registerLanguage(language)
    })
  }

  registerLanguage(languageFile){
    if (!languageFile){
      console.error(`Simple-Translation: Language File '${languageFile.language}' not found`)
      return
    }
    if (this.localeData[languageFile.languageCode]){
      console.error(`Simple-Translation: Language File '${languageFile.language}' already registered`)
      return
    }
    this.localeData[languageFile.languageCode] = languageFile
  }

  getLocale(laguageCode){
    if (!this.localeData[laguageCode]){
      console.error(`Simple-Translation: Language definition of '${laguageCode}' Not Found`)
    }
    return this.localeData[laguageCode]
  }

  getSupportedLanguages(){
    return Object.keys(this.localeData)
  }

  message(key, languageCode = this.browserLanguageCode){
    if (!this.localeData[languageCode].messages[key]){
      console.error(`Simple-Translation: The message '${key}' for language code '${languageCode}' was not found`)
      return '<span style="color:red;">Missing Translation</span>'
    }
    return this.localeData[languageCode].messages[key]
  }
}
