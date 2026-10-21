/**
 * Publicidades: dos avisos por vista y cambio automático cada 7 segundos.
 * Pausa al pasar el mouse, al enfocar, con la pestaña oculta y con
 * preferencias de movimiento reducido.
 */
(function () {
  const aside = document.querySelector(".aside");
  const paginas = [...document.querySelectorAll(".publicidades-pagina")];
  if (!aside || paginas.length < 2) return;

  const reducirMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const INTERVALO = 7000;

  let actual = 0;
  let temporizador = null;
  let pausadoHover = false;
  let pausadoFoco = false;

  function mostrar(indice) {
    actual = indice;
    paginas.forEach(function (pagina, i) {
      pagina.setAttribute("aria-hidden", i === actual ? "false" : "true");
    });
  }

  function activo() {
    return (
      !pausadoHover &&
      !pausadoFoco &&
      !reducirMovimiento.matches &&
      !document.hidden
    );
  }

  function detener() {
    if (temporizador !== null) {
      clearInterval(temporizador);
      temporizador = null;
    }
  }

  function reiniciar() {
    detener();
    if (!activo()) return;

    temporizador = setInterval(function () {
      mostrar((actual + 1) % paginas.length);
    }, INTERVALO);
  }

  aside.addEventListener("pointerenter", function (evento) {
    if (evento.pointerType !== "mouse") return;
    pausadoHover = true;
    detener();
  });

  aside.addEventListener("pointerleave", function (evento) {
    if (evento.pointerType !== "mouse") return;
    pausadoHover = false;
    reiniciar();
  });

  aside.addEventListener("focusin", function () {
    pausadoFoco = true;
    detener();
  });

  aside.addEventListener("focusout", function (evento) {
    if (aside.contains(evento.relatedTarget)) return;
    pausadoFoco = false;
    reiniciar();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      detener();
    } else {
      reiniciar();
    }
  });

  reducirMovimiento.addEventListener("change", function () {
    if (reducirMovimiento.matches) {
      detener();
    } else {
      reiniciar();
    }
  });

  mostrar(0);
  reiniciar();
})();
