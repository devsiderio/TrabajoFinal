/**
 * Solicitud de turno: la validación la hace el navegador (required, pattern,
 * type=email, min/max y la fecha mínima). Acá solo se arma el resumen.
 * Usa DATOS (datos.js).
 */
(function () {
  const formulario = document.getElementById("formularioTurno");
  const resultado = document.getElementById("resultado");
  const fecha = document.getElementById("fecha");

  // La fecha mínima es hoy: no se pueden pedir turnos para el pasado.
  function fechaISOHoy() {
    const hoy = new Date();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return hoy.getFullYear() + "-" + mes + "-" + dia;
  }

  fecha.min = fechaISOHoy();

  // Al empezar a cargar otro turno, se oculta el resumen anterior.
  function limpiarResultado() {
    resultado.replaceChildren();
  }

  formulario.addEventListener("input", limpiarResultado);
  formulario.addEventListener("change", limpiarResultado);

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const datos = new FormData(formulario);
    const especialidad = DATOS.especialidades[datos.get("opciones")];
    const fechaElegida = datos.get("fecha");

    const titulo = document.createElement("p");
    titulo.className = "resultado-titulo";
    titulo.textContent = "Turno registrado";

    const lista = document.createElement("dl");
    lista.className = "resultado-datos";

    [
      ["Nombre", datos.get("nombre").trim()],
      ["Apellido", datos.get("apellido").trim()],
      ["Edad", datos.get("edad")],
      ["Email", datos.get("email").trim()],
      ["Especialidad", especialidad.texto],
      ["Sucursal", DATOS.sucursales[datos.get("sucursal")]],
      ["Fecha", fechaElegida.split("-").reverse().join("/")],
      ["Horario", DATOS.horarios[datos.get("horario")]],
    ].forEach(function (fila) {
      const termino = document.createElement("dt");
      termino.textContent = fila[0];

      const detalle = document.createElement("dd");
      detalle.textContent = fila[1];

      lista.append(termino, detalle);
    });

    resultado.replaceChildren(titulo, lista);
    formulario.reset();
    // El foco lleva al resumen; sin aria-live se evita el doble anuncio.
    resultado.focus();
  });
})();
