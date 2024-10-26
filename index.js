import {
  createStore,
  applyMiddleware,
  compose,
} from "https://unpkg.com/redux@4.0.5/es/redux.mjs";

// Constants
const FORM_SENT = "FORM_SENT";
const BAD_WORD = "BAD_WORD";

// Actions
function formSent(payload) {
  return {
    type: FORM_SENT,
    payload,
  };
}

function badWord() {
  return {
    type: BAD_WORD,
  };
}

const initialState = {
  formSent: "no",
  badWord: "no",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case FORM_SENT: {
      return { ...state, formSent: "yes" };
    }
    case BAD_WORD: {
      return { ...state, badWord: "yes" };
    }
    default:
      return state;
  }
}

function noN_WordMiddleware({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      if (action.type === FORM_SENT) {
        if (action.payload.includes("n")) {
          dispatch(badWord());
        }
      }
      return next(action);
    };
  };
}

function loggerMiddleWEARE() {
  return function (next) {
    return function (action) {
      console.log("Mid Log:", action);
      return next(action);
    };
  };
}

// Store setup with middleware and DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(noN_WordMiddleware, loggerMiddleWEARE))
);

// Form handling
const form = document.forms[0];
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const data = new FormData(this);
  const payload = data.get("word");
  store.dispatch(formSent(payload));
});

// Subscribe to store changes - FIXED VERSION
let previousBadWordState = store.getState().badWord;

store.subscribe(function () {
  const currentState = store.getState();
  if (currentState.badWord === "yes" && previousBadWordState === "no") {
    const h3 = document.createElement("h3");
    h3.innerText = "La tua parola ha la lettere N!";
    document.body.appendChild(h3);
  }
  previousBadWordState = currentState.badWord;
});
