class EditClientPage extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        console.log("Hola, soy edit-client");

        const style = document.createElement("style");
        style.textContent = `
            .header {
                grid-area: header;
            }

            .clientes {
                grid-area: clientes;
                display: flex;
                flex-direction: column;
                padding: 30px;
            }

            .footer {
                grid-area: footer;
            }

            div.clientes-page {
                height: 100vh;
                display: grid;
                grid-template-rows: 10% 70% 20%;
                grid-template-columns: 100%;

                grid-template-areas: 
                    "header"
                    "clientes"
                    "footer";
            }
        `;
        this.shadow.appendChild(style);

        const div = document.createElement("div");
        div.className = "edit-client-page";
        div.innerHTML = `
            <header-component class="header"></header-component>
            <edit-client-component class="clientes"></edit-client-component>
            <footer-component class="footer"></footer-component>
        `;
        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
    }
}

customElements.define("edit-cliente-page", EditClientPage);
