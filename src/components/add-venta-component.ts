import { Router } from "@vaadin/router";

const API_URL = "http://localhost:8080";

class AddVentaComponent extends HTMLElement {
    shadow: ShadowRoot;
  
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      console.log("Soy add-venta");
      
      const container = document.createElement("div");
      container.className = "add-venta-container";
  
      const title = document.createElement("h2");
      title.textContent = "Agregar Nueva Venta";
      title.className = "title";
  
      const form = document.createElement("form");
      form.className = "add-venta-form";
      form.innerHTML = `
      <label for="fecha">Fecha:</label>
      <input type="date" id="fecha" name="fecha" required><br>
      <label for="total">Total:</label>
      <input type="number" id="total" name="total" step="0.01" required><br>
      <label for="productos">Lista de Productos (IDs separados por comas):</label>
      <input type="text" id="productos" name="productos" required><br>
      <label for="cliente">Cliente ID:</label>
      <input type="number" id="cliente" name="cliente" required><br>
      <button type="submit" class="submit-button">Crear Venta</button>
      `;
  
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target as any);
  
        const listaProductosStr = formData.get("productos") as string;
        const listaProductos = listaProductosStr.split(",").map(id => ({ codigo_producto: parseInt(id.trim()) }));
        
        const ventaData = {
          fecha_venta: formData.get("fecha"),
          total: formData.get("total"),
          listaProductos: listaProductos,
          unCliente: {
            id_cliente: formData.get("cliente")
          }
        };
  
        try {
          const response = await fetch(`${API_URL}/ventas/crear`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(ventaData),
          });
  
          if (response.ok) {
            console.log("Venta creada exitosamente.");
            Router.go('/ventas'); // Redirigir a la lista de ventas
          } else {
            console.error("Error al crear la venta.");
          }
        } catch (error) {
          console.error("Error al crear la venta:", error);
        }
      });
  
      this.shadow.appendChild(title);
      this.shadow.appendChild(container);
      this.shadow.appendChild(form);
  
      const style = document.createElement("style");
      style.textContent = `
        .add-venta-container {
          padding: 30px;
        }
  
        .title {
          margin-top: 0px;
          padding: 20px;
          background-color: #f4f4f4;
        }
  
        .add-venta-form label {
          display: block;
          margin-top: 10px;
        }
  
        .add-venta-form input {
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
  
  customElements.define("add-venta-component", AddVentaComponent);
