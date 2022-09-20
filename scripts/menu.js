const nav = document.querySelector('.nav')
const logo = document.querySelector('.logo')
const words = document.querySelector('.words')
const menu = document.querySelector('.menu')
const menu__links = document.querySelectorAll('.menu__link')
const menu__items = document.querySelectorAll('.menu__item')

// Getting the names of the pages
const names = []
menu__links.forEach(text => names.push(text.innerText))

// get out from the lateral menu
document.addEventListener("click", e => {
    let targetElement = e.target // clicked element
    do {
        if (targetElement == nav) {
            // This is a click inside. Do nothing, just return.
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement)
    // This is a click outside.
    nav.classList.remove('side')
    logo.classList.remove('side')
    words.classList.remove('side')
    menu.classList.remove('side')
    menu__links.forEach(link => {
        link.classList.remove('side')
    })
})

// Applying hover effect to the menu__item that has the name of current page
const route = () => {
    names.forEach((name, index) => {
        if (document.title.includes(name)) {
            menu__items[index].classList.add('hover')
        }
    })
}

// Menu lateral
logo.addEventListener('click', () => {
    nav.classList.toggle('side')
    logo.classList.toggle('side')
    words.classList.toggle('side')
    menu.classList.toggle('side')
    menu__links.forEach(link => {
        link.classList.toggle('side')
    })
})

// Menu fijo
window.addEventListener('scroll', () => {
    nav.classList.toggle('active', window.scrollY > 0)
})

// Menu hover
route()
menu__items.forEach(item => {
    item.addEventListener('mouseover', () => {
        menu__items.forEach(i => {
            i.classList.remove('hover')
        })
        item.classList.add('hover')
    })
    item.addEventListener('mouseout', () => {
        item.classList.remove('hover')
        route()
    })
})

