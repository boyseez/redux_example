import { getApi } from "./getAPi";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const articleState = {
  isFetching: false,
  error: null,
  data: [],
};

const articlesSlice = createSlice({
  name: "article",
  initialState: articleState,
  reducers: {
    fetchStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
    },
    fetchError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

const { fetchStart, fetchSuccess, fetchError } = articlesSlice.actions;
const linkReducer = articlesSlice.reducer;

function apiMiddleware({ dispatch }) {
  return (next) => (action) => {
    if (action.type === fetchStart.toString()) {
      getApi()
        .then((json) => dispatch(fetchSuccess(json)))
        .catch((error) => dispatch(fetchError(error.toString())));
    }
    return next(action);
  };
}

function loggerMiddleware(store) {
  return (next) => (action) => {
    console.log("Dispatching action:", action);
    return next(action);
  };
}

const middleWware = [apiMiddleware, loggerMiddleware];

const store = configureStore({
  reducer: {
    links: linkReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleWware),
});

// Add event listener for the button
const clickedButton = document.getElementById("fetc-btn");
if (clickedButton) {
  clickedButton.addEventListener("click", () => {
    store.dispatch(fetchStart());
  });
}

store.subscribe(() => {
  console.log("State updated:", store.getState());
});
