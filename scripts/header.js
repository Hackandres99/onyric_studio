const backgrounds = document.querySelectorAll('.header__background__img')
let counter = 1

backgrounds.forEach((e, i) => {
    // adjusting the width of background container
    if (i === backgrounds.length - 1) {
        e.parentNode.style.width = `${i + 1}00%`
    }
    // Moving the backgrounds one under the other
    if(i > 0){
        e.style.zIndex = -1-i
        e.style.transform = `translateX(-${i}00%)`
    }
})

// Changing the background every 7 seconds after 
setInterval(() => {
    if (counter === backgrounds.length) counter = 0
    backgrounds.forEach(e => e.style.opacity = '0')
    backgrounds[counter].style.opacity = '1'
    counter++
}, 7000);