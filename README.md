# React Window Global Loader

Load scripts and consume whatever they inject to the global window.

## Usage

This library exports a Provider that will load all given scripts. It expects scripts that inject things in the window and will put said injected "thing" in the context for you to consume. You'd probably want to use it somewhere around the root of your app, like so:

```js
import { WindowGlobalProvider } from 'react-window-global-loader';

import App from './App'; // your beautiful app!

const Root = () => (
  <WindowGlobalProvider
    windowGlobals={{
      propNameForInjectedApi: {
        src: 'https://example.com',
        name: 'theThingItInjectsInTheGlobal'
      }
    }}
  >
    <App />
  </WindowGlobalProvider>
);
```

Somewhere nested inside the App component, you will want consumers to use the things that have been injected, like so:

```js
import { WindowGlobalConsumer } from 'react-window-global-loader';

const ImaginaryApiUser = ({ place }) => (
  <WindowGlobalConsumer>
    {({ propNameForInjectedApi }) =>
      propNameForInjectedApi ? (
        propNameForInjectedApi.getComponent('this-api-is-imaginary')
      ) : (
        <div>Loading!</div>
      )
    }
  </WindowGlobalConsumer>
);
```
