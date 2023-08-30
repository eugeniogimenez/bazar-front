class EditVentaPage extends HTMLElement {
    shadow: ShadowRoot;
    
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    
    connectedCallback() {
      this.render();
    }
    
    render() {
      console.log("Hola, soy edit-venta-page");
          
      const style = document.createElement("style");
      style.textContent = `
        .header {
          grid-area: header;
        }
  
        .ventas {
          grid-area: ventas;
          display: flex;
          flex-direction: column;
          padding: 30px;
        }
  
        .footer {
          grid-area: footer;
        }
  
        div.ventas-page {
          height: 100vh;
          display: grid;
          grid-template-rows: 10% 70% 20%;
          grid-template-columns: 100%;
  
          grid-template-areas: 
            "header"
            "ventas"
            "footer";
        }
      `;
      this.shadow.appendChild(style);
    
      const div = document.createElement("div");
      div.className = "edit-venta-page";
      div.innerHTML = `
        <header-component class="header"></header-component>
        <edit-venta-component class="ventas"></edit-venta-component>
        <footer-component class="footer"></footer-component>
      `;
      this.shadow.appendChild(style);
      this.shadow.appendChild(div);
    }
  }
  
  customElements.define("edit-venta-page", EditVentaPage);
  