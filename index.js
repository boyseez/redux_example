import { createStore } from "https://unpkg.com/redux@4.0.5/es/redux.mjs";

//Stato iniziale
const initialState = {
  buttonCLicked: `no`,
};

//rootReducer
function rootReducer(state = initialState, action) {
  /* if (action.type === "BUTTON_CLICKED") {
    //cambia lo stato
    buttonCLicked = "yes";
  
  }
  if (action.type === "AZIONE2") {
  }
  deve sempre ritornare lo stato iniziale
  return state;*/
  //...

  //Se non ci sono modifiche allo stato ritornale lo stato iniziale all'esterno
  switch (action.type) {
    case "BUTTON_CLICKED": {
      //cambia stato
      // NON CORRETTO!! FIXME!!
      if (state.buttonCLicked === "yes") {
        state.buttonCLicked = "no";
      } else {
        state.buttonCLicked = "yes";
      }
      return state;
    }
    case "AZIONE2": {
      //cambia stato
      return state;
    }
    default:
      return state;
  }
}

//store
const store = createStore(rootReducer);

//UI
const button = document.getElementsByTagName("button")[0];
button.addEventListener("click", function () {
  //manda messaggio
  store.dispatch({ type: "BUTTON_CLICKED" });
});

//notifica quando c'e'cambio di stato
store.subscribe(function () {
  //viene lanciato ogni volta che c'e' un cambio di stato
  //quindi conviene controllare le azioni dello state
  if (store.getState().buttonCLicked === "yes") {
    const messaggio = document.getElementById("mex");
    messaggio.style.display = "block";
  }
  if (store.getState().buttonCLicked === "no") {
    const messaggio = document.getElementById("mex");
    messaggio.style.display = "none";
  }
});
