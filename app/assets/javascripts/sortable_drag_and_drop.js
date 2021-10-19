const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    // anytime we drag an element over a container
    // the 'dragover' event is fired continuously 
    // until the element moves away from the container
    // allows us to determine which element we're over top of
    container.addEventListener('dragover', e => {
        e.preventDefault() // dropping an element into a container prevented by default (change reflected in cursor)
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging') // only 1 element can be dragged at a time
        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }
    })
})

// gets mouse position of element we're dragging
// returns the position directly after
function getDragAfterElement(container, y) {
    // gets every element that we're not dragging
    // converts NodeList to an array
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging')] 

    return draggableElements.reduce((closest, child) => { // first param: value we're reducing down to (which is what function returns); second param: initial value of first param
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2 // when hovering above an element, offset is negative
        if (offset < 0 && offset > closest.offset) { // if offset closer than closest offset (whatever we currently have)
            return { offset: offset, element: child }
        } else {
            return closest
        } 
    }, { offset: Number.NEGATIVE_INFINITY }).element // every single element will be closer than this number
}