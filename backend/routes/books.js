const {Router}= require('express')
const router = Router()
const Book = require('../models/Book') 

router.get('/',async (req,res)=>{
 const Books= await Book.find()
 res.json(Books)
})

router.post('/', async (req, res)=>{
   const {title, author, isbn} = req.body
   const newBook= new Book({title, author, isbn})
   console.log(newBook)
   res.send("recibido") 
})

module.exports =router