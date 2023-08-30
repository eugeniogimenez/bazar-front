import { Router } from "@vaadin/router";
import { state } from "../../state";

const API_URL = "http://localhost:8080";

class VentasComponent extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    // Agregar el atributo directamente al componente
    this.setAttribute("current-ventas", "ventas-component");
  }

  connectedCallback() {
    this.render();
    this.fetchVentas();
  }

  async fetchVentas() {
    try {
      const response = await fetch(API_URL + "/ventas");
      const ventas = await response.json();
      this.displayVentas(ventas);
    } catch (error) {
      console.error("Error fetching ventas:", error);
    }
  }

  displayVentas(ventas) {
    const ventasContainer = this.shadow.querySelector(".ventas-container");
    ventasContainer.innerHTML = "";

    const table = document.createElement("table");
    table.className = "ventas-table";
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
      <th>ID Venta</th>
      <th>Fecha</th>
      <th>Costo Total</th>
      <th>Lista Productos</th>
      <th>Cliente</th>
      <th>Acciones</th>
    `;
    table.appendChild(headerRow);

    ventas.forEach((venta) => {
      const ventaRow = document.createElement("tr");

      // Crear una cadena con los IDs de los productos separados por comas
      const listaProductosIds = venta.listaProductos.map(producto => producto.codigo_producto).join(", ");


      ventaRow.innerHTML = `
        <td>${venta.codigo_venta}</td>
        <td>${venta.fecha_venta}</td>
        <td>${venta.total}</td>
        <td>${listaProductosIds}</td>
        <td>${venta.unCliente.id_cliente}</td>
        <td>
          <button class="edit-venta" data-venta-id="${venta.codigo_venta}">Editar</button>
          <button class="delete-venta" data-venta-id="${venta.codigo_venta}">Eliminar</button>
        </td>
      `;

      //Boton Editar
      const editVentaBtn = ventaRow.querySelector(".edit-venta");
      editVentaBtn.addEventListener("click", () => {
        const ventaId = editVentaBtn.getAttribute("data-venta-id");
        state.setVentaId(ventaId); // Establecer el ID de la venta en el estado
        Router.go("/edit-venta"); // Redirigir a la página de edición de ventas
      });

      //Boton Eliminar
      const deleteVentaBtn = ventaRow.querySelector(".delete-venta");
      deleteVentaBtn.addEventListener("click", () => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta venta?");
        if (confirmDelete) {
          const ventaId = deleteVentaBtn.getAttribute("data-venta-id");
          this.deleteVenta(ventaId);
        }
      });

      table.appendChild(ventaRow);
    });

    ventasContainer.appendChild(table);
  }

  deleteVenta = async (ventaId) => {
    try {
      const response = await fetch(`${API_URL}/ventas/eliminar/${ventaId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        console.log("Venta eliminada exitosamente.");
        this.fetchVentas();
      } else {
        console.error("Error al eliminar la venta.");
      }
    } catch (error) {
      console.error("Error al eliminar la venta:", error);
    }
  }

  render() {
    const container = document.createElement("div");
    container.className = "ventas-container";

    const title = document.createElement("h2");
    title.textContent = "Ventas";
    title.className = "title";

    // Agregar Venta
    const agregarVentaBtn = document.createElement("button");
    agregarVentaBtn.textContent = "Agregar Venta";
    agregarVentaBtn.className = "add-venta-button";
    agregarVentaBtn.addEventListener("click", () => {
      Router.go('/add-venta');
    });

    this.shadow.appendChild(title);
    this.shadow.appendChild(container);
    this.shadow.appendChild(agregarVentaBtn);

    const style = document.createElement("style");
    style.textContent = `
      .ventas-container {
        height: 70%;
        overflow-y: auto;
        padding: 20px;
      }

      .ventas-table {
        width: 100%;
        border-collapse: collapse;
      }

      .ventas-table th, .ventas-table td {
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

      .add-venta-button {
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

customElements.define("ventas-component", VentasComponent);
