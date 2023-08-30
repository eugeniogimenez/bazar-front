import { Router } from "@vaadin/router";
import { state } from "../../state";

const API_URL = "http://localhost:8080";

class EditProductComponent extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const productId = state.getState().productId;
    console.log("productId: ", productId);
    

    try {
      const response = await fetch(`${API_URL}/productos/${productId}`);
      const productData = await response.json();

      const container = document.createElement("div");
      container.className = "edit-product-container";

      const title = document.createElement("h2");
      title.textContent = "Editar Producto";
      title.className = "title";

      const form = document.createElement("form");
      form.className = "edit-product-form";
      form.innerHTML = `
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value="${productData.nombre}" required><br>
        <label for="marca">Marca:</label>
        <input type="text" id="marca" name="marca" value="${productData.marca}" required><br>
        <label for="costo">Costo:</label>
        <input type="number" id="costo" name="costo" step="0.01" value="${productData.costo}" required><br>
        <label for="cantidad_disponible">Cantidad Disponible:</label>
        <input type="number" id="cantidad_disponible" name="cantidad_disponible" value="${productData.cantidad_disponible}" required><br>
        <button type="submit" class="submit-button">Guardar Cambios</button>
      `;

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target as any);

        const updatedProductData = {
          codigo_producto: productId,
          nombre: formData.get("nombre"),
          marca: formData.get("marca"),
          costo: formData.get("costo"),
          cantidad_disponible: formData.get("cantidad_disponible"),
        };

        try {
          const response = await fetch(`${API_URL}/productos/editar`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProductData),
          });

          if (response.ok) {
            console.log("Producto editado exitosamente.");
            Router.go('/'); // Redirigir a la lista de productos
          } else {
            console.error("Error al editar el producto.");
          }
        } catch (error) {
          console.error("Error al editar el producto:", error);
        }
      });

      this.shadow.appendChild(title);
      this.shadow.appendChild(container);
      this.shadow.appendChild(form);

      const style = document.createElement("style");
      style.textContent = `
        .edit-product-container {
          padding: 30px;
        }

        .title {
          margin-top: 0px;
          padding: 20px;
          background-color: #f4f4f4;
        }

        .edit-product-form label {
          display: block;
          margin-top: 10px;
        }

        .edit-product-form input {
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
    } catch (error) {
      console.error("Error al obtener los datos del producto:", error);
    }
  }
}

customElements.define("edit-product-component", EditProductComponent);
