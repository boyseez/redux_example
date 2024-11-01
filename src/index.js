import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk"; // Importa redux-thunk

const FETCH_ARTICLES = "FETCH_ARTICLES";
const HAS_FETCHED = "HAS_FETCHED";
const IS_FETCHING = "IS_FETCHING";
const ERROR_FETCHING = "ERROR_FETCHING";

const articleState = {
  isFetching: "",
  error: "",
  data: [],
};

function articleReducer(state = articleState, action) {
  switch (action.type) {
    case IS_FETCHING:
      return {
        ...state,
        isFetching: "YES",
      };
    case HAS_FETCHED:
      return {
        ...state,
        isFetching: "NO",
        data: state.data.concat(action.payload),
      };
    case ERROR_FETCHING:
      return {
        ...state,
        isFetching: "NO",
        error: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  articles: articleReducer,
});

function loggerMiddleware(store) {
  return function (next) {
    return function (action) {
      console.log(action);
      return next(action);
    };
  };
}

// Funzione per fetchare gli articoli
function fetchArticles() {
  return function (dispatch) {
    dispatch({ type: IS_FETCHING });
    return fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .then((json) => dispatch({ type: HAS_FETCHED, payload: json }))
      .catch((error) =>
        dispatch({ type: ERROR_FETCHING, payload: error.message })
      );
  };
}

// Configurazione di composeEnhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Assicurati che middleWware sia un array di funzioni
const middleWware = [thunk, loggerMiddleware];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWware))
);

// Aggiungi l'event listener per il bottone
const clickedButton = document.getElementById("fetc-btn");
clickedButton.addEventListener("click", function () {
  store.dispatch(fetchArticles());
});

store.subscribe(function () {
  console.log("Stato", store.getState());
});
