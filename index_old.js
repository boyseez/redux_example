import { createStore } from "https://unpkg.com/redux@4.0.5/es/redux.mjs";

const ATTIVAZIONE_REDUX_DEV_TOOL =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//NAME COSTANTS------------------------
const BUTTON_CLICKED = "BUTTON_CLICKED";
const MODAL_CLOSED = "MODAL_CLOSED";
//------------------------------------

//ACTION CREATORS---------------
function buttonCLicked(payload) {
  return {
    type: BUTTON_CLICKED,
    payload,
  };
}

function modalClosed() {
  return {
    type: MODAL_CLOSED,
  };
}
//-----------------------------------

//Stato iniziale
const initialState = {
  buttonCLicked: `no`,
  modalClosed: `no`,
};

//rootReducer
function rootReducer(state = initialState, action) {
  //Se non ci sono modifiche allo stato ritornale lo stato iniziale all'esterno
  switch (action.type) {
    case BUTTON_CLICKED: {
      //cambia stato
      // NON CORRETTO!! FIXME!!
      //cosi rompe límmutabilita di redux e non funziona il timeTravel( macchina del tempo)
      //state.buttonCLicked = "yes"; soluzione Object.assign

      return Object.assign({}, initialState, { buttonCLicked: `yes` });
    }
    case MODAL_CLOSED: {
      //cambia stato
      //state.modalClosed = "yes";
      //oppure con lo spred
      return { ...initialState, modalClosed: `yes` };
    }
    default:
      return state;
  }
}

//store
const store = createStore(rootReducer, ATTIVAZIONE_REDUX_DEV_TOOL);

//UI
const button = document.getElementsByTagName("button")[0];
button.addEventListener("click", function (event) {
  //manda messaggio sullo store
  store.dispatch(buttonCLicked(event)); //payload dati attaccati
});

const buttonModal = document.getElementById("button_modal");
buttonModal.addEventListener("click", function () {
  store.dispatch(modalClosed());
});

//notifica quando c'e'cambio di stato
store.subscribe(function () {
  //viene lanciato ogni volta che c'e' un cambio di stato
  //quindi conviene controllare le azioni dello state

  if (store.getState().buttonCLicked === "yes") {
    const messaggio = document.getElementById("mex");
    messaggio.style.display = "block";
  }
});

store.subscribe(function () {
  if (store.getState().modalClosed === "yes") {
    const messaggio = document.getElementById("mex");
    messaggio.style.display = "none";
  }
});
