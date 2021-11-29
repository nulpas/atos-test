# AtosTest

Proyecto generado con Angular 13.0.2

En el directorio "server" se ha incluido una pequeña pieza backend construida con NodeJS para resumir las múltiples llamadas de algunas páginas.

El front intentará usar primero esta pieza Node, pero si esta no estuviera levantada, intentará acceder a los datos de forma directa, es decir, mediante los endpoints de {JSON} Placeholder.

Lo primero que haremos será clonar el repositorio:

```
https://github.com/nulpas/atos-test.git
```

## Inicio en local

Ahora hay que instalar las dependencias del proyecto front y de la pieza Node. Con el repo clonado, accederemos al directorio raíz del proyecto para ejecutar un "npm install" o un "yarn install".

Una vez finalizada la instalación de las dependencias en el directorio raíz, accederemos al subdirectorio "server" para volver a ejecutar allí dentro de nuevo el comando "npm install" o "yarn install".

Una vez instaladas las dependencias de ambos proyectos, procederemos a arrancar primero la pieza Node. Desde el subdirectorio "server" ejecutaremos:

```
node index.js
```

Esto disponibilizará la API en la siguiente ruta:

```
http://localhost:7555
```

Ahora ya podemos arrancar la pieza front con cualquiera de los comandos:

```
npm start
```
```
yarn start
```

Esto debería lanzarnos la aplicación front en nuestro navegador por defecto en la siguiente ruta:

```
http://localhost:4555/
```

## Inicio con Docker

Se ha configurado una dockerización tanto de la pieza front como de la pieza back. Para arrancar vía Docker, lo único que tenemos que hacer es ejecutar el siguiente script:

```
sh scripts/local-docker.sh
```

Hay que tener en cuenta que el script está diseñado para que sea ejecutado desde el directorio raíz del proyecto.

La ejecución de este script nos levantará un contenedor Docker con la pieza Node en la dirección:

```
http://localhost:7999/
```

y otro contendor Docker con el front en la siguiente url:

```
http://localhost:6555/
```

Además de levantar los contenedores indicados, se crearán unas imágnes Docker en el directorio "scripts" tageadas con la fecha y hora de la ejecución, las cuales podrían instalarse y levantarse con facilidad en cualquier otro entorno que se desease.

## A tener en cuenta

* Para aplicar los estilos del site se ha construido un template con Medea, que es un sistema de templates desarrollado por mí: ```https://github.com/medea-template-system/medea```
* Los componentes del sistema de diseño tales como Modal, Input, Select, Dropdown, Notification, etc. pertenecen a Circe, un sistema de diseño propio también desarrollado por mí: ```https://github.com/circe-components/circe```
* Todo el diseño de la arquitectura de la aplicación es modular.
* Se ha construido un enrutado en lazy loading.
* Se ha usado un interceptor http para notificar posibles problemas de conexiones con API y demás problemas relacionados.
* Se ha incluido Eslint como primer chequeo de código. Para ejecutar un análisis basta con ejecutar ```npm run lint``` o ```yarn lint```
