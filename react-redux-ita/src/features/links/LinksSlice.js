import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLinks = createAsyncThunk("links/getLinks", (endPoint) => {
  return fetch(endPoint)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((json) => json);
});

const linksSlice = createSlice({
  name: "Links",
  initialState: {
    loading: "",
    error: "",
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchLinks.pending]: (state) => {
      //stato iniziale =pending
      state.loading = "yes";
    },
    [fetchLinks.rejected]: (state, action) => {
      //quando c'e' una promise rejected =rejected
      state.loading = "no";
      state.error = action.error.message; //action.error.meessage lo da create asyncthunk
    },
    [fetchLinks.fulfilled]: (state, action) => {
      //successo
      state.loading = "no";
      state.data = action.payload; //lo da create asyncthunk
    },
  },
});

/*
function _fetchLinks() {
  return function (dispatch) {
    dispatch({ type: "START" });
    return fetch("")
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .then((json) =>
        dispatch({
          type: "SUCCESS",
          payload: json,
        })
      )
      .catch((err) =>
        dispatch({
          type: "FAULURE",
          payload: err.meessage,
        })
      );
  };
}*/
export const linksReducer = linksSlice.reducer;
// Selettori per accedere a loading ed error
export const selectLoading = (state) => state.links.loading;
export const selectError = (state) => state.links.error;
export const selectData = (state) => state.links.data;
