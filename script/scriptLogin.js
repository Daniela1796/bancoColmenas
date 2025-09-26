const togglePwd = document.getElementById("togglePwd");
      const clave = document.getElementById("clave");
      togglePwd.addEventListener("click", () => {
        const isPwd = clave.type === "password";
        clave.type = isPwd ? "text" : "password";
        const newLabel = isPwd ? "Ocultar contraseña" : "Mostrar contraseña";
        togglePwd.textContent = isPwd ? "Ocultar" : "Mostrar";
        togglePwd.setAttribute("aria-label", newLabel);
      });
      const captchaWord = document.getElementById("captchaWord");
      const captchaInput = document.getElementById("captchaInput");
      const errorCaptcha = document.getElementById("errorCaptcha");
      const palabras = ["abeja", "colmena", "miel", "seguro", "banco"];
      let palabra = palabras[Math.floor(Math.random() * palabras.length)];
      captchaWord.textContent = palabra;

      // Base de datos de usuarios simulada
      const usuarios = {
        "usuario1@bancocolmenas.com": {
          nombre: "María García",
          cuenta: "0012345678",
          saldo: 1500500.0,
        },
        "usuario2@bancocolmenas.com": {
          nombre: "Pedro López",
          cuenta: "0098765432",
          saldo: 3250750.5,
        },
        "usuario3@bancocolmenas.com": {
          nombre: "Ana Rodríguez",
          cuenta: "0055551111",
          saldo: 850000.0,
        },
      };

      document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const usuarioInput = document.getElementById("usuario").value.trim();
        const claveInput = document.getElementById("clave").value.trim();
        const captchaValue = captchaInput.value.trim().toLowerCase();
        let isValid = true;
        document.getElementById("errorUsuario").textContent = "";
        document.getElementById("errorClave").textContent = "";
        errorCaptcha.textContent = "";

        if (usuarioInput === "") {
          document.getElementById("errorUsuario").textContent =
            "El campo de usuario es obligatorio.";
          isValid = false;
        }
        if (claveInput === "") {
          document.getElementById("errorClave").textContent =
            "El campo de contraseña es obligatorio.";
          isValid = false;
        }
        if (captchaValue !== palabra) {
          errorCaptcha.textContent =
            "La palabra no coincide, intenta de nuevo.";
          isValid = false;
        }

        if (isValid) {
          // Verificar si el usuario existe en la base de datos simulada
          if (usuarios[usuarioInput]) {
            // Si el usuario existe y la contraseña es "clave123" (ejemplo fijo)
            // En un entorno real, la contraseña se compararía con un hash
            if (claveInput === "clave123") {
              // Guardar los datos del usuario en localStorage
              localStorage.setItem(
                "currentUser",
                JSON.stringify(usuarios[usuarioInput])
              );
              window.location.href = "principalDashboard.html"; // Redirigir al dashboard
            } else {
              document.getElementById("errorClave").textContent =
                "Contraseña incorrecta.";
            }
          } else {
            document.getElementById("errorUsuario").textContent =
              "El usuario no existe.";
          }
        }
      });
      function toggleHighContrast() {
        document.body.classList.toggle("high-contrast");
        document.body.classList.remove("low-contrast");
      }
      function toggleLowContrast() {
        document.body.classList.toggle("low-contrast");
        document.body.classList.remove("high-contrast");
      }
      function increaseFont() {
        document.body.style.fontSize =
          parseInt(window.getComputedStyle(document.body).fontSize) + 2 + "px";
      }
      function decreaseFont() {
        document.body.style.fontSize =
          parseInt(window.getComputedStyle(document.body).fontSize) - 2 + "px";
      }
      function toggleAccessibilityModal() {
        const modal = document.getElementById("accessibilityModal");
        const isExpanded = modal.classList.contains("active");
        document
          .querySelector(".accessibility-toggle")
          .setAttribute("aria-expanded", !isExpanded);
        modal.classList.toggle("active");
      }