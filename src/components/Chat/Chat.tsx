import React from "react"
import { AddChat } from "../AddChat/AddChat"
import { useSelector } from "react-redux"
import { selectApp } from "../../app/app.select"
import { Navigate } from "react-router-dom"
import { ChatList } from "./ChatList/ChatList"

export const Chat = () => {
    const { isLoggedIn } = useSelector(selectApp)
    const { chatId } = useSelector(selectApp)

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return (
        <div style={{ display: "flex" }}>
            <AddChat />
            {chatId !== "" && <ChatList />}
        </div>
    )
}
