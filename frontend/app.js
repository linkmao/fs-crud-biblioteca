require('./styles/styles.css')
const UI = require('./UI')

document.addEventListener('DOMContentLoaded', ()=>{
    const ui= new UI()
    ui.renderBook()
})

document.getElementById('book-form')
.addEventListener('submit', e=>{
    e.preventDefault()
    const title=document.getElementById('title').value
    const author= document.getElementById('author').value
    const isbn= document.getElementById('isbn').value
    const image= document.getElementById('image').files

    // form data es una especie de formulario virtual que agrupa tados
    const formData = new FormData()
    formData.append('title',title)
    formData.append('author',author)
    formData.append('isbn',isbn)
    formData.append('image',image[0])
    const ui = new UI()
    ui.addNewBook(formData)
    ui.renderMessage('New book add', 'success', 3000)
    
})

document.getElementById('books-cards').addEventListener('click', e=>{
    if (e.target.classList.contains('delete')){
     const ui=new UI()   
     ui.deleteBook(e.target.getAttribute('_id'))
     ui.renderMessage('book delete', 'danger', 3000)
    }
    e.preventDefault()
})

