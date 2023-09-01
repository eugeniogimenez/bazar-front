import { Router } from "@vaadin/router";

const API_URL = "https://bazar-back-dsou.onrender.com";

class AddClientComponent extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    console.log("Soy add-client");
    
    const container = document.createElement("div");
    container.className = "add-client-container";

    const title = document.createElement("h2");
    title.textContent = "Agregar Nuevo Cliente";
    title.className = "title";

    const form = document.createElement("form");
    form.className = "add-client-form";
    form.innerHTML = `
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" required><br>
      <label for="apellido">Apellido:</label>
      <input type="text" id="apellido" name="apellido" required><br>
      <label for="dni">DNI:</label>
      <input type="text" id="dni" name="dni" required><br>
      <button type="submit" class="submit-button">Crear Cliente</button>
    `;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target as any);

      const clientData = {
        nombre: formData.get("nombre"),
        apellido: formData.get("apellido"),
        dni: formData.get("dni"),
      };

      try {
        const response = await fetch(`${API_URL}/clientes/crear`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clientData),
        });

        if (response.ok) {
          console.log("Cliente creado exitosamente.");
          Router.go('/'); // Redirigir a la página principal u otra página de tu elección
        } else {
          console.error("Error al crear el cliente.");
        }
      } catch (error) {
        console.error("Error al crear el cliente:", error);
      }
    });

    this.shadow.appendChild(title);
    this.shadow.appendChild(container);
    this.shadow.appendChild(form);

    const style = document.createElement("style");
    style.textContent = `
      .add-client-container {
        padding: 30px;
      }

      .title {
        margin-top: 0px;
        padding: 20px;
        background-color: #f4f4f4;
      }

      .add-client-form label {
        display: block;
        margin-top: 10px;
      }

      .add-client-form input {
        width: 100%;
        padding: 5px;
        margin-top: 5px;
        margin-bottom: 10px;
      }

      .submit-button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px;
        cursor: pointer;
      }
    `;
    this.shadow.appendChild(style);
  }
}

customElements.define("add-client-component", AddClientComponent);
