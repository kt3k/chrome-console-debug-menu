# chrome-console-debug-menu v0.1.0

> A machanism to define and document debug menu for chrome console panel.

# Usage

Install via npm:

    npm install chrome-console-debug-menu

Define the menu object like the below:

```js
const Menu = require('chrome-console-debug-menu')

window.m = Menu.create('m', {
  ls: {
    description: 'localStorage controls',
    methods: {
      clear: {
        description: 'Clear localStorage',
        func () {
          console.log('Clearing localStorage')
          localStorage.clear()
        }
      },
      typical: {
        description: 'Sets localStorage in a typical state',
        func () {
          console.log('Setting localStorage in a typical state')
          localStorage.clear()
          localStorage.setItem('foo', 'bar')
        }
      }
    }
  }
})
```

Then turn on "Enable custom formatters" option in "Console" section of settings of Chrome DevTools. See [this](https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview#) for defails.

Then bundle and load the above script in browser and then open devtools console and you'll get object tree `m` like the below:

:screenshot:

- You can see submenus under `m` by hitting `m`.
- You can see methods under `m.ls` by hitting `m.ls`
- You can invoke localStorage's `clear` task by hitting `m.ls.clear()`
- You can invoke localStorage's `typical` task by hitting `m.ls.typical()`

Likewise, you can define arbitrary menus under this object tree.

# APIs

```js
const menu = require('chrome-console-debug-menu')
```

## menu.create(obj)

- @param {Object} obj
- @return {Menu}

Creates menu object from the given object. See the example above for the usage.

## menu.resetLocalStorage({ message, localStorage })

- @param {string} message The message to show
- @param {Object} localStorage The object to set as localStorage

Sets the localStorage by the given object, showing the given message.

# License

MIT
