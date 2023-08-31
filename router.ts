import { Router } from "@vaadin/router";

export function configureRouter() {
  const router = new Router(document.getElementById("root"));

  router.setRoutes([
    //URL y page
    { path: "/", component: "welcome-page" },
    { path: "/welcome", component: "welcome-page" },
    { path: "/productos", component: "productos-page" },
    { path: "/add-product", component: "add-product-page" },
    { path: "/edit-product", component: "edit-product-page" },
    { path: "/clientes", component: "clientes-page" },
    { path: "/add-client", component: "add-cliente-page" },
    { path: "/edit-client", component: "edit-cliente-page" },
    { path: "/ventas", component: "ventas-page" },
    { path: "/add-venta", component: "add-venta-page" },
    { path: "/edit-venta", component: "edit-venta-page" },
    { path: "(.*)", redirect: "/welcome" },
  ]);
}