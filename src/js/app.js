document.addEventListener('DOMContentLoaded', function() {
    fixedNav()
    createGallery()
    highlightNavOption()
    scrollNav()
})

function fixedNav() {
    const header = document.querySelector('.header')
    const aboutFestival = document.querySelector('.about-festival')

    window.addEventListener('scroll', function() {
        if(aboutFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }
    })
}

function createGallery() {
    const IMG_QTY = 16
    const gallery = document.querySelector('.gallery-images')

    for(let i = 1; i <= IMG_QTY; i++) {
        const image = document.createElement('IMG')
        image.src = `src/img/gallery/full/${i}.jpg`
        image.alt = 'Image from gallery'

        // Event Handler
        image.onclick = function() {
            showImage(i)
        }

        gallery.appendChild(image)
    }
}

function showImage(i) {
    const image = document.createElement('IMG')
    image.src = `src/img/gallery/full/${i}.jpg`
    image.alt = 'Image from gallery'

    // Generate Modal
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = destroyModal

    // Close Modal Button
    const closeModalBtn = document.createElement('BUTTON')
    closeModalBtn.textContent = 'X'
    closeModalBtn.classList.add('btn-close')
    closeModalBtn.onclick = destroyModal

    modal.appendChild(image)
    modal.appendChild(closeModalBtn)

    // Add to HTML
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
}

function destroyModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove()
        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 250);
}

function highlightNavOption() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.main-nav a')

        let current = '';
        sections.forEach( section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if(window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.id
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + current) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.main-nav a')

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}