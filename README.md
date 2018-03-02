
# Simple-Translations

For those who want to support multiple languages without a lot of complication, dependancies or ties to a framework.

## Features

- Automatically detects and uses the browser's language settings by default
- Easily override default language
- Supports static and dynamic strings (can pass variables into text)
- Decent error handling
- Can be imported as a class or a generic function

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

## Class Usage

see *./examples/index-class.html*

### Getting Started

- import the simple-translation-class.js file
- import your supplied translation files
- register each language
- call the message() method to get a translated string
```
    import translate from '../simple-translation-class.js'

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



## Generic Function Usage

Default import usage with browser language auto detection. Language file imports are hardcoded in simple-translation.js. This is typically not a good practice but I think this is easier to follow for less seasoned people.

see *./examples/index.html*

```
import translate from 'simple-translation'

translate.messages.exampleString //renders a string

translate.messages.exampleFunction('John')

```


Explicitly setting which translation file to use

```

  import { getLocale } from '../simple-translation.js'

  getLocale('fr').messages.exampleString

```
