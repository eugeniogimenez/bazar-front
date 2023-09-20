# BAZAR - FRONT

## Descripcion General:
El proyecto consiste en un Sistema para la administración de un Bazar. El usuario puede ser el dueño o un empleado de dicho negocio. Se trabaja con Productos, Clientes y Ventas, pudiendo guardar datos tanto de las personas, como los productos y las ventas que se van realizando.

 Siguiendo el modelo "Cliente - Servidor", tanto el front como el back se trabajaron por separado. En resumen, para el front se uso Typescript, y para el back, **JAVA - SprinBoot**, conectando a una base de datos MySQL.

 La dirección de la app es: https://bazar-front.netlify.app

> IMPORTANTE: IMPORTANTE: al usarse un servidor de pruebas (Clever Cloud) se debe tener paciencia en cuanto a la carga de información ya que puede tener demoras.

## Back:
El back se puede ver en el siguiente repositorio: https://github.com/eugeniogimenez/bazar-back

## Front:
El presente frontend se penso a modo de prueba del backend, ya que si bien existe la documentación en postman para hacerlo vía APIs (ver abajo), el navegador requiere de otros recaudos como puede ser las políticas de "cors", que son necesarias tener en cuenta para su correcto despliegue.

Por tanto, el foco está puesto más en funcionalidad, dejando la parte de diseño para un trabajo posterior. Se utliza TYPESCRIPT para darle un tipado más estricto y poder tener así un mejor control del funcionamiento.

## Arquitectura:
Se utiliza una arquitectura de Single Page App (SPA), con "Pages y Components" que se van renderizando de acuerdo a la necesidad del usuario, vía un "router" que direcciona las peticiones de los  mismos.

Además se incorpora un "state manager" para poder compartir informacion necesaria entre los componentes.

## Consumo de APIs:
Mediante fetch se consumen las distintas APIs de manera asyncrona.

## Postman:
La dirección de la documentación postman para hacer uso de la app vía APIs se brinda aquí:

https://documenter.getpostman.com/view/21827106/2s9Y5eNeve.

