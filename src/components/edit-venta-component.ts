import { Router } from "@vaadin/router";
import { state } from "../../state"; // Asegúrate de importar el estado correctamente

const API_URL = "https://bazar-back-dsou.onrender.com";

class EditVentaComponent extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.fetchVenta();
  }

  async fetchVenta() {
    const ventaId = state.getState().ventaId;
    console.log("ventaId: ", ventaId);

    if (!ventaId) {
      console.error("No se encontró el ID de la venta en el estado.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/ventas/${ventaId}`);
      const venta = await response.json();
      this.populateForm(venta);
    } catch (error) {
      console.error("Error fetching venta:", error);
    }
  }

  populateForm(venta) {
    const form = this.shadow.querySelector(".edit-venta-form");
    form["fecha"].value = venta.fecha_venta;
    form["total"].value = venta.total;
    form["productos"].value = venta.listaProductos.map(p => p.codigo_producto).join(",");
    form["cliente"].value = venta.unCliente.id_cliente;
  }

  render() {
    console.log("Soy edit-venta");

    const container = document.createElement("div");
    container.className = "edit-venta-container";

    const title = document.createElement("h2");
    title.textContent = "Editar Venta";
    title.className = "title";

    const form = document.createElement("form");
    form.className = "edit-venta-form";
    form.innerHTML = `
      <label for="fecha">Fecha:</label>
      <input type="date" id="fecha" name="fecha" required><br>
      <label for="total">Total:</label>
      <input type="number" id="total" name="total" step="0.01" required><br>
      <label for="productos">Lista de Productos (IDs separados por comas):</label>
      <input type="text" id="productos" name="productos" required><br>
      <label for="cliente">Cliente ID:</label>
      <input type="number" id="cliente" name="cliente" required><br>
      <button type="submit" class="submit-button">Actualizar Venta</button>
    `;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target as any);

      const ventaId = state.getState().ventaId;
      console.log("ventaId: ", ventaId);

      const listaProductosStr = formData.get("productos") as string;
      const listaProductos = listaProductosStr.split(",").map(id => ({ codigo_producto: parseInt(id.trim()) }));

      const updatedVentaData = {
        codigo_venta: ventaId,
        fecha_venta: formData.get("fecha"),
        total: formData.get("total"),
        listaProductos: listaProductos,
        unCliente: {
          id_cliente: formData.get("cliente")
        }
      };

      if (!ventaId) {
        console.error("No se encontró el ID de la venta en el estado.");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/ventas/editar`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedVentaData),
        });

        if (response.ok) {
          console.log("Venta actualizada exitosamente.");
          Router.go('/ventas'); // Redirigir a la página de ventas u otra página de tu elección
        } else {
          console.error("Error al actualizar la venta.");
        }
      } catch (error) {
        console.error("Error al actualizar la venta:", error);
      }
    });

    this.shadow.appendChild(title);
    this.shadow.appendChild(container);
    this.shadow.appendChild(form);

    const style = document.createElement("style");
    style.textContent = `
      .edit-venta-container {
        padding: 30px;
      }

      .title {
        margin-top: 0px;
        padding: 20px;
        background-color: #f4f4f4;
      }

      .edit-venta-form label {
        display: block;
        margin-top: 10px;
      }

      .edit-venta-form input {
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

customElements.define("edit-venta-component", EditVentaComponent);
