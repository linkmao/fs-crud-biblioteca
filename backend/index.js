if (process.env.NODE_ENV ==='development'){
    require('dotenv').config()   // Con esta linea se logra que se reconozca el .env
}

const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const multer= require('multer')
const path = require('path')
const cors = require ('cors')
const books= require('./routes/books')

//Inicializacion
const app=express()
require('./database')
//Settings
app.set('port', process.env.PORT ||3000) // Para desplegar en Heroku, nos ofrece un PORT como variable de entorno, por eso se usa acá

// Midlewares
app.use(morgan('dev'))
const storage = multer.diskStorage({
    destination:path.join(__dirname,'public/uploads'), // Srá la ruta donde se va a subir las imagenes
    filename(req,file,cb) {
        cb(null, new Date().getTime()+path.extname(file.originalname))
    }
})
app.use(multer({storage}).single('image'))   // single es para que suba solo una imagen, e 'image' es el nombre del input al que se asociará la subida del archivo
app.use(express.urlencoded({extended:false})) // permite que las peticiones solo reciba json
app.use(json())
app.use(cors())

// Rutas
app.use('/api/books',books)


// static files
app.use(express.static(path.join(__dirname, 'public')))

//Inicio del servidor
app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en puerto ', app.get('port'))
})