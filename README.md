
# Simple-Translations

For those who want to support multiple languages without a lot of complication, dependancies or ties to a framework.

## Features

- Automatically detects and uses the browser's language settings by default
- Falls back to default language if there is no translation file for the user's language
- Easy to allow users to switch to a different language (browser settings override)
- Supports static and dynamic strings (can pass variables into text)
- Decent error handling
- Minimal, you should be able to fork it and modify it without much investment. It's one small class.





#### TOC
- [Language Files](https://github.com/ssshake/simple-translation/blob/master/README.md#language-files)
- [Setup](https://github.com/ssshake/simple-translation/blob/master/README.md#setup)
- [Usage](https://github.com/ssshake/simple-translation/blob/master/README.md#usage)
- [Helper Methods](https://github.com/ssshake/simple-translation/blob/master/README.md#helper-methods)
- [Tests](https://github.com/ssshake/simple-translation/blob/master/README.md#tests)
- [Compatibility](https://github.com/ssshake/simple-translation/blob/master/README.md#compatibility)


## Language Files

### Structure of a language file

see *[./languages/english.js](https://github.com/ssshake/simple-translation/blob/master/languages/english.js)*
```

export default {
  language: "english",
  languageCode: "en",
  messages: {
    exampleStaticText: "Example string",
    exampleDynamicText: variable => `Example function that returns a string plus a variable of ${variable}`,
  },
}

```
Simply populate your translations in the messages object seen in the example above and save the file somewhere in your project, such as in ./translations/english.js

- *language: A human readable word for the language*
- *languageCode: The IOS 639-1 code for a language (see: https://www.w3schools.com/tags/ref_language_codes.asp)*
- *messages: An object containing key:value pairs of the string to translate*

Messages can either be a string or a function so that you can generate text dynamically.

For dynamic text it will take a list of variables and use a templated string to inject the variables.

----------

# Setup

see *[./examples/index.html](https://ssshake.github.io/simple-translation/)* for a live example.

The example file shows various uses and error handling.



### Getting Started


```
//import the simple-translation.js file

    import SimpleTranslation from '../simple-translation.js'
    

//import your supplied translation files

    import english from '../languages/english.js'
    import french from '../languages/french.js'


//instantiate a new SimpleTranslation

    let translate = new SimpleTranslation()


//register each language

    translate.registerLanguage(english)
    translate.registerLanguage(french)
    
    
//call the message() method to get a translated string

    console.log(
      translate.message('exampleString')
    )
```

**Important**

Translations will default to the user's browser's language. If there is no translation file for that language it will default to whichever language file was registered first. Therefore at least one translation file is required.

### Registering language files

The main piece of manual work is building out a language file for each language you support (see [language examples](https://github.com/ssshake/simple-translation/tree/master/languages)), and then registering them. Please note, that the first language file you register will be used as a default/fallback for any of your users who have their browser's language settings set to a language which you have not created a translation file for.

*If you only provide language files for english, french and spanish, but your user's browser language is set to italian, the user will get english translations because you do not have an italian language file, and because you registered english as the first language file*

To register language files you have two options:

**Option A** - *specify each language file individually using the registerLanguage() method*

```
import english from '../languages/english.js'
import french from '../languages/french.js'

const translate = new SimpleTranslation()

translate.registerLanguage(english)
translate.registerLanguage(french)
```

*A benefit of Option A is that you can add new language files dynamically, later. Though I don't know a good usecase for this.*

**Option B** - *specify the language files upon new translate, which will be automatically registered*

```
import english from '../languages/english.js'
import french from '../languages/french.js'

const translate = new SimpleTranslation(english, french)
```

*A benefit of option B is you can instantiate 'translate' and register language files in one line.*

# Usage

### Render a static translation
```translate.message('exampleString')```

returns: ```"Example string"```

### Render a dynamic translation
```translate.message('exampleFunction')('test')```

returns: ```"Example function that returns a string plus a variable of test"```

### Override auto-detected language with optional argument
```translate.message('exampleString', 'fr')```

returns: ```"Exemple de chaîne"```

----------

# Helper Methods

## setDefaultLanguage( ) - Changes the default language

This package sets **the first registered language file** as the default / fallback language. If you wanted to use a different default language you can simply modify **defaultLanguage** property after instantiating simple-translation.

```translate.setDefaultLanguage('de')```

*from the top...*

```

import SimpleTranslation from '../simple-translation.js'

import english from '../languages/english.js'
import german from '../languages/german.js'
import french from '../languages/french.js'

let translate = new SimpleTranslation(english, german, french)

translate.setDefaultLanguage('de')

```

## getSupportedLanguages( ) - Gets list of supported Languages

This method would be handy if you want to, for example, render a drop down list of supported languages in your app and then allow the user to choose which language to display.

```translate.getSupportedLanguages()```

returns: ```["en", "fr"]```

## isLanguageSupported( ) - Is a language supported?

This method is used internally to see if the user's default language matches any of the registered language files.  

```translate.isLanguageSupported('en')```

returns: ```true / false```

## getLocale( ) - Get entire language object

Because maybe you want to do your own thing with the data. *Consider submiting a feature request if you end up doing too much by hand. This package currently supports language translation but some obvious additions would be money and date/time formatting by locale.*

```translate.getLocale('en')```

returns: ```{
  language: "english",
  languageCode: "en",
  messages: {
    exampleString: "Example string",
    exampleFunction: variable => `Example function that returns a string plus a variable of ${variable}`,
  },
}```

----------

# Tests

No tests have been written yet but the obvious first one is a test which you would include in your build process to ensure that for each language they all have the same keys. A likely bug to enter production would be missing translations for a given language file.

# Compatibility

This package, as is, will not work with browsers like EI 11 due to its use of many ES6 features. For a production release of your product you will want to ensure that this package is transpiled as part of your build process. 

----------

*author: Richard Bettridge (ssshake)*

*web: http://daggasoft.com*

*twitter: @richbettridge*
