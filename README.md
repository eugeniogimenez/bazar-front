# BAZAR - BACK  

## Descripcion General:
El proyecto consiste en un Sistema para la administración de un Bazar. El usuario puede ser el dueño o un empleado de dicho negocio. Se trabaja con Productos, Clientes y Ventas, pudiendo guardar datos tanto de las personas, como los productos y las ventas que se van realizando.

 Siguiendo el modelo "Cliente - Servidor", tanto el front como el back se trabajaron por separado. En resumen, para el front se uso Typescript, y para el back, **JAVA - SprinBoot**, conectando a una base de datos MySQL.

 La dirección de la app es: https://bazar-front.netlify.app

> IMPORTANTE: IMPORTANTE: al usarse un servidor de pruebas (Clever Cloud) se debe tener paciencia en cuanto a la carga de información ya que puede tener demoras.

## Front:
El front se puede ver en el siguiente repositorio: https://github.com/eugeniogimenez/bazar-front

## Back:
El backend se encuentra dockerizado y desplegado en en:
https://bazar-back-dsou.onrender.com

Las tecnologías usadas son:

- ##### SpringBoot
- ##### JAVA
- ##### Docker
- ##### MySQL
- ##### JPA (Hibernate)
- ##### APIs

## Arquitectura:
Se sigue el modelo MVC para trabajar por capas. Se usó la estructura acorde a SpringBoot con las siguientes capas: Controller, DTO, Model, Repository, y  Service

## Base de Datos:
Utilización de MySQL mediante el servicio de Clever Cloud. 

## Docker:
La app se dockerizó para su posterior despliegue.

## Postman:
La dirección de la documentación postman para hacer uso de la app vía APIs se brinda aquí:

https://documenter.getpostman.com/view/21827106/2s9Y5eNfP7
