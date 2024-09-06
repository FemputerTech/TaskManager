import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faNoteSticky,
  faAnglesLeft,
  faAnglesRight,
  faPlus,
  faListUl,
  faPenToSquare,
  faStar as faStarSolid,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as faStarRegular,
  faFile,
} from "@fortawesome/free-regular-svg-icons";

library.add(
  faNoteSticky,
  faAnglesLeft,
  faAnglesRight,
  faPlus,
  faListUl,
  faPenToSquare,
  faStarSolid,
  faStarRegular,
  faTrashCan,
  faFile
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
