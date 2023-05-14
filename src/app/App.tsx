import React from "react"
import "../App.css"
import { Route, Routes } from "react-router-dom"
import { Chat } from "../components/Chat/Chat"
import { Login } from "../components/Login/Login"
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar"

function App() {
    return (
        <div className="App">
            <ErrorSnackbar />
            <Routes>
                <Route path={"/"} element={<Chat />} />
                <Route path={"/login"} element={<Login />} />
            </Routes>
        </div>
    )
}

export default App
