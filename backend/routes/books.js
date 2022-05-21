const {Router}= require('express')
const router = Router()
const Book = require('../models/Book') 
const {unlink} =require('fs-extra')
const path = require('path')

router.get('/',async (req,res)=>{
 const Books= await Book.find()
 res.json(Books)
})

router.post('/', async (req, res)=>{
   const {title, author, isbn} = req.body
   const imagePath = '/uploads/'+ req.file.filename
   const newBook= new Book({title, author, isbn, imagePath})
   await newBook.save()
   res.json({mensaje:"libro guardadao"}) 
})


router.delete('/:id', async(req, res)=>{
const book = await Book.findByIdAndDelete(req.params.id)
unlink(path.resolve('./backend/public'+book.imagePath))
res.json({Mensaje:"Libro eliminado"})
})

module.exports =router