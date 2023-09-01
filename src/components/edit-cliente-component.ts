import { Router } from "@vaadin/router";
import { state } from "../../state"; // Asegúrate de importar el estado correctamente

const API_URL = "https://bazar-back-dsou.onrender.com";

class EditClientComponent extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.fetchClient();
  }

  async fetchClient() {
    
    
    const clientId = state.getState().clienteId;
    console.log("clientId: ", clientId);
    

    if (!clientId) {
      console.error("No se encontró el ID del cliente en el estado.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/clientes/${clientId}`);
      const client = await response.json();
      this.populateForm(client);
    } catch (error) {
      console.error("Error fetching client:", error);
    }
  }

  populateForm(client) {
    const form = this.shadow.querySelector(".edit-client-form");
    form["nombre"].value = client.nombre;
    form["apellido"].value = client.apellido;
    form["dni"].value = client.dni;
  }

  render() {
    console.log("Soy edit-client");

    const container = document.createElement("div");
    container.className = "edit-client-container";

    const title = document.createElement("h2");
    title.textContent = "Editar Cliente";
    title.className = "title";

    const form = document.createElement("form");
    form.className = "edit-client-form";
    form.innerHTML = `
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" required><br>
      <label for="apellido">Apellido:</label>
      <input type="text" id="apellido" name="apellido" required><br>
      <label for="dni">DNI:</label>
      <input type="text" id="dni" name="dni" required><br>
      <button type="submit" class="submit-button">Actualizar Cliente</button>
    `;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target as any);

      const clientId = state.getState().clienteId;
      console.log("clientId: ", clientId);

      const updatedClientData = {
        id_cliente: clientId,
        nombre: formData.get("nombre"),
        apellido: formData.get("apellido"),
        dni: formData.get("dni"),
      };
      
      if (!clientId) {
        console.error("No se encontró el ID del cliente en el estado.");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/clientes/editar`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedClientData),
        });

        if (response.ok) {
          console.log("Cliente actualizado exitosamente.");
          Router.go('/clientes'); // Redirigir a la página principal u otra página de tu elección
        } else {
          console.error("Error al actualizar el cliente.");
        }
      } catch (error) {
        console.error("Error al actualizar el cliente:", error);
      }
    });

    this.shadow.appendChild(title);
    this.shadow.appendChild(container);
    this.shadow.appendChild(form);

    const style = document.createElement("style");
    style.textContent = `
      .edit-client-container {
        padding: 30px;
      }

      .title {
        margin-top: 0px;
        padding: 20px;
        background-color: #f4f4f4;
      }

      .edit-client-form label {
        display: block;
        margin-top: 10px;
      }

      .edit-client-form input {
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

customElements.define("edit-client-component", EditClientComponent);
