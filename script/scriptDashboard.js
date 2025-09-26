 // JS para la gráfica
      new Chart(document.getElementById("demoChart"), {
        type: "bar",
        data: {
          labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
          datasets: [
            {
              label: "Ingresos ($)",
              data: [1200, 1900, 800, 1500, 2200],
              backgroundColor: "#1d617a",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
          },
          scales: {
            x: {
              grid: {
                color: "transparent",
              },
            },
            y: {
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
            },
          },
        },
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
        document
          .getElementById("accessibilityModal")
          .classList.toggle("active");
      }

      const chatToggle = document.getElementById("chatToggle");
      const chatContainer = document.getElementById("chatContainer");
      const chatWindow = document.getElementById("chatWindow");
      const chatInput = document.getElementById("chatInput");
      const sendBtn = document.getElementById("sendBtn");

      const responses = {
        credito: "Su crédito ha sido aprobado. Felicidades.",
        solicitud: "Su documento ha sido recibido y está en proceso.",
        ayuda: "Puede contactarnos a través del correo soporte@colmenas.com.",
      };

      function toggleChat() {
        chatContainer.style.display =
          chatContainer.style.display === "none" ? "block" : "none";
        chatToggle.setAttribute(
          "aria-expanded",
          chatContainer.style.display === "block"
        );
      }

      function addMessage(msg, type) {
        const div = document.createElement("div");
        div.textContent = msg;
        div.className =
          type === "user" ? "text-end text-primary" : "text-start text-dark";
        chatWindow.appendChild(div);
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }

      function sendMessage() {
        const msg = chatInput.value.trim();
        if (!msg) return;
        addMessage(msg, "user");
        chatInput.value = "";
        setTimeout(() => {
          const reply =
            responses[msg.toLowerCase()] ||
            "Un agente revisará su solicitud pronto.";
          addMessage(reply, "bot");
        }, 500);
      }

      chatToggle.addEventListener("click", toggleChat);
      sendBtn.addEventListener("click", sendMessage);
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
      });

      const usuarios = {
        "usuario1@bancocolmenas.com": {
          nombre: "María García",
          cuenta: "0012345678",
          saldo: "1.500.555",
        },
        "usuario2@bancocolmenas.com": {
          nombre: "Pedro López",
          cuenta: "0098765432",
          saldo: "3.250.750",
        },
        "usuario3@bancocolmenas.com": {
          nombre: "Ana Rodríguez",
          cuenta: "0055551111",
          saldo: "850.000",
        },
      };

      // Formato de moneda para pesos colombianos
      const formatter = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 2,
      });

      // Lógica para cargar datos del usuario desde localStorage
      window.addEventListener("load", () => {
        const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUserData) {
          document.getElementById("nombre-usuario").textContent =
            currentUserData.nombre;
          document.getElementById("cuenta-usuario").textContent =
            currentUserData.cuenta;

          // Convierte el saldo a un número antes de mostrarlo
          const saldoNumerico = parseFloat(currentUserData.saldo);
          document.getElementById("saldo-usuario").textContent =
            saldoNumerico.toFixed(2);

          // Re-sincroniza el usuario del localStorage con la base de datos completa
          const usuarioEmail = Object.keys(usuarios).find(
            (key) => usuarios[key].cuenta === currentUserData.cuenta
          );
          if (usuarioEmail) {
            usuarios[usuarioEmail].saldo = saldoNumerico;
          }
        } else {
          window.location.href = "login.html"; // Redirigir si no hay sesión
        }
      });

      // Lógica de Transacciones
      document
        .getElementById("transaction-submit-btn")
        .addEventListener("click", (e) => {
          e.preventDefault();
          const tipoTransaccion =
            document.getElementById("transactionType").value;
          const destino = document.getElementById("transactionTarget").value;
          const monto = parseFloat(
            document.getElementById("transactionAmount").value
          );

          if (isNaN(monto) || monto <= 0 || !destino) {
            alert("Por favor, ingrese un monto y un destino válidos.");
            return;
          }

          const currentUser = JSON.parse(localStorage.getItem("currentUser"));
          let saldoActual = parseFloat(currentUser.saldo);

          if (saldoActual < monto) {
            alert("Saldo insuficiente para realizar la transacción.");
            return;
          }

          // Simular transferencia a otro usuario en la "base de datos"
          const destinoUsuario = Object.values(usuarios).find(
            (u) => u.cuenta === destino
          );

          if (!destinoUsuario) {
            alert(
              "La cuenta de destino no se encontró en nuestra base de datos."
            );
            return;
          }

          if (destinoUsuario.cuenta === currentUser.cuenta) {
            alert("No puedes transferir a tu propia cuenta.");
            return;
          }

          // Actualizar saldos
          saldoActual -= monto;

          // El usuario actual necesita ser actualizado en el objeto 'usuarios'
          const currentUserEmail = Object.keys(usuarios).find(
            (key) => usuarios[key].cuenta === currentUser.cuenta
          );
          if (currentUserEmail) {
            usuarios[currentUserEmail].saldo = saldoActual;
          }

          destinoUsuario.saldo += monto;

          // Guardar cambios en el localStorage
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ ...currentUser, saldo: saldoActual })
          );
          localStorage.setItem("usuariosDB", JSON.stringify(usuarios));

          // Actualizar el saldo en la vista
          document.getElementById("saldo-usuario").textContent =
            saldoActual.toFixed(2);

          // Mostrar y llenar el invoice en línea
          document.getElementById("invoiceContainer").style.display = "block";

          const invoiceType = document.getElementById("invoiceType");
          const invoiceAmount = document.getElementById("invoiceAmount");
          const invoiceTarget = document.getElementById("invoiceTarget");
          const invoiceDate = document.getElementById("invoiceDate");

          invoiceType.textContent =
            tipoTransaccion === "pago" ? "Pago de servicios" : "Transferencia";
          invoiceAmount.textContent = formatter
            .format(monto)
            .replace("COP", "")
            .trim();
          invoiceTarget.textContent = destino;
          invoiceDate.textContent = new Date().toLocaleString();

          // Limpiar el formulario después de una transacción exitosa
          document.getElementById("transactionTarget").value = "";
          document.getElementById("transactionAmount").value = "";
        });