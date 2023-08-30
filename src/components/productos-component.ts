import { Router } from "@vaadin/router";
import { state } from "../../state";

const API_URL = "http://localhost:8080";

class ProductComponent extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    // Agregar el atributo directamente al componente
    this.setAttribute("current-productos", "productos-component");
  }

  connectedCallback() {
    this.render();
    this.fetchProducts();
  }

  //GET
  async fetchProducts() {
    try {
      const response = await fetch(API_URL + "/productos");
      const products = await response.json();
      this.displayProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  //Muestro los productos
  displayProducts(products) {
    const productsContainer = this.shadow.querySelector(".products-container");
    productsContainer.innerHTML = "";

    const table = document.createElement("table");
    table.className = "product-table";
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
      <th>Código Producto</th>
      <th>Nombre</th>
      <th>Marca</th>
      <th>Costo</th>
      <th>Cantidad Disponible</th>
      <th>Acciones</th>
    `;
    table.appendChild(headerRow);

    products.forEach((product) => {
      const productRow = document.createElement("tr");
      productRow.innerHTML = `
        <td>${product.codigo_producto}</td>
        <td>${product.nombre}</td>
        <td>${product.marca}</td>
        <td>${product.costo}</td>
        <td>${product.cantidad_disponible}</td>
        <td>
          <button class="edit-product" data-product-id="${product.codigo_producto}">Editar</button>
          <button class="delete-product" data-product-id="${product.codigo_producto}">Eliminar</button>
        </td>

      `;

      //Boton Editar
      const editProductBtn = productRow.querySelector(".edit-product");
      editProductBtn.addEventListener("click", () => {
        const productId = editProductBtn.getAttribute("data-product-id");
        state.setProductId(productId); // Establecer el ID del producto en el estado
        Router.go("/edit-product"); // Redirigir a la página de edición
      });

      
      //BORRAR PRODUCTO
      //Boton Eliminar
      const deleteProductBtn = productRow.querySelector(".delete-product");
      deleteProductBtn.addEventListener("click", () => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        
        if (confirmDelete) {
          const productId = deleteProductBtn.getAttribute("data-product-id");
          this.deleteProduct(productId);
        }
      });
      
      

      table.appendChild(productRow);
    });

    productsContainer.appendChild(table);

    
  }

  //ELIMINAR PRODUCTO
  deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/productos/borrar/${productId}`, {
        method: "DELETE"
      });
  
      if (response.ok) {
        console.log("Producto eliminado exitosamente.");
        this.fetchProducts(); // Llamar a fetchProducts de la instancia actual para actualizar la lista
      } else {
        console.error("Error al eliminar el producto.");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }
  //FIN ELIMINAR PRPODUCTO

  render() {
    const container = document.createElement("div");
    container.className = "products-container";

    const title = document.createElement("h2");
    title.textContent = "Productos";
    title.className = "title";

    //Agregar Producto
    const agregarProductoBtn = document.createElement("button");
    agregarProductoBtn.textContent = "Agregar Producto";
    agregarProductoBtn.className = "add-product-button";
    agregarProductoBtn.addEventListener("click", () => {
      Router.go('/add-product');
      
    });

    this.shadow.appendChild(title);
    this.shadow.appendChild(container);
    this.shadow.appendChild(agregarProductoBtn)

    const style = document.createElement("style");
    style.textContent = `
      .products-container {
        height: 70%;
        overflow-y: auto;
        padding: 20px;
      }

      .product-table {
        width: 100%;
        border-collapse: collapse;
      }

      .product-table th, .product-table td {
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

      .add-product-button {
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

customElements.define("productos-component", ProductComponent);



