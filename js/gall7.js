(function (w, d) {
  'use strict'
  w.onload = function () {

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

  //add link CSS to head
  const resource = element('link')
  atribute(resource, 'rel', 'stylesheet', 'href', 'data:text/css;base64,QC13ZWJraXQta2V5ZnJhbWVzIGxve3Rvey13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QGtleWZyYW1lcyBsb3t0b3std2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fS5oaWRlN3tkaXNwbGF5Om5vbmV9I2Nsb3M3OjphZnRlciwjY2xvczc6OmJlZm9yZSwjZG93bjcsI2lsZWY3OjphZnRlciwjaXJpZzc6OmFmdGVyLCNwbGF5Nzo6YWZ0ZXIsI3BsYXk3OjpiZWZvcmUsI3dkb3c3OjphZnRlciwuc3Bpbjc6OmFmdGVye2JvcmRlcjoycHggc29saWQgI2ZmZn0jaW1hZzd7dXNlci1zZWxlY3Q6bm9uZTtiYWNrZ3JvdW5kOiMwMDA7Y29sb3I6Izc3Nztwb3NpdGlvbjpmaXhlZDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO3otaW5kZXg6OTk5OX0jaW1hZzcgKiwjaW1hZzcgOjphZnRlciwjaW1hZzcgOjpiZWZvcmV7Zm9udDoxMnB4LzQgc2Fucy1zZXJpZjtwb3NpdGlvbjphYnNvbHV0ZTtib3gtc2l6aW5nOmJvcmRlci1ib3g7bWFyZ2luOjB9I2ltYWc3IGJ1dHRvbjo6YWZ0ZXIsI2ltYWc3IGJ1dHRvbjo6YmVmb3Jle2NvbnRlbnQ6IiJ9I2Zvb3Q3LCNvbm93N3t0ZXh0LWluZGVudDo1MHB4O3doaXRlLXNwYWNlOm5vd3JhcDtib3R0b206MjRweH0jYWx0czd7cmlnaHQ6NTBweDtvdmVyZmxvdzpoaWRkZW59I2FsdHM3LCNpbnNpNywjaW5zaTcgaW1nLCNzdGF0N3ttYXgtaGVpZ2h0OjEwMCU7bWF4LXdpZHRoOjEwMCU7cG9zaXRpb246cmVsYXRpdmV9I2Nsb3M3LCNpbGVmNywjaXJpZzcsI3BsYXk3LCN3ZG93N3tvcGFjaXR5Oi43fSNpbWFnNyBidXR0b246Zm9jdXMsI2ltYWc3IGJ1dHRvbjpob3ZlciwjbGVmdDc6aG92ZXIsI2xlZnQ3OmhvdmVyIGJ1dHRvbiwjcmlndDc6aG92ZXIsI3JpZ3Q3OmhvdmVyIGJ1dHRvbntiYWNrZ3JvdW5kOnJnYmEoNzcsNzcsNzcsLjIpO291dGxpbmU6MDtvcGFjaXR5OjE7Y3Vyc29yOnBvaW50ZXJ9I2ltYWc3IGJ1dHRvbjphY3RpdmUsI2xlZnQ3OmFjdGl2ZSAjaWxlZjcsI3JpZ3Q3OmFjdGl2ZSAjaXJpZzd7b3BhY2l0eTouM30jbGVmdDcsI3JpZ3Q3e3dpZHRoOjIwJTttaW4td2lkdGg6OTZweDtoZWlnaHQ6MTAwJX0jaWxlZjcsI2luc2k3IGltZywjaXJpZzd7dG9wOjUwJTt6LWluZGV4Oi0xOy13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgtNTAlKX0jaW1hZzcgYnV0dG9ue2hlaWdodDo0OHB4O3dpZHRoOjQ4cHg7Ym9yZGVyLXJhZGl1czo1MCU7Ym9yZGVyOjA7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4yKX0jY2VudDcsI2ltYWc3LCNsZWZ0NywjcmlndDcsI3dkb3c3e3RvcDowfSNjZW50NywjaW1hZzcsI2xlZnQ3LCNwbGF5N3tsZWZ0OjB9I3JpZ3Q3LCN3ZG93N3tyaWdodDowfSNjbG9zN3t0b3A6MjRweH0jaWxlZjc6OmFmdGVyLCNpcmlnNzo6YWZ0ZXJ7cGFkZGluZzo5cHg7dG9wOjE0cHh9I2Nsb3M3LCNpcmlnNywjb25vdzd7cmlnaHQ6MjRweDt0ZXh0LWFsaWduOnJpZ2h0fSNmb290NywjaWxlZjd7bGVmdDoyNHB4fSNjbG9zNzpiZWZvcmUsI2lyaWc3OjphZnRlcnstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoNDVkZWcpfSNjbG9zNzphZnRlciwjaWxlZjc6OmFmdGVyLCN3ZG93Nzo6YWZ0ZXJ7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpfSNpbGVmNzo6YWZ0ZXJ7Ym9yZGVyLXdpZHRoOjJweCAwIDAgMnB4O2xlZnQ6MTRweH0jaXJpZzc6OmFmdGVye3JpZ2h0OjE0cHg7Ym9yZGVyLXdpZHRoOjJweCAycHggMCAwfSNsZWZ0Nzpob3ZlciAjaWxlZjc6OmFmdGVye2xlZnQ6OXB4fSNyaWd0Nzpob3ZlciAjaXJpZzc6OmFmdGVye3JpZ2h0OjlweH0jY2xvczc6OmFmdGVyLCNjbG9zNzo6YmVmb3Jle2JvcmRlci13aWR0aDowIDAgMCAycHg7aGVpZ2h0OjMwcHg7bGVmdDoyM3B4O3RvcDoxMHB4fSNjZW50N3t3aWR0aDoxMDAlfSNjZW50NywjaW5zaTd7aGVpZ2h0OjEwMCU7dGV4dC1hbGlnbjpjZW50ZXJ9I2luc2k3IGltZ1tzcmMqPSIuc3ZnIl17YmFja2dyb3VuZDojZmFmYWZhfSNwbGF5Nzo6YmVmb3JlLC5zcGluNzo6YWZ0ZXJ7Ym9yZGVyLXJhZGl1czo1MCU7aGVpZ2h0OjI0cHg7d2lkdGg6MjRweH0jaW5zaTcuc3Bpbjc6OmFmdGVye2NvbnRlbnQ6IiI7LXdlYmtpdC1hbmltYXRpb246bG8gLjNzIGxpbmVhciBpbmZpbml0ZTthbmltYXRpb246bG8gLjNzIGxpbmVhciBpbmZpbml0ZTtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgI2FhYTtsZWZ0OjUwJTttYXJnaW46LTEycHggMCAwIC0xMnB4O3RvcDo1MCV9I2Rvd243LCNwbGF5Nzo6YmVmb3Jle2JvcmRlci13aWR0aDoycHg7bGVmdDoxMnB4fSNkb3duN3tib3JkZXItcmFkaXVzOjAgMCAycHggMnB4O3RvcDoyN3B4O2hlaWdodDo2cHg7d2lkdGg6MjRweDt6LWluZGV4Oi0xO3BvaW50ZXItZXZlbnRzOm5vbmU7Ym9yZGVyLXRvcDowfSNwbGF5Nzo6YmVmb3Jle3RyYW5zaXRpb246LjJzIGJvcmRlci1yYWRpdXM7dG9wOjEycHh9I3BsYXk3LmFjdHM3OjpiZWZvcmV7Ym9yZGVyLXJhZGl1czo0cHh9I3BsYXk3OjphZnRlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgI2ZmZjtib3JkZXItd2lkdGg6NXB4IDAgNXB4IDEycHg7bGVmdDoxOXB4O3RvcDoxOXB4O3dpZHRoOjEwcHh9I3BsYXk3LmFjdHM3OjphZnRlcntib3JkZXItd2lkdGg6MCAycHg7cGFkZGluZy10b3A6MTBweH0jd2Rvdzc6OmFmdGVye2JvcmRlci13aWR0aDowIDAgMnB4IDJweDtib3R0b206MjFweDtoZWlnaHQ6MTJweDtsZWZ0OjE4cHg7d2lkdGg6MTJweH0jd2Rvdzc6OmJlZm9yZXtiYWNrZ3JvdW5kOiNmZmY7aGVpZ2h0OjE4cHg7bGVmdDoyM3B4O3RvcDo5cHg7d2lkdGg6MnB4fQ==')
  append(d.getElementsByTagName('head')[0], resource)

  // create object of image gallery
  const IG = {}
  IG.folder = getConfig['folder'] || 'x/' // eslint-disable-line
  IG.extension = getConfig['extension'] || ''
  IG.imageContainer = getConfig['imageContainer'] || 'gall7' // eslint-disable-line
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
  // atribute(IG.irig, 'aria-label', 'Next')
  // atribute(IG.ilef, 'aria-label', 'Previous')
  atribute(IG.clos, 'aria-label', 'Close', 'title', 'Press Esc to close')
  append(d.body, IG.imag)// append document fragment to <body>

  // autoplay method loop
  IG.autoPlayLoop = function () {
    this.isAutoPlayOn = true
    if (this.showButtons) this.play.className = 'acts7'

    this.timeOut = setTimeout(function () {
      this.right().show()
      // hide buttons if specified in config
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
    //if(this.imgs.complete && this.imgs.naturalHeight !== 0) 
    this.insi.className = ''
    // if autoplay is set loop from images
    this.isAutoPlayOn && this.autoPlayLoop()
  }

  // downloads method
  IG.downloads = function () {
    // create link
    const a = element('a') 
    // this.onow.dataset.selected = fileName
    atribute(a, 'rel', 'noopener', 'download', this.imgs.src.split('/').pop(), 'href', this.imgs.src, 'target', '_blank')
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
    this.isAutoPlayOn = false
    if (this.showButtons) this.foot.className = this.onow.className = this.play.className = ''
    if(!this.showButtonsOnPlay) this.clos.className = ''
    this.leftRigthBtnsShow()
    return this
  }

  // method on close
  IG.close = function () {
    this.imag.className = 'hide7'
    this.isActive = false
    d.documentElement.style.overflow = 'visible'// back to initial state of overflow
  }

  // Left right buttons show/check method
  IG.leftRigthBtnsShow = function () {
    this.left.className = this.indexOfImage === 0 ? 'hide7' : ''
    this.rigt.className = this.indexOfImage === this.imagesArray.length - 1 ? 'hide7' : ''
  }

  // show image method to show image when loaded and recreating image element
  IG.show = function () {
    const index = this.imagesArray[this.indexOfImage]
    const imageSource = index.src
    const fileName = imageSource.split('/').pop()
    const arrayFileName = fileName.split(".")
    const fileNameWithExtension = arrayFileName[0] +'.'+(this.extension || arrayFileName[1])
    const fullNamePrefixed = fileName.indexOf('.svg') > 0 ? imageSource : imageSource.replace(fileName, this.folder + fileNameWithExtension)
    
    // don't rewrite values if active and set active gallery
    if (!this.isActive) {
      this.isActive = true
      document.documentElement.style.overflow = 'hidden'// hide scrollbar
      this.imag.className = ''
    }
    // show index and filename trying to load
    if (this.showButtons) {
      this.alts.innerText = fileNameWithExtension
      this.fine.innerText = Number(this.indexOfImage) + 1
    }
    // if there is already image and src is same return and don't recreate
    if (this.imgs && (this.imgs.src === imageSource || this.imgs.src === fullNamePrefixed)) return false
     
    // if image exist remove and later recreate it
    this.imgs && this.insi.removeChild(this.imgs)
    // add spin7 class when loading image src
    this.insi.className = 'spin7'
    // show left right buttons and bottom information (file name and index)
    this.leftRigthBtnsShow()



    // create new image element
    if (fileName.indexOf('.svg') > 0) {
      this.imgs = index.cloneNode()    
      this.imgs.removeAttribute('id')
      this.imgs.removeAttribute('class')
    }

    else this.imgs = element('img')


    // set image alt attribute
    // atribute(this.imgs, 'alt', index.alt)
    
    // image onerror methods
    this.imgs.onerror = function (e) {
      // throw new Error('Image error: ' + e.message)
      e.target.onerror = null // escape from infinite loop
      e.target.src = imageSource // set same img source
    }
    
    // image onload methods
    this.imgs.onload = function (e) {
      this.loadComplete()
      //the real image loaded successfully file name
      const theRealFileName = this.imgs.src

      if(fullNamePrefixed !== theRealFileName) 
      this.alts.innerText = theRealFileName.split('/').pop()
    }.bind(this)

    // append image to div
    append(this.insi, this.imgs)

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
  if (containersArray[0] && containersArray[0].tagName === 'BODY') d.body.onclick = function (e) { IG.listenForIG(e) }
  else for (let k = containersArray.length - 1; k >= 0; k--) containersArray[k].onclick = function (e) { IG.listenForIG(e) }

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
      append(IG.foot, IG.play, d.createTextNode(IG.imagesArray.length + '('), IG.fine, d.createTextNode(')'))
      append(IG.wdow, IG.down)
      // atribute(IG.wdow, 'aria-label', 'Download')
      // atribute(IG.play, 'aria-label', 'Play')
    }

    /** @suppress {missingProperties} */
  const k = {
    'play7': function () { IG.isAutoPlayOn ? IG.clear() : IG.autoPlayLoop() }, // eslint-disable-line
    'left7': function () { IG.clear().lefts().show() }, // eslint-disable-line
    'rigt7': function () { IG.clear().right().show() }, // eslint-disable-line
    'clos7': function () { IG.clear().close() }, // eslint-disable-line
    'wdow7': function () { IG.clear().downloads() } // eslint-disable-line
  }
  // add methods for arrow keys to k object
  k[' '] = k['play7'] // eslint-disable-line
  k['ArrowLeft'] = k['left7'] // eslint-disable-line
  k['ArrowRight'] = k['rigt7'] // eslint-disable-line
  k['Escape'] = k['clos7'] // eslint-disable-line

  function switcher (e) {
    if (!IG.isActive || e.isComposing || e.key === 229) return
    // event key or target id
    const ev = e.key || e.target.id
    if (!k[ev]) return IG.clear()
    k[ev]()
    e.preventDefault()
    e.stopImmediatePropagation()
  }

  // everything to handle swipe left/right
  // https://code-maven.com/swipe-left-right-vanilla-javascript

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
    if (Math.abs(moveX) > 30 && Math.abs(moveY) < 30 && elapsedTime < 1000) {
      if (moveX < 0) k['rigt7']() // eslint-disable-line
      else k['left7']() // eslint-disable-line
    }
  }
  IG.imag.addEventListener('touchstart', touchStart, { passive: true })
  IG.imag.addEventListener('touchend', touchEnd)
  // add keyup addEventListener to image div (gallery window)
  w.addEventListener('keyup', switcher)
  // add click onclick event to image div (gallery window)
  IG.imag.onclick = switcher
}
})(window, document)
