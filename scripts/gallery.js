const project = document.querySelectorAll('.project')
const buttons = document.querySelectorAll('.show')
const lightbox = document.querySelector('.lightbox')
const lightbox__container = document.querySelector('.lightbox__container')
const lightbox__main__image = document.querySelector('.lightbox__main__image')
const lightbox__close = document.querySelector('.lightbox__close')
const copy = document.querySelector('.copy')
const carrousel = document.querySelector('.carrousel')
const before__img = document.querySelector('.fa-angle-left').parentNode
const next__img = document.querySelector('.fa-angle-right').parentNode


// get out from the lateral menu
lightbox.addEventListener("click", e => {
    let targetElement = e.target // clicked element
    do {
        if (targetElement === lightbox__container) {
            // This is a click inside. Do nothing, just return.
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement)
    // This is a click outside.
    if (lightbox__main__image.src != "") {
        lightbox.classList.remove('move')
        lightbox__main__image.classList.remove('appear')
    }
})

// Adding shadow to each project except to hover
project.forEach(e => e.addEventListener('mouseover', () => {
    project.forEach(a => {
        a.querySelector('.project__buttons').classList.add('active')
    })
    e.querySelector('.project__buttons').classList.remove('active')
}))

// Removing shadow to each project
project.forEach(e => e.addEventListener('mouseout', () => {
    project.forEach(a => {
        a.querySelector('.project__buttons').classList.remove('active')
    })
}))

// Extracting attributes from selected project 
buttons.forEach(e => e.addEventListener('click', () => {
    let src = e.parentNode.parentNode.firstElementChild.firstElementChild.getAttribute('src')
    let alt = e.parentNode.parentNode.firstElementChild.firstElementChild.getAttribute('alt')
    add__attributes(src, alt)

    clean__carrousel(carrousel)
    images = e.parentNode.parentNode.firstElementChild.querySelectorAll('.project__secundary__img')
    images.forEach((img, ind) => {
        let image = document.createElement('img')
        let container__img = document.createElement('div')

        image.setAttribute('src', img.getAttribute('src'))
        image.setAttribute('alt', img.getAttribute('alt'))
        image.className = 'carrousel__img'

        if (ind === 0) {
            container__img.className = 'container__img selected'
        } else {
            container__img.className = 'container__img'
        }
        container__img.appendChild(image)
        carrousel.appendChild(container__img)
    })

}))

// LightBox exit button
lightbox__close.addEventListener('click', () => {
    lightbox.classList.toggle('move')
    lightbox__main__image.classList.toggle('appear')
})

// Adding border to selected image
carrousel.addEventListener('click', e => {
    let src__img = ""
    let alt__img = ""
    switch (e.target.className) {
        case 'carrousel__img':
            e.target.parentNode.parentNode.querySelector('.selected').classList.remove('selected')
            e.target.parentNode.classList.toggle('selected')
                // Changing the main image of the lightbox
            src__img = e.target.parentNode.parentNode.querySelector('.selected').firstElementChild.getAttribute('src')
            alt__img = e.target.parentNode.parentNode.querySelector('.selected').firstElementChild.getAttribute('alt')
            lightbox__main__image.setAttribute('src', src__img)
            copy.innerHTML = alt__img
            break;
        case 'container__img':
            e.target.parentNode.querySelector('.selected').classList.remove('selected')
            e.target.classList.toggle('selected')
                // Changing the main image of the lightbox
            src__img = e.target.parentNode.querySelector('.selected').firstElementChild.getAttribute('src')
            alt__img = e.target.parentNode.querySelector('.selected').firstElementChild.getAttribute('alt')
            lightbox__main__image.setAttribute('src', src__img)
            copy.innerHTML = alt__img
            break;
    }
    scroll__limit(e.target, "")
})

// Moving through images
before__img.addEventListener('click', e => {
    // Moving to the before image
    try {
        let before = {}
        if (e.target.classList.contains('fa-angle-left')) {
            before = e.target.parentNode.parentNode.previousElementSibling.firstElementChild.querySelector('.selected').previousElementSibling
            scroll__limit(before, "left")
        } else {
            before = e.target.parentNode.previousElementSibling.firstElementChild.querySelector('.selected').previousElementSibling
            scroll__limit(before, "left")
        }
        let src = before.firstElementChild.getAttribute('src')
        let alt = before.firstElementChild.getAttribute('alt')
        lightbox__main__image.setAttribute('src', src)
        copy.innerHTML = alt

        before.nextElementSibling.classList.toggle('selected')
        before.classList.toggle('selected')
    } catch (error) {
        // Moving to the last image
        carrousel.scrollTo(carrousel.clientWidth, 0)
        let last = {}
        if (e.target.classList.contains('fa-angle-left')) {
            last = e.target.parentNode.parentNode.previousElementSibling.firstElementChild.lastElementChild
        } else {
            last = e.target.parentNode.previousElementSibling.firstElementChild.lastElementChild
        }
        let last_src = last.firstElementChild.getAttribute('src')
        let last_alt = last.firstElementChild.getAttribute('alt')
        lightbox__main__image.setAttribute('src', last_src)
        copy.innerHTML = last_alt
        carrousel.firstElementChild.classList.toggle('selected')
        last.classList.toggle('selected')
    }

})

next__img.addEventListener('click', e => {
    // Moving to the next image
    try {
        let next = {}
        if (e.target.classList.contains('fa-angle-right')) {
            next = e.target.parentNode.parentNode.previousElementSibling.firstElementChild.querySelector('.selected').nextElementSibling
            scroll__limit(next, "right")
        } else {
            next = e.target.parentNode.previousElementSibling.firstElementChild.querySelector('.selected').nextElementSibling
            scroll__limit(next, "right")
        }
        let src = next.firstElementChild.getAttribute('src')
        let alt = next.firstElementChild.getAttribute('alt')
        lightbox__main__image.setAttribute('src', src)
        copy.innerHTML = alt

        next.previousElementSibling.classList.toggle('selected')
        next.classList.toggle('selected')
    } catch (error) {
        // Moving to the first image
        carrousel.scrollTo(0, 0)
        let first = {}
        if (e.target.classList.contains('fa-angle-right')) {
            first = e.target.parentNode.parentNode.previousElementSibling.firstElementChild.firstElementChild

        } else {
            first = e.target.parentNode.previousElementSibling.firstElementChild.firstElementChild
        }
        let first_src = first.firstElementChild.getAttribute('src')
        let first_alt = first.firstElementChild.getAttribute('alt')
        lightbox__main__image.setAttribute('src', first_src)
        copy.innerHTML = first_alt

        carrousel.lastElementChild.classList.remove('selected')
        first.classList.toggle('selected')
    }
})

// Adding main image to the lightbox
const add__attributes = (src__img, alt__img) => {
    // Adding attributes to lightbox
    lightbox__main__image.setAttribute('src', src__img)
    copy.innerHTML = alt__img
        // Opening lightbox
    lightbox.classList.toggle('move')
    lightbox__main__image.classList.toggle('appear')
}

// cleaning the carrousel
const clean__carrousel = (node) => {
    while (node.hasChildNodes()) {
        clear(node.firstChild)
    }
}
const clear = (node) => {
    while (node.hasChildNodes()) {
        clear(node.firstChild)
    }
    node.parentNode.removeChild(node)
}

// Scroll beyond the carrousel limits
const scroll__limit = (e, side) => {
    switch (side) {
        case "left":
            if (e.getBoundingClientRect().x < carrousel.getBoundingClientRect().x) {
                carrousel.scrollBy(-e.clientWidth, 0)
            }
            break;
        case "right":
            if (e.getBoundingClientRect().x + e.clientWidth > carrousel.getBoundingClientRect().x + carrousel.clientWidth) {
                carrousel.scrollBy(e.clientWidth, 0)
            }
            break;
        default:
            if (e.getBoundingClientRect().x < carrousel.getBoundingClientRect().x) {
                carrousel.scrollBy(-e.clientWidth, 0)
            } else if (e.getBoundingClientRect().x + e.clientWidth > carrousel.getBoundingClientRect().x + carrousel.clientWidth) {
                carrousel.scrollBy(e.clientWidth, 0)
            }
            break;
    }

}