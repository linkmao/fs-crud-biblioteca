# FS-CRUD-BIBLIOTECA
Desarrollo **Full Stack** (fs), tanto backend como frontend, de una aplicación que permite gestionar datos básicos de una biblioteca, donde se gurada el nombre de un libro, su autor, el codigo ISBN.
Desarrollo tomado de una lista de videos, donde el video número 1 es [este video de Fazt][video de fazt]
***

## Como ejecutar
Este proyecto es dual (backend y frontend a la vez) por lo tanto hay que tener en cuenta lo siguinete

### en todo caso correr mongo
`$ mongod`

### ejecucion de solo backend desarrollo
`$ npm run dev`

### ejecucion backend y fronted desarrollo (cada uno corre en seridor separado)
`$ npm run dev`
`$ npm ruv dev-server`

Cuando el frontend de desarrollo está terminado, se emaqueta y se lleva a carpeta de backend así
`$ npm run build`
Esto hace que con solo correr el backend la app funciona

## Tecnologías usadas para el backend
- express
- morgan (notificaciones en consola de las peticiones http realizadas, se usa como midleware de express)
- mongoose  (adaptador para la bd mogoose)
- multer (Permite la gestión de los archivos que se suben a un servidor, en este caso una imagen)
- dotenv (para crear variables de entorno)
- cross-env (permite definir en que entorno de produccion estamos????)
- cors (permite que los dos servidores se comuniquen)
- fs-extra (permite trabajar con archivos del sistema, copiar, leer, borrar archivos etc)

## Tecnologías para el frontend
- webpack (Libreria de frontend, que empaqueta todo el código en algo mas reducido (esto es el concepto de bundle) empaqueta tanto el app.js a bundle.js como el index.html, llevandolos a la carpeta del backend)
- webpack-cli (cliente cli de webpack)
- html-webpack-plugin (permite configurar la manera como se va a guardar e index.html en el backend, normalmente comprimido)
- css-loader (cargar archivos de cc en js)
- style-loader
- mini-css-extract-pluguin
- webpack-dev-server  (servidor frontend)
- timeago.js

Todas estas librerias de frontend se instalan como dependecias para desarrollo osea que va con la opción
$ npm i [libreria] -D

La ejecucion del webpack, para que tome el app.js y html.index del frontend y lo convierta respectivamente
en el bundle.js e index.html del backend se realiza con el comando. (previa configuración de webpack.config.js)
$ npx webpack


## webpack
El punto fuerte y difernete de este desarrollo es el de webpack, el cual lo entiendo como la manera de tomar los archivos, html, js y css que se crea en el frontend, para llevarlos a la carpeta del backend y que estos sean interpretados por el servidor donde se vaya a desplegar. Explicado con mas detalle, la carpeta frontend es solo de desarrollo es decir es el lugar donde está todo el código de desarrollo del frontend, cuando este se considera que ya está listo, entonces con webpack se lleva a la carpeta public del backend de tal manera que cuando el usuario tipea la url raiz (en este caso localhost:3000) entonces se cargará el frontend que web pack ha compilado en la carpeta public
Esto se logra a traves de dos elementos
1. La configuracion del archivo webpack.config.js
2. La ejecucion de webpack con `$ npx webpack`

Cuando se realiza esto, el codigo html se comprime y se instala en el backend, el js del frontend se conveirte en el bundle.js y automticamete el html reconocerá el bundle.js
Ahora con el css pasa lo mismo, el css se incorpora en el bundle.js, sin embargo si lo que se desea en produccion es que el archivo css quedé fuera del bundle.js se debe especificar primero en que entorno de progrmacación se stá (produccion o desarrollo) y su es produccion usar entonces el plugin mini-css-extract-plugin, para que lo deje por fuera.

Otro elemento interesante es que en desarrollo se puede crear un servidor para verificar el avance del frontend, para ello se usa `webpack.dev-server', montando así un servidor solo para verificar los cambios en el desarrollo forntend. Cuando ese desarrollo haya finalizaddo se debe entonces hacer el build para que lleve la info a la carpeta public del backend

## Configuracion de los scripts en package.json
Para este item se relaciona los siguinetes fragmentos de codigo de package.json
```
"dev": "cross-env NODE_ENV=development nodemon backend/index.js --ignore frontend",
"start": "cross-env NODE_ENV=production node backend/index.js",
"build": "cross-env NODE_ENV=production webpack",
"dev-server": "cross-env NODE_ENV=development webpack-dev-server"
```

Los scripts se ejecutan por ejemplo
`npm rum dev`
(Cabe recordar que el script start no requiere de run)

El fragmento de código `cross-env NODE_ENV=development` lo que hace es especificar al sistema como se está corriendo (si en desarrollo  o producción), pues a veces es necesario hacer esa distinción, para acceder al tipo de ejecucion se usa 
 process.env.NODE_ENV ==='development'
 Esto lo que hace es preguntarse su la ejecución está o no en desarrollo

explicacion de los script
dev: para la ejecucion en desarrollo del backend
start: para la ejecucion del backend en produccion
dev-server: crea un servidor local para verificar el frontend en etapa de desarrolo
buid: para la ejecución de webpack y creación definitiva del frontend que se va alojar al backend en carpeta public


## Frontend
en el frontend se usa via cdn
- Boostrap
- Animated.css







-
### Maolink software
Version. 1.0.0
Mayo 2022



[video de fazt]:<https://www.youtube.com/watch?v=Fs1G1BcP4BI&list=PLo5lAe9kQrwq7n_REwpZdfggPCBW2ggnh&index=1>