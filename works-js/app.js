class Portfolio {

  /**
   * @param {string} selector
   */
  constructor (selector) {
    this.activeContent = null
    this.activeItem = null
    this.container = document.querySelector(selector)
    if (this.container === null) {
      throw new Error(`L'élement ${selector} n'existe pas`)
    }
    this.children = Array.prototype.slice.call(this.container.querySelectorAll('.js-item'))
    
    if (window.location.hash.startsWith('#')) {
      let element = this.container.querySelector(window.location.hash)
      if (element !== null) {
        this.show(element)
      }
    }
  }



  /**
   * Affiche l'élément avec un effet d'animation
   * @param {HTMLElement} element
   */
  slideDown (element) {
    let height = element.offsetHeight
    element.style.height = '0px'
    element.style.transitionDuration = '.5s'
    element.offsetHeight // force repaint
    element.style.height = height + 'px'
    window.setTimeout(function () {
      element.style.height = null
    }, 500)
  }

  /*
   * Masque l'élément avec un effet d'animation
   * @param {HTMLElement} element
   */
   
  slideUp (element) {
    let height = element.offsetHeight
    element.style.height = height + 'px'
    element.offsetHeight // force repaint
    element.style.height = '0px'
    window.setTimeout(function () {
      element.parentNode.removeChild(element)
    }, 500)
  }

  /**
   * Fait défiler la fenêtre jusqu'à l'élément
   * @param {HTMLElement} element
   * @param {int} offset
   */
  scrollTo (element, offset = 0) {
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: element.offsetTop - offset
    })
  }

}

class PortfolioFlex extends Portfolio {

  injectContent (child, content) {
    let index = this.children.findIndex(c => c === child)
    let offsetTop = child.offsetTop
    let i
    for (i = index; i < this.children.length; i++) {
      if (this.children[i].offsetTop > offsetTop) {
        break
      }
    }
    this.children[i - 1].after(content)
  }

}

new Portfolio('#js-portfolio');
