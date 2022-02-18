require('./styles/styles.css')
const BookServices= require('./services/BookServices')

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

    const servicios= new BookServices()
    console.log(formData)
    servicios.postBooks(formData)
})