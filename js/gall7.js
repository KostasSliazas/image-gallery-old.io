(function (w, d) {
  'use strict'
  const getConfig = typeof w['IGConfig'] === 'undefined' || w['IGConfig']// IGConfig variables with defaults for (google closure compile)
  const IG = {}
  IG.folder = getConfig['folder'] || 'big/' // default folder 'big'
  IG.imageContainer = getConfig['imageContainer'] || 'images-container'
  IG.timer = typeof getConfig['delaySeconds'] === 'number' && isFinite(getConfig['delaySeconds']) ? getConfig['delaySeconds'] * 1000 : 2000
  IG.showButtonsOnPlay = typeof getConfig['showButtonsOnPlay'] === 'undefined' ? true : !!getConfig['showButtonsOnPlay']
  IG.showButtons = typeof getConfig['showButtons'] === 'undefined' ? true : !!getConfig['showButtons']
  IG.containersArray = []// elements containers array
  IG.imagesArray = []// all elements array
  IG.container = []
  IG.isAutoPlayOn = false
  IG.isActive = false
  IG.indexOfImage = 0
  IG.timeOut = 0
  IG.frag = d.createDocumentFragment()// all stuff for creating main gallery window
  IG.clos = d.createElement('button')
  IG.ilef = d.createElement('button')
  IG.irig = d.createElement('button')
  IG.imag = d.createElement('div')
  IG.cent = d.createElement('div')
  IG.left = d.createElement('div')
  IG.rigt = d.createElement('div')
  IG.head = d.createElement('div')
  IG.insi = d.createElement('div')
  IG.cent.appendChild(IG.insi)
  IG.cent.appendChild(IG.rigt).appendChild(IG.irig).id = 'irig7'
  IG.cent.appendChild(IG.left).appendChild(IG.ilef).id = 'ilef7'
  IG.imag.appendChild(IG.head).appendChild(IG.clos).id = 'clos7'
  IG.imag.appendChild(IG.cent).id = 'cent7'
  IG.frag.appendChild(IG.imag).id = 'imag7'
  IG.rigt.id = 'rigt7'
  IG.insi.id = 'insi7'
  IG.left.id = 'left7'
  IG.head.id = 'head7'
  IG.irig.setAttribute('aria-label', 'Next')
  IG.ilef.setAttribute('aria-label', 'Previous')
  IG.clos.setAttribute('aria-label', 'Close')
  IG.clos.setAttribute('title', 'Press Esc to close')
  // IG.imag.setAttribute('tabindex', '-1')
  IG.imag.className = 'hide7'

  // show download and autoplay buttons if (true = default)
  if (IG.showButtons) {
    IG.wdow = d.createElement('button')
    IG.play = d.createElement('button')
    IG.wdow.setAttribute('aria-label', 'Download')
    IG.play.setAttribute('aria-label', 'Play')
    IG.foot = d.createElement('div')
    IG.alts = d.createElement('div')
    IG.onow = d.createElement('div')
    IG.fine = d.createElement('div')
    IG.down = d.createElement('span')
    IG.foot.id = 'foot7'
    IG.onow.id = 'onow7'
    IG.down.id = 'down7'
    IG.wdow.id = 'wdow7'
    IG.fine.id = 'stat7'
    IG.onow.appendChild(IG.alts).id = 'alts7'
    IG.imag.appendChild(IG.foot).appendChild(IG.play).id = 'play7'
    IG.imag.appendChild(IG.onow).appendChild(IG.wdow).appendChild(IG.down)
    IG.foot.appendChild(IG.fine)
  }
  d.body.appendChild(IG.frag)// append document fragment to <body>

  // autoplay method
  IG.autoPlay = function () {
    if (this.isAutoPlayOn) this.clear()
    else {
      this.isAutoPlayOn = true
      // this.loaded.call(this.imgs)
      this.imgs.onload = loadComplete.bind(this.imgs)
      if (IG.showButtons) this.play.className = 'acts7'
    }
  }

  // autoplay method loop
  IG.autoPlayLoop = function () {
    this.timeOut = setTimeout(function () {
      this.right().show()
      if (!this.showButtonsOnPlay) {
        this.left.className = this.rigt.className = this.clos.className = 'hide7'
        if (this.showButtons) this.foot.className = this.onow.className = 'hide7'
      }
      this.indexOfImage === this.imagesArray.length - 1 && this.clear()
    }.bind(this), this.timer)
  }

  // image is loaded method
  // IG.loaded = function () {
  //   this.onload = loadComplete.bind(this)
  //   // sometimes not image src reloaded without this hack
  //   // const src = this
  //   // this.src = this.src
  // }

  // clear method to reset all values
  IG.clear = function () {
    clearTimeout(this.timeOut)
    this.timeOut = 0
    this.isAutoPlayOn = false
    if (this.showButtons) this.play.className = ''
    if (this.showButtons) this.foot.className = this.onow.className = ''
    if (!this.showButtonsOnPlay) this.clos.className = ''
    this.leftRigthBtnsShow()
    return this
  }

  // downloads method
  IG.downloads = function () {
    const a = d.createElement('a')// create link
    const fileName = this.imgs.src.split('/').pop()// add class active for button animation
    this.onow.dataset.selected = fileName
    a.setAttribute('rel', 'noopener noreferrer')
    a.setAttribute('download', fileName)
    a.href = this.imgs.src
    a.target = '_blank'
    a.click()
    a.remove()
  }

  // to left button method loop from images index
  IG.lefts = function () {
    if (this.indexOfImage > 0) this.indexOfImage--
    else this.indexOfImage = this.imagesArray.length - 1
    this.ilef.focus()
    return this
  }

  // to right button method loop from images index
  IG.right = function () {
    if (this.indexOfImage < this.imagesArray.length - 1) this.indexOfImage++
    else this.indexOfImage = 0
    this.irig.focus()
    return this
  }

  // function on close
  IG.close = function () {
    this.clear()
    this.isActive = false
    this.imag.className = 'hide7'
    d.documentElement.style.overflow = 'initial'// back to initial state of overflow
  }

  // Left right buttons show/check method
  IG.leftRigthBtnsShow = function () {
    this.left.className = this.indexOfImage === 0 ? 'hide7' : ''
    this.rigt.className = this.indexOfImage === this.imagesArray.length - 1 ? 'hide7' : ''
  }

  // show image method to show image when loaded
  IG.show = function () {
    this.imgs && this.insi.removeChild(this.insi.firstChild)// if image exist remove and later recreate it
    if (!this.isActive) { // don't rewrite values if active and set active gallery
      this.isActive = true
      d.documentElement.style.overflow = 'hidden'// this stops from scroll when tab pressed and hides scrollbar
      this.imag.className = ''
      this.irig.focus()
    }

    this.leftRigthBtnsShow()
    const image = this.imagesArray[this.indexOfImage]
    const fileName = image.src.split('/').pop()// get image src file name

    if (this.showButtons) {
      this.alts.innerText = decodeURI(fileName)
      this.fine.innerText = Number(this.indexOfImage) + 1 + '/' + this.imagesArray.length
    }

    this.imgs = d.createElement('img')
    this.imgs.setAttribute('alt', image.getAttribute('alt') || 'No alt attribute')
    this.imgs.onerror = function (e) { e.target.src = image.src }
    this.imgs.src = image.src.substr(image.src.length - 3) === 'svg' ? image.src : image.src.replace(fileName, this.folder + fileName)
    this.insi.appendChild(this.imgs)
    this.insi.className = 'spin7'
    // this.loaded.call(this.imgs)
    this.imgs.onload = loadComplete.bind(this.imgs)
  }

  // assign container elements with custom or (default = images-container) class or BODY (default = BODY)
  IG.container = d.getElementsByClassName(IG.imageContainer).length > 0
    ? d.getElementsByClassName(IG.imageContainer)
    : d.getElementsByTagName('body')
  for (let l = IG.container.length - 1; l >= 0; l--) IG.containersArray.push(IG.container[l])

  // Loop from elements and add to array
  for (let i = IG.containersArray.length - 1; i >= 0; i--) {
    const img = IG.containersArray[i].getElementsByTagName('img')
    for (let j = 0; j < img.length; j++) {
      // img[j].parentElement.className += ' spin7'
      // IG.loaded.call(img[j])
      IG.imagesArray.push(img[j])
    }
  }

  // listen for clicked on image element and load show method
  IG.listenForIG = function (e) {
    const target = e.target
    if (target.tagName === 'IMG') {
      this.indexOfImage = this.imagesArray.indexOf(target) > -1 ? this.imagesArray.indexOf(target) : 0// set image index on click
      this.show()
      // e.preventDefault()
      e.stopImmediatePropagation()
    }
  }

  // autoplay and image loaded helper to remove class 'loader'
  function loadComplete () {
    if (typeof this !== 'undefined' && this.parentElement) {
      this.parentElement.className = this.parentElement.className.replace(new RegExp('(?:^|\\s)' + 'spin7' + '(?!\\S)'), '')
      IG.isAutoPlayOn && IG.autoPlayLoop()
    }
  }

  if (IG.containersArray[0] && IG.containersArray[0].tagName === 'BODY') d.body.addEventListener('click', function (e) { IG.listenForIG(e) })
  else for (let k = IG.containersArray.length - 1; k >= 0; k--) IG.containersArray[k].addEventListener('click', function (e) { IG.listenForIG(e) })

  // add click addEventListener to image div (gallery window)
  IG.imag.addEventListener('click', function (e) {
    const target = e.target.id
    if (target === 'wdow7' && IG.imagesArray[IG.indexOfImage].src.split('/').pop() !== IG.onow.dataset.selected) IG.clear().downloads()
    if (target === 'rigt7' || target === 'irig7') IG.clear().right().show()
    if (target === 'left7' || target === 'ilef7') IG.clear().lefts().show()
    if (target === 'cent7' && IG.isAutoPlayOn) IG.clear()
    target === 'play7' && IG.autoPlay()
    target === 'clos7' && IG.close()
    e.stopImmediatePropagation()
  })

  // add keyup addEventListener to image div (gallery window)
  w.addEventListener('keyup', function (e) {
    const key = e.key
    if (!IG.isActive || e.isComposing || key === 229) return
    key === 'ArrowLeft' && IG.clear().lefts().show()
    key === 'ArrowRight' && IG.clear().right().show()
    key === 'Escape' && IG.close()
    key === ' ' && IG.autoPlay()
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
      if (moveX < 0) IG.clear().right().show()
      else IG.clear().lefts().show()
    }
  }
  IG.imag.addEventListener('touchstart', touchStart, { passive: true })
  IG.imag.addEventListener('touchend', touchEnd)
  // everything to handle swipe left/right ends
})(window, document)
