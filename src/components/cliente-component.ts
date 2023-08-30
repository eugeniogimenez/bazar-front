import { Router } from "@vaadin/router";
import { state } from "../../state";

const API_URL = "http://localhost:8080";

class ClientsComponent extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    // Agregar el atributo directamente al componente
    this.setAttribute("current-clientes", "clientes-component");
  }

  connectedCallback() {
    this.render();
    this.fetchClients();
  }

  // GET
  async fetchClients() {
    try {
      const response = await fetch(API_URL + "/clientes");
      const clients = await response.json();
      this.displayClients(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }

  // Muestro los clientes
  displayClients(clients) {
    const clientsContainer = this.shadow.querySelector(".clients-container");
    clientsContainer.innerHTML = "";

    const table = document.createElement("table");
    table.className = "client-table";
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
      <th>Código Cliente</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>dni</th>
      <th>Acciones</th>
    `;
    table.appendChild(headerRow);

    clients.forEach((client) => {
      const clientRow = document.createElement("tr");
      clientRow.innerHTML = `
        <td>${client.id_cliente}</td>
        <td>${client.nombre}</td>
        <td>${client.apellido}</td>
        <td>${client.dni}</td>
        <td>
          <button class="edit-client" data-client-id="${client.id_cliente}">Editar</button>
          <button class="delete-client" data-client-id="${client.id_cliente}">Eliminar</button>
        </td>
      `;

      // Boton Editar
      const editClientBtn = clientRow.querySelector(".edit-client");
      editClientBtn.addEventListener("click", () => {
        const clientId = editClientBtn.getAttribute("data-client-id");
        state.setClienteId(clientId); // Establecer el ID del cliente en el estado
        Router.go("/edit-client"); // Redirigir a la página de edición de cliente
      });

      // Boton Eliminar
      const deleteClientBtn = clientRow.querySelector(".delete-client");
      deleteClientBtn.addEventListener("click", () => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
        if (confirmDelete) {
          const clientId = deleteClientBtn.getAttribute("data-client-id");
          this.deleteClient(clientId);
        }
      });

      table.appendChild(clientRow);
    });

    clientsContainer.appendChild(table);
  }

  // ELIMINAR CLIENTE
  deleteClient = async (clientId) => {
    try {
      const response = await fetch(`${API_URL}/clientes/borrar/${clientId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Cliente eliminado exitosamente.");
        this.fetchClients(); // Llamar a fetchClients de la instancia actual para actualizar la lista
      } else {
        console.error("Error al eliminar el cliente.");
      }
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  };

  // FIN ELIMINAR CLIENTE

  render() {
    const container = document.createElement("div");
    container.className = "clients-container";

    const title = document.createElement("h2");
    title.textContent = "Clientes";
    title.className = "title";

    // Agregar Cliente
    const agregarClienteBtn = document.createElement("button");
    agregarClienteBtn.textContent = "Agregar Cliente";
    agregarClienteBtn.className = "add-client-button";
    agregarClienteBtn.addEventListener("click", () => {
      Router.go("/add-client");
    });

    this.shadow.appendChild(title);
    this.shadow.appendChild(container);
    this.shadow.appendChild(agregarClienteBtn);

    const style = document.createElement("style");
    style.textContent = `
      .clients-container {
        height: 70%;
        overflow-y: auto;
        padding: 20px;
      }

      .client-table {
        width: 100%;
        border-collapse: collapse;
      }

      .client-table th,
      .client-table td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: center;
      }

      .title {
        margin-top: 0px;
        height: 5%;
        padding: 20px;
        background-color: #f4f4f4;
      }

      .add-client-button {
        height: 15%;
        display: block;
        margin-top: 20px;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
      }
    `;
    this.shadow.appendChild(style);
  }
}

customElements.define("clientes-component", ClientsComponent);
