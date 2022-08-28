(function (w, d) {
  'use strict'
  /**
 * Function appendChild helper
 * @param {...*} e
 */
  const append = function (e) {
    const arrg = arguments
    for (let i = 1; i < arrg.length; i++) e.appendChild(arrg[i])
  }

  /**
 * Function setAttribute helper
 * @param {...*} e
 */
  const atribute = function (e) {
    const arrg = arguments
    for (let i = 1; i < arrg.length; i += 2) e.setAttribute(arrg[i], arrg[i + 1])
  }

  /**
 * Function createElement helper
 * @param {string} e
 */
  const element = function (e) { return d.createElement(e) }

  // get config from window.IGConfig
  const getConfig = typeof w['IGConfig'] !== 'undefined' && w['IGConfig'] // eslint-disable-line

  // add link CSS to head
  const resource = element('link')
  atribute(resource, 'rel', 'stylesheet', 'href', 'css/gall7.min.css')
  append(d.getElementsByTagName('head')[0], resource)

  // create object of image gallery
  const IG = {}
  IG.folder = getConfig['folder'] || 'big/' // eslint-disable-line
  IG.imageContainer = getConfig['imageContainer'] || 'images-container' // eslint-disable-line
  IG.timer = isFinite(getConfig['delaySeconds']) ? getConfig['delaySeconds'] * 1000 : 1700 // eslint-disable-line
  IG.showButtonsOnPlay = typeof getConfig['showButtonsOnPlay'] === 'undefined' ? true : !!getConfig['showButtonsOnPlay'] // eslint-disable-line
  IG.showButtons = typeof getConfig['showButtons'] === 'undefined' ? true : !!getConfig['showButtons'] // eslint-disable-line
  IG.imagesArray = []// all elements array
  IG.isAutoPlayOn = false
  IG.isActive = false
  IG.indexOfImage = 0
  IG.timeOut = 0
  IG.clos = element('button')
  IG.ilef = element('button')
  IG.irig = element('button')
  IG.imag = element('div')
  IG.cent = element('div')
  IG.left = element('div')
  IG.rigt = element('div')
  IG.insi = element('div')
  IG.cent.id = 'cent7'
  IG.ilef.id = 'ilef7'
  IG.irig.id = 'irig7'
  IG.clos.id = 'clos7'
  IG.rigt.id = 'rigt7'
  IG.insi.id = 'insi7'
  IG.left.id = 'left7'
  IG.imag.id = 'imag7'
  IG.imag.className = 'hide7'
  append(IG.cent, IG.insi, IG.rigt, IG.left, IG.clos)
  append(IG.rigt, IG.irig)
  append(IG.left, IG.ilef)
  append(IG.imag, IG.cent)
  atribute(IG.irig, 'aria-label', 'Next')
  atribute(IG.ilef, 'aria-label', 'Previous')
  atribute(IG.clos, 'aria-label', 'Close', 'title', 'Press Esc to close')
  append(d.body, IG.imag)// append document fragment to <body>

  // autoplay method loop
  IG.autoPlayLoop = function () {
    this.isAutoPlayOn = true
    if (IG.showButtons) this.play.className = 'acts7'

    this.timeOut = setTimeout(function () {
      this.right().show()
      if (!this.showButtonsOnPlay) {
        this.left.className = this.rigt.className = this.clos.className = 'hide7'
        if (this.showButtons) this.foot.className = this.onow.className = 'hide7'
      }
      this.indexOfImage === this.imagesArray.length - 1 && this.clear()
    }.bind(this), this.timer)
  }

  // autoplay and image loaded helper to remove class 'loader'
  IG.loadComplete = function () {
    // remove class spin7 (loader)
    this.insi.className = ''
    // if autoplay is set loop from images
    this.isAutoPlayOn && this.autoPlayLoop()
  }

  // downloads method
  IG.downloads = function () {
    const a = element('a') // create link
    // const fileName = this.imgs.src.split('/').pop()// add class active for button animation
    // this.onow.dataset.selected = fileName
    atribute(a, 'rel', 'noreferrer', 'download', this.imgs.src.split('/').pop(), 'href', this.imgs.src, 'target', '_blank')
    a.click()
    a.remove()
  }

  // to left button method loop from images index
  IG.lefts = function () {
    if (this.indexOfImage > 0) this.indexOfImage--
    else this.indexOfImage = this.imagesArray.length - 1
    return this
  }

  // to right button method loop from images index
  IG.right = function () {
    if (this.indexOfImage < this.imagesArray.length - 1) this.indexOfImage++
    else this.indexOfImage = 0
    return this
  }

  // clear method to reset all values
  IG.clear = function () {
    clearTimeout(this.timeOut)
    this.timeOut = 0
    this.isAutoPlayOn = false
    if (this.showButtons) this.foot.className = this.onow.className = this.play.className = ''
    if (!this.showButtonsOnPlay) this.clos.className = ''
    // this.leftRigthBtnsShow()
    return this
  }

  // method on close
  IG.close = function () {
    this.clear()
    this.isActive = false
    this.imag.className = 'hide7'
    d.documentElement.style.overflow = 'visible'// back to initial state of overflow
  }

  // Left right buttons show/check method
  // IG.leftRigthBtnsShow = function () {
  //   this.left.className = this.indexOfImage === 0 ? 'hide7' : ''
  //   this.rigt.className = this.indexOfImage === this.imagesArray.length - 1 ? 'hide7' : ''
  // }

  // show image method to show image when loaded and recreating image element
  IG.show = function () {
    const index = this.imagesArray[this.indexOfImage]
    const fullName = index.src
    const fileName = fullName.split('/').pop()
    const fullNamePrefixed = fileName.slice(0, -3) === 'svg' ? fullName : fullName.replace(fileName, this.folder + fileName)

    // don't rewrite values if active and set active gallery
    if (!this.isActive) {
      this.isActive = true
      d.documentElement.style.overflow = 'hidden'// hide scrollbar
      this.imag.className = ''
    }

    // if same src return
    if (this.imgs && (this.imgs.src === fullName || this.imgs.src === fullNamePrefixed)) return

    // add spin7 class on show
    this.insi.className = 'spin7'

    // if image exist remove and later recreate it
    this.imgs && this.insi.removeChild(this.imgs)

    // show left right buttons and bottom information (file name and index)
    // this.leftRigthBtnsShow()

    // show index and filename
    if (this.showButtons) {
      this.alts.innerText = decodeURI(fileName)
      this.fine.innerText = Number(this.indexOfImage) + 1
    }

    // create new image element
    this.imgs = element('img')

    // set image alt attribute
    atribute(this.imgs, 'alt', index.alt)

    // append image to div
    append(this.insi, this.imgs)

    // image onerror methods
    this.imgs.onerror = function (e) {
      e.target.onerror = null // escape from infinite loop
      e.target.src = fullName // set same img source
    }

    // image onload methods
    this.imgs.onload = this.loadComplete.bind(this)

    // set image src if svg return full name else try to load big image
    this.imgs.src = fullNamePrefixed
  }

  // listen for clicked on image element and load show method
  IG.listenForIG = function (e) {
    const target = e.target
    if (target.tagName === 'IMG') {
      this.indexOfImage = this.imagesArray.indexOf(target) > -1 ? this.imagesArray.indexOf(target) : 0// set image index on click
      this.show()
      e.stopImmediatePropagation()
    }
  }

  // assign container elements with custom or (default = images-container) class or BODY (default = BODY)
  const container = d.getElementsByClassName(IG.imageContainer).length > 0
    ? d.getElementsByClassName(IG.imageContainer)
    : d.getElementsByTagName('body')

  const containersArray = []
  for (let l = container.length - 1; l >= 0; l--) containersArray.push(container[l])

  // Loop from elements and add to array
  for (let i = containersArray.length - 1; i >= 0; i--) {
    const img = containersArray[i].getElementsByTagName('img')
    for (let j = 0; j < img.length; j++) IG.imagesArray.push(img[j])
  }
  // show download and autoplay buttons if (true = default)
  if (IG.showButtons) {
    IG.wdow = element('button')
    IG.play = element('button')
    IG.foot = element('div')
    IG.onow = element('div')
    IG.alts = element('span')
    IG.fine = element('span')
    IG.down = element('span')
    IG.alts.id = 'alts7'
    IG.play.id = 'play7'
    IG.foot.id = 'foot7'
    IG.onow.id = 'onow7'
    IG.down.id = 'down7'
    IG.wdow.id = 'wdow7'
    IG.fine.id = 'stat7'
    append(IG.onow, IG.alts, IG.wdow)
    append(IG.imag, IG.onow, IG.foot)
    append(IG.foot, IG.play, d.createTextNode(IG.imagesArray.length + '['), IG.fine, d.createTextNode(']'))
    append(IG.wdow, IG.down)
    atribute(IG.wdow, 'aria-label', 'Download')
    atribute(IG.play, 'aria-label', 'Play')
  }
  if (containersArray[0] && containersArray[0].tagName === 'BODY') d.body.addEventListener('click', function (e) { IG.listenForIG(e) })
  else for (let k = containersArray.length - 1; k >= 0; k--) containersArray[k].addEventListener('click', function (e) { IG.listenForIG(e) })

  /** @suppress {missingProperties} */
  const k = {
    'left7': function () { IG.clear().lefts().show() }, // eslint-disable-line
    'rigt7': function () { IG.clear().right().show() }, // eslint-disable-line
    'clos7': function () { IG.close() }, // eslint-disable-line
    'wdow7': function () { IG.clear().downloads() }, // eslint-disable-line
    'play7': function () { IG.isAutoPlayOn ? IG.clear() : IG.autoPlayLoop() } // eslint-disable-line
  }
  /** @suppress {missingProperties} */
    k['ArrowLeft'] = k['left7'] // eslint-disable-line
    k['ArrowRight'] = k['rigt7'] // eslint-disable-line
    k[' '] = k['play7'] // eslint-disable-line
    k['Escape'] = k['clos7'] // eslint-disable-line

  // add click addEventListener to image div (gallery window)
  IG.imag.addEventListener('click', function (e) {
    if (!k[e.target.id]) return IG.isAutoPlayOn && IG.clear()
    k[e.target.id]()
    e.preventDefault()
    e.stopPropagation()
  })

  // add keyup addEventListener to image div (gallery window)
  w.addEventListener('keyup', function (e) {
    if (!k[e.key] || !IG.isActive || e.isComposing || e.key === 229) return
    k[e.key]()
    e.preventDefault()
    e.stopImmediatePropagation()
  })

  // everything to handle swipe left/right
  // https://code-maven.com/swipe-left-right-vanilla-javascript
  const minHorizontalMove = 30
  const maxVerticalMove = 30
  const withinMs = 1000
  let startXPos
  let startYPos
  let startTime

  function touchStart (event) {
    startXPos = event.touches[0].pageX
    startYPos = event.touches[0].pageY
    startTime = new Date()
  }

  function touchEnd (event) {
    const endXPos = event.changedTouches[0].pageX
    const endYPos = event.changedTouches[0].pageY
    const endTime = new Date()
    const moveX = endXPos - startXPos
    const moveY = endYPos - startYPos
    const elapsedTime = endTime - startTime
    if (Math.abs(moveX) > minHorizontalMove && Math.abs(moveY) < maxVerticalMove && elapsedTime < withinMs) {
      if (moveX < 0) k['rigt7']() // eslint-disable-line
      else k['left7']() // eslint-disable-line
    }
  }
  IG.imag.addEventListener('touchstart', touchStart, { passive: true })
  IG.imag.addEventListener('touchend', touchEnd)
  // everything to handle swipe left/right ends
})(window, document)
