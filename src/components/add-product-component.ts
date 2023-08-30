import { Router } from "@vaadin/router";

const API_URL = "http://localhost:8080";

class AddProductComponent extends HTMLElement {
    shadow: ShadowRoot;
  
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      console.log("Soy add-product");
      
      const container = document.createElement("div");
      container.className = "add-product-container";
  
      const title = document.createElement("h2");
      title.textContent = "Agregar Nuevo Producto";
      title.className = "title";
  
      const form = document.createElement("form");
      form.className = "add-product-form";
      form.innerHTML = `
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" required><br>
      <label for="marca">Marca:</label>
      <input type="text" id="marca" name="marca" required><br>
      <label for="costo">Costo:</label>
      <input type="number" id="costo" name="costo" step="0.01" required><br>
      <label for="cantidad_disponible">Cantidad Disponible:</label>
      <input type="number" id="cantidad_disponible" name="cantidad_disponible" required><br>
      <button type="submit" class="submit-button">Crear Producto</button>
      `;
  
      form.addEventListener("submit", async (event) => {
          const formData= new FormData(event.target as any);
  
        
        const productData = {
          nombre: formData.get("nombre"),
          marca: formData.get("marca"),
          costo: formData.get("costo"),
          cantidad_disponible: formData.get("cantidad_disponible"),
        };
  
        try {
          const response = await fetch(`${API_URL}/productos/crear`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
          });
  
          if (response.ok) {
            console.log("Producto creado exitosamente.");
            Router.go('/'); // Redirigir a la lista de productos
          } else {
            console.error("Error al crear el producto.");
          }
        } catch (error) {
          console.error("Error al crear el producto:", error);
        }
      });
  
      this.shadow.appendChild(title);
      this.shadow.appendChild(container);
      this.shadow.appendChild(form);
  
      const style = document.createElement("style");
      style.textContent = `
        .add-product-container {
          padding: 30px;
        }
  
        .title {
          margin-top: 0px;
          padding: 20px;
          background-color: #f4f4f4;
        }
  
        .add-product-form label {
          display: block;
          margin-top: 10px;
        }
  
        .add-product-form input {
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
  
  customElements.define("add-product-component", AddProductComponent);