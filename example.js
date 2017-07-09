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
