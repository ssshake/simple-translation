
# Simple-Translations

For those who want to support multiple languages without a lot of complication, dependancies or ties to a framework.

## Features

- Automatically detects and uses the browser's language settings by default
- Easily override default language
- Supports static and dynamic strings (can pass variables into text)
- Decent error handling


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

## Usage

see *./examples/index.html*

### Getting Started

- import the simple-translation.js file
- import your supplied translation files
- register each language
- call the message() method to get a translated string
```
    import translate from '../simple-translation.js'

    import english from '../languages/english.js'
    import french from '../languages/french.js'

    let t = new translate()

    t.registerLanguage(english)
    t.registerLanguage(french)
```

#### Registering language files

Option A - *specify each language file individually using the registerLanguage() method*

```t.registerLanguage(english)```

Option B - *specify the language files upon new translate, which will be automatically registered*

```let t = new translate(english, french)```

**Render a static translation**
```t.message('exampleString')```

returns: ```Example string```

**Render a dynamic translation**
```t.message('exampleFunction')('test')```

returns: ```Example function that returns a string plus a variable of test```

**Override auto-detected language with optional arguent**
```t.message('exampleString', 'fr')```

returns: ```Exemple de chaîne```

**Get entire language object**
```t.getLocale('en')```

returns: ```{
  language: "english",
  languageCode: "en",
  messages: {
    exampleString: "Example string",
    exampleFunction: variable => `Example function that returns a string plus a variable of ${variable}`,
  },
}```
