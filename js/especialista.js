/**
 * Especialista: muestra u oculta la foto y el nombre según la especialidad.
 * Usa DATOS (datos.js).
 */
(function () {
  const select = document.getElementById("opciones");
  const contenedor = document.getElementById("especialista");
  const foto = document.getElementById("foto");
  const nombre = document.getElementById("nombreEspecialista");
  const boton = document.getElementById("btnEspecialista");
  const textoBoton = document.getElementById("textoBtnEspecialista");
  const iconoBoton = document.getElementById("iconoBtnEspecialista");
  const formulario = document.getElementById("formularioTurno");
  // Pixel transparente inicial: se restaura al ocultar la foto.
  const fotoVacia = foto.getAttribute("src");

  function actualizarBoton(visible) {
    textoBoton.textContent = visible ? "Ocultar" : "Mostrar";
    iconoBoton.className = visible ? "bi bi-eye-slash" : "bi bi-eye";
    boton.setAttribute("aria-expanded", visible ? "true" : "false");
  }

  function mostrar() {
    const datos = DATOS.especialidades[select.value];

    if (!datos) {
      select.reportValidity();
      return;
    }

    foto.src = "Imagenes/" + select.value + ".jpg";
    foto.alt = datos.nombre + ", " + datos.descripcion;
    nombre.textContent = datos.nombre;
    contenedor.hidden = false;
    actualizarBoton(true);
  }

  function ocultar() {
    contenedor.hidden = true;
    foto.src = fotoVacia;
    foto.alt = "";
    nombre.textContent = "";
    actualizarBoton(false);
  }

  boton.addEventListener("click", function () {
    if (contenedor.hidden) {
      mostrar();
    } else {
      ocultar();
    }
  });

  // Si la foto ya está visible, se actualiza al cambiar la especialidad.
  select.addEventListener("change", function () {
    if (contenedor.hidden) return;

    if (DATOS.especialidades[select.value]) {
      mostrar();
    } else {
      ocultar();
    }
  });

  // El formulario dispara "reset" después de registrar el turno.
  formulario.addEventListener("reset", ocultar);
})();
