import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./app/App"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import { persistor, store } from "./app/store"
import { HashRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <HashRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </HashRouter>
)

reportWebVitals()
