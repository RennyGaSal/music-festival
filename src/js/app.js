document.addEventListener('DOMContentLoaded', function() {
    createGallery()
})

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