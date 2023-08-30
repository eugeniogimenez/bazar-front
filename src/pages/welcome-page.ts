import { Router } from "@vaadin/router";

class WelcomePage extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
      .welcome-container {
        display: grid;
        place-items: center;
        height: 100vh;
        background-color: #f4f4f4;
        padding: 20px;
      }

      h1 {
        font-size: 50px;
        margin-bottom: 20px;
        text-align: center;
        padding: 10px;
      }

      p {
        font-size: 40px;
        margin-bottom: 30px;
      }

      .options {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 20px;
        gap: 20px;

      .option-button {
        padding: 10px 20px;
        background-color: #f60;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
      }

      .option-button:hover {
        background-color: #45a049;
      }

    
    `;
    this.shadow.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    console.log("Soy WelcomePage");
    
    const welcomeContainer = document.createElement("div");
    welcomeContainer.classList.add("welcome-container");

    welcomeContainer.innerHTML = `
      <h1>Bienvenido al Sitema de Administración de tu Bazar</h1>
      <p>Elige entre las opciones</p>
      <div class="options">
        <button class="option-button" id="productos-button">Productos</button>
        <button class="option-button" id="clientes-button">Clientes</button>
        <button class="option-button" id="ventas-button">Ventas</button>
      </div>
    `;

    this.shadow.appendChild(welcomeContainer);

    const productosBtn = this.shadow.getElementById(
      "productos-button"
    );
    const clientesButton = this.shadow.getElementById(
      "clientes-button"
    );
    const ventasButton = this.shadow.getElementById(
      "ventas-button"
    );

    productosBtn.addEventListener("click", () => {
      Router.go("/productos");
    });

    clientesButton.addEventListener("click", () => {
      Router.go("/clientes");
    });
    ventasButton.addEventListener("click", () => {
      Router.go("/ventas");
    });
  }
}

customElements.define("welcome-page", WelcomePage);