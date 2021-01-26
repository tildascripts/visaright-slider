class Slider {
    constructor({
        rootEl,
        slides,
        nextButtonEl,
        prevButtonEl,
    }) {
        this.rootEl = rootEl
        this.nextButtonEl = nextButtonEl
        this.prevButtonEl = prevButtonEl
        this.slides = slides
        this.slidesLength = slides.length
        this.currentSlide = 0
        this.slidesContainer = null
        this.translateX = 0
        this.transition = "all .5s cubic-bezier(.25,.8,.05,1)"
        this.blockScroll = false

        this.next = this.next.bind(this)
        this.prev = this.prev.bind(this)
    }

    getSlideByIndex(index) {
        return index - (Math.floor(index / this.slidesLength) * this.slidesLength)
    }

    applyStyle(el, styles) {
        for (let styleName in styles) {
            el.style[styleName] = styles[styleName]
        }
        return el
    }

    createContainer() {
        const wrapper = document.createElement("div")
        this.applyStyle(wrapper, {
            position: "absolute",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            top: 0,
            left: 0,
            zIndex: 10,
        })
        const container = document.createElement("div")
        this.applyStyle(container, {
            position: "absolute",
            height: "100%",
            top: 0,
            left: 0,
            whiteSpace: "nowrap",
            transition: this.transition,
        })
        wrapper.appendChild(container)
        return {
            wrapper: wrapper,
            container: container,
        }
    }

    wrapSlide(slideEl) {
        const wrapper = document.createElement("div")
        this.applyStyle(wrapper, {
            position: "relative",
            width: "100vw",
            height: "100%",
            display: "inline-block",
        })
        const container = document.createElement("div")
        wrapper.appendChild(slideEl)
        return wrapper
    }

    /*triggerResize() {
        window.dispatchEvent(new Event("resize"))
    }*/

    next() {
        const oldSlide = this.currentSlide
        this.currentSlide = this.getSlideByIndex(this.currentSlide + 1)
        if (this.slidesContainer.childElementCount >= 2) {
            if (this.translateX === -100) {
                this.slidesContainer.firstChild.remove()
            }
            if (this.translateX === 0) {
                this.slidesContainer.lastChild.remove()
            }
            this.slidesContainer.appendChild(this.getSlide(this.currentSlide))
            this.slidesContainer.style.transition = "none"
            this.slidesContainer.style.transform = "translateX(0vw)"
            setTimeout(() => {
                this.slidesContainer.style.transition = this.transition
                this.translateX = -100
                this.slidesContainer.style.transform = `translateX(${this.translateX}vw)`
                //this.triggerResize()    
            }, 1)
        }
        else {
            this.slidesContainer.appendChild(this.getSlide(this.currentSlide))
            this.translateX -= 100
            this.slidesContainer.style.transform = `translateX(${this.translateX}vw)`
            //this.triggerResize()
        }
    }

    prev() {
        const oldSlide = this.currentSlide
        this.currentSlide = this.getSlideByIndex(this.currentSlide + 1)
        if (this.slidesContainer.childElementCount >= 2) {
            if (this.translateX === -100) {
                this.slidesContainer.firstChild.remove()
            }
            if (this.translateX === 0) {
                this.slidesContainer.lastChild.remove()
            }
        }
        this.slidesContainer.insertBefore(this.getSlide(this.currentSlide), this.slidesContainer.firstChild)
        this.slidesContainer.style.transition = "none"
        this.slidesContainer.style.transform = "translateX(-100vw)"
        setTimeout(() => {
            this.slidesContainer.style.transition = this.transition
            this.translateX = 0
            this.slidesContainer.style.transform = `translateX(${this.translateX}vw)`
            //this.triggerResize()
        }, 1)
    }

    getSlide(index) {
        const slide = this.slides[index].cloneNode(true)
        slide.style.display = "block"
        return this.wrapSlide(slide)
    }

    injectStyle(rootEl) {
        const style = document.createElement("style")
        style.innerHTML = `
            #${rootEl.id} [field^="tn_text"] {
                white-space: normal;
            }
        `
        document.head.appendChild(style)
    }

    init() {
        this.injectStyle(this.rootEl)
        this.slides.forEach(item => item.style.display = "none")
        this.rootEl.style.position = "relative"

        this.nextButtonEl.addEventListener("click", this.next)
        this.nextButtonEl.style.zIndex = 11
        this.nextButtonEl.style.cursor = "pointer"
        this.prevButtonEl.addEventListener("click", this.prev)
        this.prevButtonEl.style.zIndex = 11
        this.prevButtonEl.style.cursor = "pointer"

        const { wrapper: containerWrapper, container: slidesContainer } = this.createContainer()
        this.slidesContainer = slidesContainer
        this.slidesContainer.appendChild(this.getSlide(0))
        this.rootEl.appendChild(containerWrapper)
        //this.triggerResize()
    }
}

$(document).ready(() => {
    const sliderInstance = new Slider({
        rootEl: document.getElementById("rec241408947"),
        nextButtonEl: document.querySelector("#rec241408947 [data-elem-id='1611548736351']"),
        prevButtonEl: document.querySelector("#rec241408947 [data-elem-id='1611548741325']"),
        slides: [
            "rec273283187",
            "rec273282563",
        ].map(selector => document.getElementById(selector)),
    })
    sliderInstance.init()
})