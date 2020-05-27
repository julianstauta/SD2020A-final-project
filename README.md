# SD2020A-final-project

#### Jose Camilo Moctezuma Ruiz - 
#### Julian Santiago Tauta Chaparro - A00022232
#### Cristian Duque - 
#### Camilo Penagos - A00301416

### Objetivos

 * Diseñar la arquitectura de un sistema distribuido que implemente un conjunto de microservicios, considerando las implicaciones técnicas asociadas con su escalabilidad, tolerancia a fallos y concurrencia, y las mejoras en el desempeño a través de la asignación o reasignación de los recursos y tareas.
 * Desplegar un sistema distribuido, teniendo en cuenta las estrategias de administración de sus recursos consideradas en el diseño.
 * Gestionar el servicio distribuido, haciendo uso de herramientas de monitoreo y provisionamiento

## Arquitectura

La arquitectura propuesta para desarrollar el proyecto es la siguiente

![Imagen 1](/imageproject/Arquitectura.JPG)<br/>

La arquitectura propuesta para dar solución al proyecto cuenta con una red docker de cuatro contenedores, que se comunica mediante REST con una base de datos en la nube para el almacenamiento. Esta red docker esta conformada por cuatro contenedores:

1. **Balanceador de carga:** Una instancia de Ngnix, que permite hacer el balanceo de carga a las peticiones de las instancias web. Este proxy esta expuesto para ser accedido por el puerto 80 

2. **Servidores Web:** Dos intancias de frontend desplegadas en Vue.js, estas instancias reciben peticiones http previamente balanceadas por el proxy Ngninx

3. **Servidor REST:** Servidor de backend desplegado en node.js que permite la comunicación REST con la base de datos en la nube



## Desarrollo

-  Este segmento corresponde a la implementación de cada componente:

### Base de datos:
Para este componente se uso una base de datos mongodb alojada en un servicio llamado mongoatlas<br/>
Es necesario primero crear un cluster<br/>
![Imagen 2](/imageproject/dbconnect.PNG)<br/>
Dentro del cluster es neceasio:
    1. Definir un usuario para la base de datos<br/>
![Imagen 3](/imageproject/adddbuser.PNG)<br/>
    2. Definir la lista de ip que pueden acceder a la base e datos, en este caso es 0.0.0.0 para que se pueda accesar desde cualquier lugar
![Imagen 4](/imageproject/ipwhitelist.PNG)<br/>
Una ves hecho esto, volvemos a la ventana pricipal de cluster y hacemos click en el boton connect 
![Imagen 2](/imageproject/dbconnect.PNG)<br/>
Ahi se abre una ventana y seleccionamos la opcion "connect your application"
![Imagen 5](/imageproject/connection2.PNG)<br/>
Ahora en donde dice driver seleccionamos nodejs y la version 3.0. Esto se debe a que vamos a acceder a la base de datos usando un api en node js. Al hacer esto nos aparecera un texto con la url para acceder a la base de datos desde node js.
![Imagen 6](/imageproject/connection3.PNG)<br/>


### API rest de acceso y modificacion de base de datos:

El api se implementó en nodejs, el propósito de este es ser un punto de conexión para insertar y recuperar información de la base de datos. <br/>
Para implementar el api se definieron dos clases .js:<br/>

1.	index.js: la cual es la clase principal en donde se inicia la ejecución del api. <br/>
Primero se definen algunas librerías que se van a usar, express y cors para facilitar la creación del api, y body-parser para facilitar la conversión y traducción de archivos json. <br/>
![Imagen 7](/imageproject/indexlibs.png)<br/>
Luego se define la ruta principal del api api/names/<br/>
![Imagen 8](/imageproject/rutaprincipal.png)<br/>
Y finalmente se exponen los servicios por el puerto 5000 y en el host 0.0.0.0<br/>
![Imagen 9](/imageproject/indexexpose.png)<br/>
Código completo clase index.js<br/>
![Imagen 10](/imageproject/inexjs.png)<br/>

2.	names.js: es la clase en donde se implementan los métodos del api que permiten la conexión con la base de datos (get, post, etc). <br/>
En esta clase también es necesario importar express, y se importa mongodb que es la librerias para facilitar la comunicación entre la base de datos mongo y nodejs <br/>
![Imagen 11](/imageproject/nameslibs.png)<br/>
Para que se pueda conectar al cluster de mongoatlas definido anteriormente es necesario usar el url mencionado previamente en la implementación de la base de datos. <br/>
![Imagen 12](/imageproject/mongoconnect1.png)<br/>
Finalmente se define cual es el nombre de la base de datos a la que se va a consultar, en este caso “names_db” <br/>
![Imagen 13](/imageproject/mongoconnect2.png)<br/>
Ahora se pueden implementar los métodos: <br/>
* De consulta, el cual se define como un get en la ruta “/” indicando que podrá ser consumido en la ruta api/names/, dentro del método se obtienen todos los datos de la colección names y luego se devuelve una lista con todos estos nombres.<br/>
![Imagen 14](/imageproject/getnames.png)<br/>
* El método de agregar datos se define como un post ubicado en la ruta “/” indicando que podrá ser consumido en la ruta api/names/, el método obtiene la información que se va a insertar del parámetro body del request que recibe cuando es llamado, luego agreaga estos datos en la base de datos.<br/>
![Imagen 15](/imageproject/addnames.png)<br/>
* El último método implementado es el método de eliminar un nombre, el cual es definido como un delete en la ruta “/” indicando que podrá ser consumido en la ruta api/names/, este obtiene el identificador del nombre que va a eliminar body del request que recibe cuando es llamado, luego elimina el dato con este identificador en la base de datos.<br/>
![Imagen 16](/imageproject/deletenames.png)<br/>
Código completo clase names.js<br/>
![Imagen 17](/imageproject/namesjs.png)<br/>

