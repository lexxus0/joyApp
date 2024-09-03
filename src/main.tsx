import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
