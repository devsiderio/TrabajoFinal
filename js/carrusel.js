/**
 * Carrusel de fotos con scroll-snap nativo y avance automático.
 * Sin clones ni transformaciones: el navegador maneja el desplazamiento.
 */
(function () {
  const INTERVALO = 5000;
  const carruseles = document.querySelectorAll(".carrusel");

  if (carruseles.length === 0) return;

  function iniciar(carrusel) {
    const ventana = carrusel.querySelector(".carrusel-ventana");
    const total = ventana.querySelectorAll(".carrusel-slide").length;
    const puntos = [
      ...carrusel.querySelectorAll(
        ".carrusel-puntos button:not(.carrusel-pausa)",
      ),
    ];
    const anterior = carrusel.querySelector(".carrusel-flecha--prev");
    const siguiente = carrusel.querySelector(".carrusel-flecha--next");
    const pausa = carrusel.querySelector(".carrusel-pausa");
    const reducirMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let temporizador = null;
    let pausadoManual = false;
    let pausadoHover = false;
    let pausadoFoco = false;

    function indiceActual() {
      if (!ventana.clientWidth) return 0;

      const indice = Math.round(ventana.scrollLeft / ventana.clientWidth);
      return Math.min(total - 1, Math.max(0, indice));
    }

    function moverA(indice, suave) {
      const comportamiento = suave && !reducirMovimiento.matches ? "smooth" : "auto";

      ventana.scrollTo({
        left: indice * ventana.clientWidth,
        behavior: comportamiento,
      });
    }

    function actualizarPuntos() {
      const actual = indiceActual();

      puntos.forEach(function (punto, i) {
        if (i === actual) {
          punto.setAttribute("aria-current", "true");
        } else {
          punto.removeAttribute("aria-current");
        }
      });
    }

    function autoplayActivo() {
      return (
        !pausadoManual &&
        !pausadoHover &&
        !pausadoFoco &&
        !reducirMovimiento.matches &&
        !document.hidden
      );
    }

    function detenerAutoplay() {
      if (temporizador !== null) {
        clearInterval(temporizador);
        temporizador = null;
      }
    }

    function reiniciarAutoplay() {
      detenerAutoplay();
      if (!autoplayActivo()) return;

      temporizador = setInterval(function () {
        moverA((indiceActual() + 1) % total, true);
      }, INTERVALO);
    }

    function actualizarBotonPausa() {
      if (!pausa) return;

      const texto = pausadoManual ? "Reanudar" : "Pausar";
      pausa.querySelector("i").className = pausadoManual
        ? "bi bi-play-fill"
        : "bi bi-pause-fill";
      pausa.setAttribute("aria-label", texto);
      pausa.title = texto;
    }

    // Mantiene los puntos sincronizados con el scroll (mouse, dedo o teclado).
    let cuadroPendiente = false;
    ventana.addEventListener("scroll", function () {
      if (cuadroPendiente) return;

      cuadroPendiente = true;
      requestAnimationFrame(function () {
        actualizarPuntos();
        cuadroPendiente = false;
      });
    });

    carrusel.addEventListener("pointerenter", function (evento) {
      if (evento.pointerType !== "mouse") return;
      pausadoHover = true;
      detenerAutoplay();
    });

    carrusel.addEventListener("pointerleave", function (evento) {
      if (evento.pointerType !== "mouse") return;
      pausadoHover = false;
      reiniciarAutoplay();
    });

    carrusel.addEventListener("focusin", function (evento) {
      // Solo pausa con foco de teclado; un clic con mouse no debe frenar el autoplay.
      let visible = true;
      try {
        visible = evento.target.matches(":focus-visible");
      } catch (e) {
        // Navegador sin :focus-visible: se conserva la pausa por seguridad.
      }
      if (!visible) return;

      pausadoFoco = true;
      detenerAutoplay();
    });

    carrusel.addEventListener("focusout", function (evento) {
      if (carrusel.contains(evento.relatedTarget)) return;
      pausadoFoco = false;
      reiniciarAutoplay();
    });

    // Mientras el usuario toca o arrastra, no compite el avance automático.
    ventana.addEventListener("pointerdown", detenerAutoplay);
    ventana.addEventListener("pointerup", reiniciarAutoplay);
    ventana.addEventListener("pointercancel", reiniciarAutoplay);

    if (pausa) {
      pausa.addEventListener("click", function () {
        pausadoManual = !pausadoManual;
        actualizarBotonPausa();
        reiniciarAutoplay();
      });
    }

    anterior.addEventListener("click", function () {
      moverA((indiceActual() - 1 + total) % total, true);
      reiniciarAutoplay();
    });

    siguiente.addEventListener("click", function () {
      moverA((indiceActual() + 1) % total, true);
      reiniciarAutoplay();
    });

    puntos.forEach(function (punto, i) {
      punto.addEventListener("click", function () {
        moverA(i, true);
        reiniciarAutoplay();
      });
    });

    carrusel.addEventListener("keydown", function (evento) {
      if (evento.key === "ArrowLeft") {
        evento.preventDefault();
        moverA((indiceActual() - 1 + total) % total, true);
        reiniciarAutoplay();
      } else if (evento.key === "ArrowRight") {
        evento.preventDefault();
        moverA((indiceActual() + 1) % total, true);
        reiniciarAutoplay();
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        detenerAutoplay();
      } else {
        reiniciarAutoplay();
      }
    });

    reducirMovimiento.addEventListener("change", function () {
      if (reducirMovimiento.matches) {
        detenerAutoplay();
      } else {
        reiniciarAutoplay();
      }
    });

    // Al cambiar el tamaño, se reajusta la posición sin animación.
    if ("ResizeObserver" in window) {
      new ResizeObserver(function () {
        moverA(indiceActual(), false);
      }).observe(ventana);
    } else {
      window.addEventListener("resize", function () {
        moverA(indiceActual(), false);
      });
    }

    actualizarPuntos();
    actualizarBotonPausa();
    reiniciarAutoplay();
  }

  carruseles.forEach(iniciar);
})();
