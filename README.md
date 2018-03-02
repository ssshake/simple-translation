
# Simple-Translations

For those who want to support multiple languages without a lot of complication, dependancies or ties to a framework.

## Features

- Automatically detects and uses the browser's language settings by default
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

*language: A human readable word for the language*
*languageCode: The IOS 639-1 code for a language (see: https://www.w3schools.com/tags/ref_language_codes.asp)*
*messages: An object contain key:value pairs of the string to translate*

Messages can either be a string or a function so that you can generate string dynamically.

For dynamic strings it will take a list of variables and return a templated string.

## Usage

see *./examples/index.html*

The example file shows various uses and error handling.

The translations will default to user's browser's language. If there is no translation file for that language is will default to the english translation file. Therefore an english translation file is required at a minimum.

### Getting Started

- import the simple-translation.js file
- import your supplied translation files
- register each language
- call the message() method to get a translated string
```
    import SimpleTranslation from '../simple-translation.js'

    import english from '../languages/english.js'
    import french from '../languages/french.js'

    let translate = new SimpleTranslate()

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

## Get list of supported Languages

This method would be handy if you want to, for example, render a drop down list of supported languages in your app and then allow the user to choose which language to display.

```translate.getSupportedLanguages()```

returns: ```["en", "fr"]```

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


----------

*author: Richard Bettridge (ssshake)*

*web: http://daggasoft.com*

*twitter: @richbettridge*
