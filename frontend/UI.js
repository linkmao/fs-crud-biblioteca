// Esta clase se encargará de la gestion del DOM
const BookServices= require('./services/BookServices.js')
const servicios= new BookServices()
const timeago= require('timeago.js')
class UI {
    async renderBook(){
        const books= await servicios.getBooks()
        const bookCard= document.getElementById('books-cards')
        bookCard.innerHTML=''
        books.forEach(book=>{
            const div = document.createElement('div')
            div.className=''
            div.innerHTML= `
            <div class ="card m-2">
                <div class= "row">
                    <div class="col-md-4">
                        <img src="http://localhost:3000${book.imagePath}" alt="" class = "img-fluid">
                    </div>
                    <div class="col-md-8">
                        <div class= "card-block px-2">
                            <h4 class="card-title">${book.title}</h4>
                            <p class= "card-text">${book.author}</p>
                            <a  href="#" class= "btn btn-danger delete _id="${book._id}">X</a>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                ${timeago.format(book.created_at)}
                </div>
            </div>
            `
            bookCard.appendChild(div)
        }) 
    }

    async addNewBook(book ){
      await servicios.postBooks(book)
      this.clearBookForm()
      this.renderBook()
    }

    clearBookForm(){
     document.getElementById('book-form').reset()   
    }

    renderMessage(){

    }

    deleteBook(){

    }

}

module.exports = UI