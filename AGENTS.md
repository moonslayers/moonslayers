# Portafolio hecho estilo dashboard empresarial

- Bootstrap 5 y bootstrap icons
- angular 21
- Personalizacion de bootstrap en styles.scss

## Resquisitos o restricciones

- Nunca uses estilos personalizado, siempre usa clases de bootstrap. A menos que sea una tarea que no se pueda hacer con bootstrap.
- Nunca uses funciones de javascript de bootstrap, no funcionan, para funcionalidades o cosas con javascript usa angular.

## Cuando invocar una skill

- siempre que vayas a modificar o crear codigo de angular invoca la skill de angular21
- si vas a crear estructuas o patrones de diseño o reglas de negocio en typescript puro sin librerias de angular invoca la skill de typescript
- si tienes duda en invocar una skill invocala.

## Validaciones finales

- No hagas commits a menos que el usuario te lo pida
- al finalizar con cualquier tarea, verifica que cumpla con el lint y que compile con "ng build" y "ng lint".

### Bootstrap JS no funciona con Angular

- Las funciones de Bootstrap JS (`data-bs-toggle`, `data-bs-dismiss`, etc.) no funcionan en Angular porque Bootstrap JS no está diseñado para trabajar con el lifecycle de Angular ni con ChangeDetection OnPush.
- **Solución**: Implementar toda la interactividad con Angular puro: signals + `@if` para mostrar/ocultar, eventos `(click)` para toggle.
