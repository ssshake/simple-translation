
# Simple-Translations

For those who want to support multiple languages without a lot of complication, dependancies or ties to a framework.

## Features

- Automatically detects and uses the browser's language settings by default
- Falls back to default language if there is no translation file for the user's language
- Easily override default language
- Supports static and dynamic strings (can pass variables into text)
- Basic error handling
- Minimal, you should be able to fork it and modify it without much investment


### Structure of a language file
```

export default {
  language: "english",
  languageCode: "en",
  messages: {
    exampleString: "Example string",
    exampleFunction: variable => `Example function that returns a string plus a variable of ${variable}`,
  },
}

```
Simply populate your translations in the messages object seen in the example above and save the file somewhere in your project, such as in ./translations/english.js

- *language: A human readable word for the language*
- *languageCode: The IOS 639-1 code for a language (see: https://www.w3schools.com/tags/ref_language_codes.asp)*
- *messages: An object containing key:value pairs of the string to translate*

Messages can either be a string or a function so that you can generate strings dynamically.

For dynamic strings it will take a list of variables and return a templated string.

## Usage

see *[./examples/index.html](https://ssshake.github.io/simple-translation/)*

The example file shows various uses and error handling.

The translations will default to user's browser's language. If there is no translation file for that language it will default to the english translation file. Therefore an english (or other default) translation file is required at a minimum.

### Getting Started

- import the simple-translation.js file
- import your supplied translation files
- register each language
- call the message() method to get a translated string
```
    import SimpleTranslation from '../simple-translation.js'

    import english from '../languages/english.js'
    import french from '../languages/french.js'

    let translate = new SimpleTranslation()

    translate.registerLanguage(english)
    translate.registerLanguage(french)
```

## Registering language files

**Option A** - *specify each language file individually using the registerLanguage() method*

```translate.registerLanguage(english)```

**Option B** - *specify the language files upon new translate, which will be automatically registered*

```let translate = new SimpleTranslation(english, french)```

## Render a static translation
```translate.message('exampleString')```

returns: ```Example string```

## Render a dynamic translation
```translate.message('exampleFunction')('test')```

returns: ```Example function that returns a string plus a variable of test```

## Override auto-detected language with optional argument
```translate.message('exampleString', 'fr')```

returns: ```Exemple de chaîne```

# Additional Helper Methods

## Change the default language

This package sets 'en' as the default / fallback language. If you wanted to use a different default language you can simply modify the property after instantiating simple-translation.

```translate.defaultLanguage = 'de'```

*from the top...*

```

import SimpleTranslation from '../simple-translation.js'

import german from '../languages/german.js'
import french from '../languages/french.js'

let translate = new SimpleTranslate(german, french)

translate.defaultLanguage = 'de'

```

## Get list of supported Languages

This method would be handy if you want to, for example, render a drop down list of supported languages in your app and then allow the user to choose which language to display.

```translate.getSupportedLanguages()```

returns: ```["en", "fr"]```

## Is A Language Supported?

This method is used internally to see if the user's default language matches any of the registered language files.  

```translate.isLanguageSupported('en')```

returns: ```true / false```

## Get entire language object
```translate.getLocale('en')```

returns: ```{
  language: "english",
  languageCode: "en",
  messages: {
    exampleString: "Example string",
    exampleFunction: variable => `Example function that returns a string plus a variable of ${variable}`,
  },
}```


## Tests

No tests have been written yet but the obvious first one is a test which you would include in your build process to ensure that for each language they all have the same keys. A likely bug to enter production would be missing translations for a given language file.

----------

*author: Richard Bettridge (ssshake)*

*web: http://daggasoft.com*

*twitter: @richbettridge*
