export default class SimpleTranslation{
  
  constructor(...languageFiles){
    this.localeData = {}

    this.defaultLanguage = undefined

    this.browserLanguageCode = (
      (typeof navigator === 'en'
        ? this.defaultLanguage
        : (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage
      )
      .toLowerCase()
      .split(/[_-]+/)[0]
    )


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
    
    if (!this.defaultLanguage){
      this.defaultLanguage = languageFile.languageCode
    }

    this.localeData[languageFile.languageCode] = languageFile
  }

  getLocale(languageCode){
    if (!this.localeData[languageCode]){
      console.error(`Simple-Translation: Language definition of '${languageCode}' Not Found`)
      return false
    }

    return this.localeData[languageCode]
  }

  isLanguageSupported(languageCode){
    return !!~this.getSupportedLanguages().indexOf(languageCode)
  }

  getSupportedLanguages(){
    return Object.keys(this.localeData)
  }
  
  setDefaultLanguage(languageCode){
    translate.defaultLanguage = languageCode
  }

  message(key, languageCode = this.browserLanguageCode){
    if (!(this.isLanguageSupported(languageCode))){
      console.error(`Simple-Translation: Language definition of '${languageCode}' Not Found. Defaulting to '${this.defaultLanguage}'`)
      languageCode = this.defaultLanguage

      if (!(this.isLanguageSupported(languageCode))){
        console.error(`Simple-Translation: The DEFAULT language definition of '${languageCode}' Not Found.`)
        return `<span style="color:red;">The Default Language of '${languageCode}' is Not Found'</span>`
      }
    }

    if (!this.localeData[languageCode].messages[key]){
      console.error(`Simple-Translation: The message '${key}' for language code '${languageCode}' was not found`)
      return `<span style="color:red;">Missing Translation for '${key}' for language '${this.localeData[languageCode].language}'</span>`
    }

    return this.localeData[languageCode].messages[key]
  }
}
