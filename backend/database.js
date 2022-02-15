const mongoose = require ('mongoose')
mongoose.connect('mongodb://localhost/books-db',{
    useNewUrlParser:true
})
    .then(db=>console.log('Base de datos conectada'))
    .catch(err=>console.log(err))
    