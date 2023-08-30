//pages
import "./src/pages/welcome-page";
import "./src/pages/productos-page";
import "./src/pages/add-product-page";
import "./src/pages/edit-product-page";
import "./src/pages/clientes-page";
import "./src/pages/add-cliente-page";
import "./src/pages/edit-cliente-page";
import "./src/pages/ventas-page";
import "./src/pages/add-venta-page";
import "./src/pages/edit-venta-page";

//components
import "./src/components/header-component";
import "./src/components/productos-component";
import "./src/components/footer-component";
import "./src/components/add-product-component";
import "./src/components/edit-product-component";
import "./src/components/cliente-component"
import "./src/components/add-cliente-component"
import "./src/components/edit-cliente-component"
import "./src/components/ventas-component"
import "./src/components/add-venta-component"
import "./src/components/edit-venta-component"

//router
import "./router";
import { configureRouter } from "./router";

//state
import "./state"

(function () {
    console.log("soy main");
    
  configureRouter();
})();