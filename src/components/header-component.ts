import { Router } from "@vaadin/router";

class HeaderComponent extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        :host {
          color: white;
          background-color: #f60;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 20px;
        }
        
        .menu {
          display: flex;
          gap: 20px;
        }

        .menu-option {
          cursor: pointer;
        }

       
      </style>

      <div class="menu">
        <div class="menu-option" id="bienvenida">Bienvenida</div>
        <div class="menu-option" id="clientes">Clientes</div>
        <div class="menu-option" id="productos">Productos</div>
        <div class="menu-option" id="ventas">Ventas</div>
      </div>
    `;

    const clientesOption =
      this.shadow.querySelector("#clientes");

    const productosOption = this.shadow.querySelector("#productos");

    const bienvenidaOption = this.shadow.querySelector("#bienvenida");

    const ventasOption = this.shadow.querySelector("#ventas");

    clientesOption.addEventListener("click", () => {
      Router.go("/clientes");
    });

    productosOption.addEventListener("click", () => {
      Router.go("/productos");
    });

    ventasOption.addEventListener("click", () => {
      Router.go("/ventas");
    });

    bienvenidaOption.addEventListener("click", () => {
      Router.go("/welcome");
    });
  }
}

customElements.define("header-component", HeaderComponent);