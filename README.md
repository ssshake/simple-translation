Simple Translations


Structure of a language file
```

export default {
  language: "english",
  languageCode: "EN",
  messages: {
    exampleString: "Example string",
    exampleFunction: variable => `Example function that returns a string plus a variable of ${variable}`,
  },
}

```

Default import usage with browser language auto detection

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
