 // Funciones de accesibilidad
      function toggleHighContrast() {
        document.body.classList.toggle("high-contrast");
      }

      function toggleLowContrast() {
        document.body.classList.toggle("low-contrast");
      }

      function increaseFont() {
        document.body.style.fontSize =
          parseInt(window.getComputedStyle(document.body).fontSize) + 2 + "px";
      }

      function decreaseFont() {
        document.body.style.fontSize =
          parseInt(window.getComputedStyle(document.body).fontSize) - 2 + "px";
      }

      // Modal accesibilidad
      function toggleAccessibilityModal() {
        document
          .getElementById("accessibilityModal")
          .classList.toggle("active");
      }

      // JS accesible para foco en botones
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("keyup", (e) => {
          if (e.key === "Enter") el.click();
        });
      });