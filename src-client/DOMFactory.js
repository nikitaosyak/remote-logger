export default class DOMFactory {

    constructor(id) {
        this.id = id
    }

    create(v) {
        this.element = document.createElement(v)
        this.element.id = this.id
        return this
    }

    addClass(v) {
        if (!this.element.classList.contains(v)) {
            this.element.classList.add(v)
        }
        return this
    }

    removeClass(v) {
        if (this.element.classList.contains(v)) {
            this.element.classList.remove(v)
        }
        return this
    }

    append(parent) {
        if (typeof(parent) === 'undefined') {
            document.body.appendChild(this.element)
        } else {
            parent.appendChild(this.element)
        }
        return this
    }

    margin(v) {this.element.style.margin = v; return this}
    pos(v) {this.element.style.position = v; return this}
    fw(v) { this.element.style.width = `${v}rem`; return this}
    fh(v) { this.element.style.height = `${v}rem`; return this}
    w(v) { this.element.style.width = `${v}%`; return this}
    h(v) { this.element.style.height = `${v}%`; return this}
    px_w(v) { this.element.style.width = `${v}px`; return this}
    px_h(v) { this.element.style.height = `${v}px`; return this}
    max_h(v) {this.element.style['max-height'] = v; return this}
    float(v) {this.element.style['float'] = v; return this}
    d(v) { this.element.style.display = v; return this }
    bgcolor(v) { this.element.style['background-color'] = v; return this }
    bgimage(v) { this.element.style['background-image'] = `url('assets/${v}.png')`; return this}
    paddingtop(v) { this.element.style['padding-top'] = v; return this }

    v(v) {this.element.value = v; return this }
    html(v) {this.element.innerHTML = v; return this}

    static addClassTo(el, v) {
        if (!el.classList.contains(v)) {
            el.classList.add(v)
        }
    }

    static removeClassFrom(el, v) {
        if (el.classList.contains(v)) {
            el.classList.remove(v)
        }
    }
}