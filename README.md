# SD2020A-final-project

### Jose Camilo Moctezuma Ruiz - 
### Julian Santiago Tauta Chaparro - A00022232
### Cristian Duque - 
### Camilo Penagos - 

### Objetivos

 * Diseñar la arquitectura de un sistema distribuido que implemente un conjunto de microservicios, considerando las implicaciones técnicas asociadas con su escalabilidad, tolerancia a fallos y concurrencia, y las mejoras en el desempeño a través de la asignación o reasignación de los recursos y tareas.
 * Desplegar un sistema distribuido, teniendo en cuenta las estrategias de administración de sus recursos consideradas en el diseño.
 * Gestionar el servicio distribuido, haciendo uso de herramientas de monitoreo y provisionamiento

### Arquitectura

La arquitectura propuesta para desarrollar el proyecto es la siguiente

![Imagen 1](/imageproject/Arquitectura.JPG)<br/>

La arquitectura propuesta para dar solución al proyecto cuenta con una red docker de cuatro contenedores, que se comunica mediante REST con una base de datos en la nube para el almacenamiento. Esta red docker esta conformada por cuatro contenedores:

1. **Balanceador de carga:** Una instancia de Ngnix, que permite hacer el balanceo de carga a las peticiones de las instancias web. Este proxy esta expuesto para ser accedido por el puerto 80 

2. **Servidores Web:** Dos intancias de frontend desplegadas en Vue.js, estas instancias reciben peticiones http previamente balanceadas por el proxy Ngninx

3. **Servidor REST:** Servidor de backend desplegado en node.js que permite la comunicación REST con la base de datos en la nube



### Desarrollo

- Implementación de cada componente:

**Base de datos:**

**Api de acceso y modificacion de base de datos:**

**Front end:**

**Orquesatdor de contenedores mediante docker-compose:**

**Balanceador de carga:**

**Implementacion del sistema de health check:**

**Implementacion de pruebas de integracion automaticas:**


### Ejecucion y funcionamiento

Para construir los contenedores del sistema hay que usar el comando<br/>
```
docker-compose build
```
Tras ejecutar el comando, verificamos que no hayan errores en  este proceso<br/>
![Imagen 100](/imageproject/builtok.png)<br/>

Una vez construido ejecutamos el sistema con el comando<br/>
```
docker-compose up
```

Se evidencia que los contenedores han sido ejecutados correctamente por el orquestador, y que los servicios se encuentran corriendo.
![Imagen 101](/imageproject/dockerup.png)<br/>

Ahora podemos ver como funciona la aplicacion:<br/>
Para aceder ingresamos la direccion 192.168.2.10:80/ en el navegador, tambien se puede ingresar por localhost:80/ o por 0.0.0.0:80
Esta dirección IP corresponde al contenedor proxy Ngnix, que esta expuesto al usuario para ser accedido por web.<br/>
![Imagen 101](/imageproject/NgnixActive.JPG)<br/>
