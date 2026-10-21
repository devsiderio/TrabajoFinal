/**
 * Tema: automático (según el sistema), claro u oscuro.
 * El botón rota entre los tres estados.
 *
 * La clave y los valores deben coincidir con el script inline de index.html
 * que aplica el tema antes del primer pintado.
 */
(function () {
  const CLAVE = "tema";
  const ORDEN = ["auto", "claro", "oscuro"];

  const ICONOS = {
    auto: "bi-circle-half",
    claro: "bi-sun-fill",
    oscuro: "bi-moon-stars-fill",
  };

  const ETIQUETAS = {
    auto: "Automático (sigue al sistema)",
    claro: "Claro",
    oscuro: "Oscuro",
  };

  const boton = document.getElementById("temaBtn");
  const icono = document.getElementById("temaIcono");
  const metaTema = document.querySelector('meta[name="theme-color"]');
  const mediaOscuro = window.matchMedia("(prefers-color-scheme: dark)");

  let preferencia = "auto";

  try {
    const guardada = localStorage.getItem(CLAVE);
    if (ORDEN.includes(guardada)) preferencia = guardada;
  } catch (e) {
    // Storage bloqueado: seguimos en automático.
  }

  function esOscuro() {
    return (
      preferencia === "oscuro" ||
      (preferencia === "auto" && mediaOscuro.matches)
    );
  }

  function aplicar() {
    const oscuro = esOscuro();

    document.documentElement.classList.toggle("oscuro", oscuro);
    icono.className = "bi " + ICONOS[preferencia];
    boton.setAttribute("aria-label", "Tema: " + ETIQUETAS[preferencia]);
    boton.title = "Tema: " + ETIQUETAS[preferencia];

    if (metaTema) {
      metaTema.setAttribute("content", oscuro ? "#0f172a" : "#f5f7fa");
    }
  }

  function elegir(valor) {
    preferencia = valor;

    try {
      localStorage.setItem(CLAVE, valor);
    } catch (e) {
      // Sin persistencia: el tema igual se aplica en esta visita.
    }

    aplicar();
  }

  boton.addEventListener("click", function () {
    const siguiente = (ORDEN.indexOf(preferencia) + 1) % ORDEN.length;
    elegir(ORDEN[siguiente]);
  });

  mediaOscuro.addEventListener("change", function () {
    if (preferencia === "auto") aplicar();
  });

  aplicar();
})();
