- [Frontend API](#frontend-api)
  - [Dokomo Class Methods](#dokomo-class-methods)
    - [setBadge(directMessages, [indirectMessages])](#setbadgedirectmessages-indirectmessages)
      - [Arguments](#arguments)
      - [Usage](#usage)
    - [setDialogTitle(title)](#setdialogtitletitle)
      - [Arguments](#arguments-1)
      - [Usage](#usage-1)
    - [injectCSS(pathToCssFile)](#injectcsspathtocssfile)
      - [Arguments](#arguments-2)
      - [Usage](#usage-2)
    - [injectJSUnsafe(pathToJsFile)](#injectjsunsafepathtojsfile)
      - [Arguments](#arguments-3)
      - [Usage](#usage-3)
    - [loop(action)](#loopaction)
      - [Arguments](#arguments-4)
      - [Usage](#usage-4)
    - [onNotify(fn)](#onnotifyfn)
      - [Arguments](#arguments-5)
      - [Usage](#usage-5)
    - [handleDarkMode(callback)](#handledarkmodecallback)
      - [Arguments](#arguments-6)
      - [Callback function arguments](#callback-function-arguments)
      - [Usage](#usage-6)
    - [clearStorageData](#clearstoragedata)
      - [Arguments](#arguments-7)
      - [Usage](#usage-7)
    - [releaseServiceWorkers](#releaseserviceworkers)
    - [safeParseInt(stringText)](#safeparseintstringtext)
      - [Arguments](#arguments-8)
      - [Usage](#usage-8)
    - [isImage(link)](#isimagelink)
      - [Arguments](#arguments-9)
      - [Usage](#usage-9)
    - [setDialogTitle(title)](#setdialogtitletitle-1)
      - [Arguments](#arguments-10)
      - [Usage](#usage-10)

# Frontend API

Provides a set of helper functions to integrate the service into [Dokomo](https://dokomo.org).

## Dokomo Class Methods

### setBadge(directMessages, [indirectMessages])

Sets the unread message badge

#### Arguments

1. `int` directMessages

- sets the count of direct messages eg. Slack direct mentions, or a message to @channel

2. `int` indirectMessages (optional)

- Set a badge that defines there are new messages but they do not involve me directly to me eg. in a channel (default value: 0)

#### Usage

```js
Dokomo.setBadge(4, 2);

// or

Dokomo.setBadge(3);
```

### setDialogTitle(title)

Sets the active dialog title to the app title

#### Arguments

1. `string` title

- sets the active dialog title eg. WhatsApp contact name

#### Usage

```js
Dokomo.setDialogTitle('Dialog title');
```

### injectCSS(pathToCssFile)

Injects the contents of one or more CSS files into the current webview

#### Arguments

1. `string` cssFile

- CSS files that should be injected. This must be an absolute path to the file

#### Usage

```js
const path = require('path');

// inject a single css file
Dokomo.injectCSS(path.join(__dirname, 'style.css'));

// inject multiple css files
const globalStyles = path.join(__dirname, 'global.css');
const focusModeStyles = path.join(__dirname, 'focusmode.css');

Dokomo.injectCSS(globalStyles, focusModeStyles);
```

### injectJSUnsafe(pathToJsFile)

Injects the contents of one or more JavaScript files into the current webview without context isolation

Dokomo uses context isolation to prevent services from accessing Node.js APIs in the webview.
If you want to expose objects to the service (eg. via the `window` object) or interact with the Javascript loaded by the service you must do so from a script injected with this method.
Trying to overwrite properties of the `window` object or other objects or trying to interact with the Javascript loaded by the service from `webview.js` will fail due to context isolation.

The code is executed as if part of the body of a Javascript function, ie. you should modify the `window` object explicitly to expose objects in the global scope.

#### Arguments

1. `string` jsFile

- JavaScript files that should be injected. This must be an absolute path to the file

#### Usage

```js
const path = require('path');

// inject a single css file
Dokomo.injectJSUnsafe(path.join(__dirname, 'webview-unsafe.js'));

// inject multiple css files
const globalScripts = path.join(__dirname, 'global.js);
const focusModeScripts = path.join(__dirname, 'focusmode.js);

Dokomo.injectCSS(globalScripts, focusModeScripts);
```

### loop(action)

Runs an action every X milliseconds (Dokomo default is currently 1s)

#### Arguments

1. `function` action

#### Usage

```js
// slack integration
const path = require('path');

module.exports = Dokomo => {
  const getMessages = () => {
    const directMessages = $('.unread_highlights, .unread_highlight').not(
      '.hidden',
    ).length;
    const indirectMessages = $('.unread').length - directMessages;

    Dokomo.setBadge(directMessages, indirectMessages);
  };

  Dokomo.loop(getMessages);

  Dokomo.injectCSS(path.join(__dirname, 'style.css'));
};
```

### onNotify(fn)

Runs `fn` on every notification created by the service before sending them to the host (Useful if you want to update information of the notification before showing it to the user)

#### Arguments

1. `function` fn

#### Usage

```js
// messenger integration
module.exports = Dokomo => {
  const getMessages = () => {
    let count = document.querySelectorAll(
      '._5fx8:not(._569x),._1ht3:not(._569x)',
    ).length;
    const messageRequestsElement = document.querySelector('._5nxf');
    if (messageRequestsElement) {
      count += Dokomo.safeParseInt(messageRequestsElement.textContent);
    }

    Dokomo.setBadge(count);
  };

  Dokomo.loop(getMessages);

  Dokomo.onNotify(notification => {
    if (typeof notification.title !== 'string') {
      notification.title =
        ((notification.title.props || {}).content || [])[0] || 'Messenger';
    }

    return notification;
  });
};
```

### handleDarkMode(callback)

You can use a `darkmode.css` to automatically get the service into a dark theme. If your service already supports its own dark mode (e.g. Reddit and YouTube have built-in dark modes), then you can use a custom dark mode handler instead.

This handler should take the necessary steps to (de-)activate dark mode on the page, e.g. by clicking a button or flipping a switch.

Dokomo won't activate DarkReader or inject `darkmode.css` if the recipe has defined a custom handler. If you still need to do this, you can use the `injectDarkModeStyle` or `enableDarkMode` function provided as the second argument.

#### Arguments

1. `function` callback

#### Callback function arguments

1. `boolean` isEnabled: Is Dark Mode currently enabled?
2. `object` helpers: Helper functions that you can use in your function:
   `enableDarkMode` - Enable DarkReader
   `disableDarkMode` - Disable DarkReader
   `injectDarkModeStyle` - Inject darkmode.css
   `removeDarkModeStyle` - Remove service's darkmode.css
   `isDarkModeStyleInjected` - Function that returns true if darkmode.css is injected into the page

#### Usage

```JavaScript
// Handler that works for Reddit
Dokomo.handleDarkMode((isEnabled, helpers) => {
  // Open dropdown menu if not already open
  const menu = document.querySelector('#USER_DROPDOWN_ID');
  if (menu.getAttribute('aria-expanded') === 'false') {
    menu.click();
  }

  setTimeout(() => {
    // Check if service is already in right mode
    const btn = document.querySelector('[role=menu] button button');
    const checked = btn.getAttribute('aria-checked') === 'true';

    if ((checked && !isEnabled) || (!checked && isEnabled)) {
      // Click the button to switch between modes
      btn.click();
    }
  }, 50);
});

// --- or ---

// Helper that activates DarkReader and injects your darkmode.css at the same time
Dokomo.handleDarkMode((isEnabled, helpers) => {
  if (isEnabled) {
    helpers.enableDarkMode();
    if (!helpers.isDarkModeStyleInjected()) {
      helpers.injectDarkModeStyle();
    }
  } else {
    helpers.disableDarkMode();
    helpers.removeDarkModeStyle();
  }
})
```

### clearStorageData

While exiting/closing/disabling the service, if you want to clear the local storage, you can use this method to effect the same.

#### Arguments

1. `id` of the recipe
2. struct of `storages`

#### Usage

```JavaScript
  Dokomo.clearStorageData(settings.id, {
      storages: [
        'appcache',
        'serviceworkers',
        'cachestorage',
        'websql',
        'indexdb',
      ],
    });
```

### releaseServiceWorkers

While exiting/closing/disabling the service, if you want to release any service workers, you can use this method to effect the same.

### safeParseInt(stringText)

A utility method that can be used to safely parse the text content (handles nulls, undefined, etc). Basically a wrapper around `parseInt` - but handles the safety checks.

#### Arguments

1. `stringText` String to be parsed into a number. (Could be `null` or `undefined`) Defaults to `0`

#### Usage

```JavaScript
Dokomo.safeParseInt(mySelector.innerText)
```

### isImage(link)

A utility method that can be used to verify if a link is an image. Returns `true` if is image and `false` if it is not an image.

#### Arguments

1. `url` Url to be parsed.

#### Usage

```JavaScript
Dokomo.isImage(link)
```

### setDialogTitle(title)

When you want to set the title of the Dokomo window (while this service is active or in focus), you can use this function

#### Arguments

1. `title`: The title to be set (for eg: the chat message person/group name in whatsapp)

#### Usage

```JavaScript
Dokomo.setDialogTitle(element ? element.textContent : null);
```
