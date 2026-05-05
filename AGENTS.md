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

## Sistema de internacionalización (i18n)

Todas las strings visibles deben usar el sistema de traducciones. El proyecto usa un servicio custom con signals (sin librerías externas).

### Arquitectura

- `src/app/types/translation-keys.ts` — Define `TranslationKey`, `Language`, y la lista `TRANSLATION_KEYS` (fuente única de verdad).
- `src/app/translations/es.ts` / `en.ts` — Traducciones por idioma con todas las keys.
- `src/app/translations/index.ts` — Barrel export que agrupa los idiomas.
- `src/app/core/services/translation.service.ts` — Servicio con `t` (computed signal) para acceso reactivo a traducciones.

### Cómo usar

- **En templates HTML**: `{{ t()['namespace.key'] }}`
- **En atributos**: `[attr.aria-label]="t()['namespace.key']"`
- **En placeholders**: `[placeholder]="t()['namespace.key']"`
- **En TypeScript**: `this.translationService.t()['namespace.key']`

### Inyectar el servicio

```typescript
private readonly translationService = inject(TranslationService);
protected readonly t = this.translationService.t;  // Para usar en template
protected readonly currentLang = this.translationService.currentLang;  // Para saber el idioma activo
```

### Cómo agregar un nuevo texto traducible

1. Agregar la key al array `TRANSLATION_KEYS` en `src/app/types/translation-keys.ts`
2. Agregar la traducción en `src/app/translations/es.ts`
3. Agregar la traducción en `src/app/translations/en.ts`
4. Usar `{{ t()['nueva.key'] }}` en el template

### Cómo agregar un nuevo idioma

1. Crear `src/app/translations/fr.ts` (todos los idiomas deben tener las mismas keys)
2. Agregar `'fr'` al tipo `Language` en `src/app/types/translation-keys.ts`
3. Importar e incluir en `translations/index.ts`
4. Agregar el botón de idioma en el topbar
