# FS-CRUD-BIBLIOTECA
Desarrollo **Full Stack** (fs), tanto backend como frontend, de una aplicación que permite gestionar datos básicos de una biblioteca, donde se gurada el nombre de un libro, su autor, el codigo ISBN.
Desarrollo tomado de una lista de videos, donde el video número 1 es [este video de Fazt][video de fazt]
***

## Tecnologías usadas para el backend
- 
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

Todas estas librerias se instalan como dependecias para desarrollo osea que va con la opción
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


- helmet (caracteristicas de seguridad para evitar que el servidor de info adicional **no se usó**)
- babel --> @babel/core @babel/cli @babel/node @babel/preset-env   (recordar crear archivo .babelrc)

***
## Como ejecutar
Solo corre en local. pues no se hizo despliegue
Se debe correr mongod en local y luego ejecutar el script del package.json
```
$ mongod
$ npm run dev
```
Al ser un proyecto backend 100% se recomienda el uso de **Postman** para el accesos a los difernetes endpoint.

***
## Descripción detallada del proyecto y caracteristicas
El proyecto es 100% backend y tiene como principal propósito tener los elementos básicos de la gestion de una bd que podria emular una tienda. 
Se implementa registro, loguin y roles (admin, user, moderator) aunque solo se usa en esta implementacion admin y user
- La base de datos está implementada con mongo
- Los endpoit se implementaron con express
Al ser 100% backend, los accesos a los difernetes endpoint se realiza con postman.

### Estructura de los enpoint
-   /api/products  (get) muestra todos los productos (No requiere autenticacion)
-   /api/products/:id  (get) Muestra el producto identificado con el id (No requiere autenticacion)
-   /api/products (post) Ingreso de nuevos productos (Requiere auth y rol admin)
-   /api/products/:id (put) Actualiza un producto identificado con id (Requiere auth y rol admin)
-   /api/products/:id (delete) Borra un producto identificado con id (Requiere auth y rol admin)
-   /api/users (get)  Despliega todos los usuarios registrados (no requiere auth)
-   /api/users (post) Permite el ingreso *manual* de usuarios (requiere auth y rol admin)
-   /api/auth/sigup  (post) permite el registro de un nuevo usuario (no requiere auth)
-   /api/auth/sigin (post) Permite el ingreso al usuario (se entrega un token que contiene el id del usuario autorizado)

**Nota:** La implementacion de /api/users (post) falta implementarlo completamente pues es necesario todo el proceso de encriptación de la contraseña que se le asigne al usuario etc


***
## Descripción de la estructra del proyecto
Del directorio raiz se crea la carpeta `src` para todo el código que se crea
- .babelrc: código para que el proyecto trabaje con babel
- index.js: Inicia el proyecto, se encarga de `app.listen()` y de usar la conexión a la base de datos
- app.js: Es donde está toda la configuración de la app 
- database.js: Se encarga de la configuración de la base de datos
- config.js: En este caso solo se usa para el guardado de una palabra clave (quizas Fazt iba usar variables de entorno pero no lo alcanzó a ejecutar (ver el proyecto de my-todolist alli si se implementa))
- /routes: la implementacion de los endpoit
- /controllers: son las funciones que usan los endpoint
- /models: todos los modelos de datos usados (Product, User, Role)
- /libs/initialsetup.js: Verificacion de la existencia de los roles en la bd, este tipo de carpetas son mas de gusto del programador, pues está lógica bien pueden estar en index.js
- /middlewares   funciones que ayudan a la verificacion de datos y por lo tanto permiten o no continuar con la ejecucion de los controllers (gracias a los midlewares se logra la protección de rutas, o verificacion de usuario registrados, de roles, o de datos existentes en la bd, **muy útiles**)

*** 
## Por menores del proyecto

### Orden en el desarrollo
Encuentro en este orden una logica de la estructura general del proyectto, esta es una base y no necesariamnete debe seguirse de forma estricta.

- Instalacion de dependencias y configuracion de .rcbabel y los scripts del package.json
-crear index
- crar app
- crear estructuras de carpetas
- Crear rutas y lo posible los controladores
- Conexion a la base de datos en el archivo database.js e importacion al index
- creacion de los modelos de base de datos
- Creacioon y comprobacion de datos
- Signup
- Signin
- Validaciones de token y proteccion de rutas

***

## Apuntes
-   El concepto de roles se maneja como una estructura de datos en la bd y en el usuario es un arreglo.

-   La palabra clave para la generacion de los token se realiza desde el archivo congin (no es obligacion pero esa es la implementación que se hizo)

-   Para el manejo de los roles la implementacion consiste en que se cargaran unos roles por defecto cuando el servidor se ejecute por primera vez, para ello usaremos un archivi ubicado en libs

## Mejoras futuras
-   Hacer la implementacion de addUsuarios en el controlador users
- Realizar el despliegue en heroku y en mongoatlas
***
### Maolink software
Version. 1.0.0

Diciembre 2021



[video de fazt]:<https://www.youtube.com/watch?v=Fs1G1BcP4BI&list=PLo5lAe9kQrwq7n_REwpZdfggPCBW2ggnh&index=1>