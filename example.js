const Menu = require('./')

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
