# Consultorios Centrales 🏥

Sitio web de una página para solicitar turnos en Consultorios Centrales. Incluye
formulario con validación nativa, botón para cambiar de tema (automático, claro, oscuro), foto de especialista, carrusel de fotos y publicidades que rotan automáticamente.

## Demo

[Ver el sitio en GitHub Pages](https://susanamaggio2.github.io/TrabajoFinal/)

## Estructura

```
.
├── index.html        Página principal
├── estilos.css       Estilos, temas y diseño adaptable
├── js/
│   ├── datos.js        Especialidades, sucursales y horarios
│   ├── tema.js         Botón de tema (automático, claro, oscuro)
│   ├── publicidades.js Cambio automático de publicidades cada 7 segundos
│   ├── especialista.js Muestra u oculta la foto del especialista
│   ├── formulario.js   Validación nativa y resumen del turno
│   └── carrusel.js     Carrusel de fotos con autoplay y pausa
├── fuentes/          Tipografías en WOFF2 (con respaldo TTF)
├── Imagenes/         Logo, fotos de consultorios y publicidades
└── robots.txt        Reglas para buscadores
```

## Funcionalidad

- **Solicitud de turno:** la validación la hace el navegador con `required`,
  `pattern`, `type="email"`, `min`/`max` y la fecha mínima de hoy. Al enviar se
  muestra un resumen con los datos del turno.
- **Especialista:** botón que muestra u oculta la foto y el nombre del
  profesional según la especialidad elegida.
- **Tema:** un botón rota entre automático (según el sistema), claro y oscuro.
  La preferencia se guarda en `localStorage` y se aplica antes del primer
  pintado para evitar destellos.
- **Carrusel:** avance automático cada 5 segundos, pausa manual, pausa al pasar
  el mouse o al enfocar, desplazamiento táctil, flechas, puntos y teclado.
  Respeta `prefers-reduced-motion`.
- **Publicidades:** dos avisos por vista y cambio automático cada 7 segundos.
  En desktop se apilan; en tablet y mobile van en dos columnas. Se pausan al
  pasar el mouse o al enfocar, y con `prefers-reduced-motion`.
- **Accesibilidad:** enlace para saltar al contenido, landmarks (`header`,
  `main`, `footer`), etiquetas asociadas, foco visible, mensajes de validación
  del navegador y respeto por `prefers-reduced-motion`.

## Notas

- Es una demostración: el formulario no envía datos a ningún servidor. Para un
  sitio real hace falta un backend o un servicio de formularios, y validación
  del lado del servidor.
- Los datos de contacto, direcciones y redes sociales son de ejemplo.

## Equipo desarrollador

- [Susana Maggio](https://github.com/susanamaggio2)
- [Ailén Micaela Ramírez](https://github.com/Ailen-18)
- [Mariano Javier Portal](https://github.com/devsiderio)
