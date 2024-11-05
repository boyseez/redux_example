import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLinks,
  selectData,
  selectLoading,
  selectError,
} from "./LinksSlice";

function Links() {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchLinks("https://jsonplaceholder.typicode.com/todos"));
  }, [dispatch]);

  return (
    <div>
      {loading === "yes" && <p>Caricamento in corso...</p>}
      {error && <p>Errore: {error}</p>}
      <ul>
        {data.map((element) => (
          <li key={element.id}>{element.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Links;
