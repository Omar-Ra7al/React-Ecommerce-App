import ReactDOM from "react-dom/client";
import App from "./App";
import { StrictMode } from "react";
// Redux
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
