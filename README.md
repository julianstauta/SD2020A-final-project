# SD2020A-final-project

### Jose Camilo Moctezuma Ruiz - 
### Julian Santiago Tauta Chaparro - A00022232
### Cristian Duque - 
### Camilo Penagos - 

### Objetivos

 * Diseñar la arquitectura de un sistema distribuido que implemente un conjunto de microservicios, considerando las implicaciones técnicas asociadas con su escalabilidad, tolerancia a fallos y concurrencia, y las mejoras en el desempeño a través de la asignación o reasignación de los recursos y tareas.
 * Desplegar un sistema distribuido, teniendo en cuenta las estrategias de administración de sus recursos consideradas en el diseño.
 * Gestionar el servicio distribuido, haciendo uso de herramientas de monitoreo y provisionamiento

### Desarrollo

La aqruitectura propuesta para desarrollar el proyecto es la siguiente

![Imagen 1](/imageproject/Arquitectura.JPG)<br/>

Implementacion de cada componente:

Base de datos:
Api de acceso y modificacion de base de datos:
Front end:
Balanceador de carga:
Orquesatdor de contenedores mediante docker-compose:

Implementacion del sistema de health check:

Implementacion de pruebas de integracion automaticas:

### Ejecucion y funcionamiento

Para construir los contenedores del sistema hay que usar el comando<br/>
```
docker-compose build
```
Tras ejecutar el comando verificamos que no hayan errores en  este proceso<br/>
![Imagen 100](/imageproject/builtok.png)<br/>

Una vez construido ejecutamos el sistema con el comando<br/>
```
docker-compose up
```
![Imagen 101](/imageproject/dockerup.png)<br/>

Podmeos comporobar que los contenedores esten corriendo con el comando
```
docker ps
```
![Imagen 101](/imageproject/dockerps.png)<br/>

Ahora podemos ver como funciona la aplicacion:<br/>
Para aceder ingresamos la direccion 192.168.2.10:80/ en el navegador, tambien se puede ingresar por localhost:80/ o por 0.0.0.0:80/<br/>
![Imagen 101](/imageproject/NgnixActive.JPG)<br/>

Para agregar un nombre escibimos el nombre en el campo de texto y hacemos click en agregar<br/>
![Imagen 101](/imageproject/addName.JPG)<br/>
![Imagen 101](/imageproject/nameadded.JPG)<br/>

Una vez agregado exitosamnete el nombre aparecera en la lista<br/>
![Imagen 101](/imageproject/nameaddedapp.JPG)<br/>

Tambien podemos comprobar que fue agregado en la base de datos<br/>
![Imagen 101](/imageproject/nameaddeddb.JPG)<br/>