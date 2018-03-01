Simple Translations

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

```

import translate from 'simple-translation'

translate.messages.exampleString //renders a string


translate.messages.exampleFunction('John')

```


```



```
