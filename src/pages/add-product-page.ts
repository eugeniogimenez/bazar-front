class AddProductPage extends HTMLElement {
    shadow: ShadowRoot;
  
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
        console.log("Hola, soy add-product");
        
      const style = document.createElement("style");
      style.textContent = `
      
        
        .header {
          grid-area: header;
        }
  
        .productos {
          grid-area: productos;
          display: flex;
          flex-direction: column;
          padding: 30px;
        }
  
        .footer {
          grid-area: footer;
        }
  
        div.productos-page {
          height: 100vh;
          display: grid;
          grid-template-rows: 10% 70% 20%;
          grid-template-columns: 100%;
  
          grid-template-areas: 
            "header"
            "productos"
            "footer";
        }
  
        
      `;
      this.shadow.appendChild(style);
  
      const div = document.createElement("div");
      div.className = "add-product-page";
      div.innerHTML = `
      
      <header-component class="header"></header-component>
      <add-product-component class="productos"></add-product-component>
      <footer-component class="footer"></footer-component>
  
  
        
      `;
      this.shadow.appendChild(style);
      this.shadow.appendChild(div);
    }
  }
  
  customElements.define("add-product-page", AddProductPage);
  