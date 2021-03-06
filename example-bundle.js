(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const Menu = require('./')

window.m = Menu.create('m', {
  ls: {
    description: 'localStorage controls',
    methods: {
      clear: {
        description: 'Clear localStorage',
        func () {
          Menu.resetLocalStorage({ message: 'Clearing localStorage' })
        }
      },
      typical: {
        description: 'Sets localStorage in a typical state',
        func () {
          Menu.resetLocalStorage({ message: 'Setting localStorage in a typical state', localStorage: { foo: 'bar' } })
        }
      },
      dump: {
        description: 'Dumps the current localStorage',
        func (message) {
          return Menu.serializeLocalStorage(message)
        }
      }
    }
  }
})

},{"./":2}],2:[function(require,module,exports){
class MenuFormatter {
  header (menu) {
    if (!(menu instanceof Menu)) {
      return null
    }

    return ['div', menu.message()]
  }

  hasBody () {
    return false
  }

  body () {
    return null
  }
}

const menuFormatter = new MenuFormatter()

/**
 * Removes the given item from the given array.
 * @param {Array} array
 * @param {any} item
 * @return {Array}
 */
const remove = (array, item) => {
  if (!array.includes(item)) {
    return
  }

  array.splice(array.indexOf(item), 1)
}

const SPECIAL_KEYS = [
  'desc',
  'description',
  'methods'
]

class Menu {
  constructor () {
    this.menus = []
    this.methods = []
    this.parent = null

    Menu.initFormatter()
  }

  static initFormatter () {
    window.devtoolsFormatters = window.devtoolsFormatters || []
    if (!window.devtoolsFormatters.includes(menuFormatter)) {
      window.devtoolsFormatters.push(menuFormatter)
    }
  }

  static create (name, obj) {
    return Menu.createWithSymbol(name, obj)
  }

  static createWithSymbol (symbol, obj) {
    const menu = new Menu()
    menu.symbol = symbol

    Menu.getSubmenuKeys(obj).forEach(key => {
      const submenu = Menu.createWithSymbol(key, obj[key])
      menu.addMenu(submenu)
    })

    menu.description = obj.description || obj.desc

    const methods = obj.methods || {}

    Object.keys(methods).forEach(key => {
      const method = methods[key]
      menu.addMethod(key, method.func, method.description || method.desc)
    })

    return menu
  }

  static getSubmenuKeys (obj) {
    const keys = Object.keys(obj)

    SPECIAL_KEYS.forEach(key => { remove(keys, key) })

    return keys
  }

  /**
   * @param {Menu} menu The menu to add
   */
  addMenu (menu) {
    this.menus.push(menu)
    menu.parent = this

    this[menu.symbol] = menu
  }

  /**
   * @param {Function} method The method
   * @param {string} description The description
   */
  addMethod (name, method, description) {
    this.methods.push({ name: name, description })
    this[name] = method
  }

  reference () {
    if (this.parent == null) {
      return this.symbol
    }

    return `${this.parent.reference()}.${this.symbol}`
  }

  messageSubMenus () {
    if (this.menus.length === 0) {
      return ''
    }

    return 'sub menus\n' + this.menus.map(menu =>
      `  ${menu.reference()} - ${menu.description}`
    ).join('\n') + '\n'
  }

  messageMethods () {
    if (this.methods.length === 0) {
      return ''
    }

    return 'methods\n' + this.methods.map(method =>
      `  ${this.reference()}.${method.name}() - ${method.description}`
    ).join('\n') + '\n'
  }

  message () {
    return this.messageSubMenus() + this.messageMethods()
  }
}

/**
 * Resets the localStorage contents by the given data, outputing the given message.
 * @param {string} message The message
 * @param {any} localStorage The data to set
 */
const resetLocalStorage = ({ message, localStorage }) => {
  localStorage = localStorage || {}
  console.log(`%c ${message}`, 'color: indianred;')

  window.localStorage.clear()

  Object.keys(localStorage).forEach(key => {
    const value = localStorage[key]

    if (typeof value === 'string') {
      window.localStorage.setItem(key, value)
    } else if (typeof value === 'object') {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      throw new Error(`invalid value type: ${typeof value}`)
    }
  })

  return window.localStorage
}

const serializeLocalStorage = (message) => {
  const obj = {}

  Object.keys(localStorage).forEach(key => {
    const value = localStorage.getItem(key)
    obj[key] = parseIfPossible(value)
  })

  return JSON.stringify({
    message,
    localStorage: obj
  }, null, 2)
}

/**
 * Tries parse the value as JSON and returns parsed object if parsed, return the value itself if not parsed.
 * @param {string} value The value to parse
 */
const parseIfPossible = value => {
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

module.exports = Menu
module.exports.resetLocalStorage = resetLocalStorage
module.exports.serializeLocalStorage = serializeLocalStorage
module.exports.MenuFormatter = MenuFormatter

},{}]},{},[1]);
