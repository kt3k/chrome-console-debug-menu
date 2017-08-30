const menu = require('./')
const { resetLocalStorage, MenuFormatter } = menu
const { expect } = require('chai')

describe('create', () => {
  it('creates menu object', () => {
    const m = menu.create('m', {
      hello: {
        desc: 'hello world',
        methods: {
          hello: {
            desc: 'Says hello',
            func () { return 'hello' }
          }
        }
      },
      ls: {
        description: 'localStorage controls',
        methods: {
          clear: {
            description: 'Clears localStorage',
            func () { return 'clearing localStorage' }
          }
        }
      }
    })

    expect(m).to.be.an('object')
    expect(m.hello).to.be.an('object')
    expect(m.ls).to.be.an('object')
    expect(m.message()).to.be.a('string')
    expect(m.hello.message()).to.be.a('string')
    expect(m.hello.hello).to.equal('hello')
    expect(m.ls.message()).to.be.a('string')
    expect(m.ls.clear).to.equal('clearing localStorage')
  })
})

describe('resetLocalStorage', () => {
  it('resets localStorage by the given parameter', () => {
    resetLocalStorage({
      localStorage: {
        a: 'hello',
        b: {
          foo: 'bar'
        }
      }
    })

    expect(localStorage.a).to.equal('hello')
    expect(localStorage.b).to.equal('{"foo":"bar"}')
  })

  it('throws the given object has invalid entry', () => {
    expect(() => resetLocalStorage({ localStorage: { a: 1, } })).to.throw()
  })
})

describe('MenuFormatter', () => {
  describe('header', () => {
    it('returns the message of the menu if the given parameter is menu object', () => {
      expect(new MenuFormatter().header(menu.create('m', {}))).to.be.an('array')
    })

    it('returns null if the given param is not a menu', () => {
      expect(new MenuFormatter().header(1)).to.equal(null)
    })
  })
  describe('hasBody', () => {
    it('returns false', () => {
      expect(new MenuFormatter().hasBody()).to.equal(false)
    })
  })
  describe('body', () => {
    it('returns null', () => {
      expect(new MenuFormatter().body()).to.equal(null)
    })
  })
})
