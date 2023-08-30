const state = {
    data: {
      // DATA DEL STATE INICIAL
      productId: null,
      clienteId: null,
      ventaId: null,
    },
  
    listeners: [],
  
    ///////// BASIC STATE METHODS //////////
  
    //GETTER
    getState() {
      return this.data;
    },
  
    //SETTER
    setState(newState) {
      this.data = newState;
      console.log("El nuevo estado es:", newState);
      for (const callback of this.listeners) {
        callback();
      }
      sessionStorage.setItem("actualgame", JSON.stringify(newState));
    },
  
    //SUBSCRIBER
    subscribe(callback: (any) => any) {
      this.listeners.push(callback);
    },
  
    // SETEA EL PRODUCTID
    setProductId(productId) {
      const currentState = this.getState();
      currentState.productId = productId;
      this.setState(currentState);
    },

    // SETEA EL ClienteID
    setClienteId(clienteId) {
      const currentState = this.getState();
      currentState.clienteId = clienteId;
      this.setState(currentState);
    },

    // SETEA EL VentaID
    setVentaId(ventaId) {
      const currentState = this.getState();
      currentState.ventaId = ventaId;
      this.setState(currentState);
    },

}

export { state };