### Front end:

Para el front end se implementó una aplicación web en vuejs. La cual consume el api implementado anteriormente para obtener y agregar información a la base de datos.<br/>
El api se consume en el front en de la siguiente manera:<br/>
Primero se copia el url por el que se va a consumir el api<br/>
![Imagen 18](/imageproject/urlapi.png)<br/>
Luego se implementan los métodos de consumo del api<br/>
![Imagen 19](/imageproject/useapi.png)<br/>

### Balanceador de carga:

El balanceador de carga para las instancias web de Frontend, fue implementado usando el servidor Ngnix que permite una facil configuracion para balancear solicitudes. Solo es necesario indicar las instancias que se quieren balancear con su respectiva IP y el puerto expuesto. En la imagen se indica como es la configuación del servicio Ngnix para la arquitectura propuesta.<br/>

<img src ="imageproject/ConfNgnix.JPG" height="270" ><br/>

### Dockerizacion de componentes anteriores

Una vez implementados los componentes anteriores es necesario dockerizarlos para que estos puedan correr independientemente en un contenedor. Para esto es necesario definir Dockerfiles para cada uno de los componentes.<br/>

El Dockerfile para el servidor API es el siguiente<br/>
![Imagen 20](/imageproject/dfileserver.png)<br/>
En él se definen el entorno, los manejadores de paquetes necesarios para la ejecución del api como npm, el comando npm install que instala todas la librerías de node usadas por el API, también se define el comando que se ejecutara cuando el contenedor inicie, en  este caso se ejecutara el archivo index.js usando npm.<br/>

El Dockerfile para el cliente web es el siguiente<br/>
![Imagen 21](/imageproject/dfileclient.png)<br/>
En él se definen el entorno, los manejadores de paquetes necesarios para la ejecución de la aplicación web como npm y vue , el comando npm install que instala todas la librerías de node y vue usadas por la aplicación web, el comando npm run build construye el cliente web para que este pueda ser despegado en un servidor web iniciado por npm, y finalmente se define el comando que se ejecutara cuando el contenedor inicie,  en este caso se ejecutara un servidor http en el contenedor.<br/>

El Dockerfile para el balanceador de carga es el siguiente<br/>
![Imagen 22](/imageproject/dfileproxy.png)<br/>
En él se definen el entorno, los manejadores de paquetes necesarios para la ejecución balanceador de carga nginx.<br/>

### Orquestador de contenedores mediante docker-compose:

**Implementacion del sistema de health check:**

**Implementacion de pruebas de integracion automaticas:**


## Ejecución y funcionamiento:

Lo primero que debe de hacer es construir los contenedores de la red docker, para esto previamente fue configurado el docker compose como orquestador, posteriormente para construir los contenedores del sistema hay que usar el comando <br/>
```
docker-compose build
```
Tras ejecutar el comando, verificamos que no hayan errores en  este proceso<br/>
![Imagen 100](/imageproject/builtok.png)<br/>

Una vez construido ejecutamos el sistema con el comando<br/>
```
docker-compose up
```

Se evidencia que los contenedores han sido ejecutados correctamente por el orquestador, y que los servicios se encuentran corriendo.<br/>
![Imagen 101](/imageproject/dockerup.png)<br/>

Podemos comporobar que los contenedores esten corriendo con el comando
```
docker ps
```
![Imagen 101](/imageproject/dockerps.png)<br/>

Ahora podemos ver como funciona la aplicacion:<br/>
Para aceder ingresamos la direccion 192.168.2.10:80/ en el navegador, tambien se puede ingresar por localhost:80/ o por 0.0.0.0:80
Esta dirección IP corresponde al contenedor proxy Ngnix, que esta expuesto al usuario para ser accedido por web.<br/>
![Imagen 101](/imageproject/NgnixActive.JPG)<br/>

Para agregar un nombre escibimos el nombre en el campo de texto y hacemos click en agregar<br/>
![Imagen 101](/imageproject/addName.png)<br/>
![Imagen 101](/imageproject/nameadded.png)<br/>

Una vez agregado exitosamnete el nombre aparecera en la lista<br/>
![Imagen 101](/imageproject/nameaddedapp.png)<br/>

Tambien podemos comprobar que fue agregado en la base de datos<br/>
![Imagen 101](/imageproject/nameaddeddb.png)<br/>

Comporobar el estado de los contenedores con el healthcheck

## Problemas
