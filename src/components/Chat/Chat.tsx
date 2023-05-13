import React, {ChangeEvent, useEffect, useState} from 'react';
import {AddChat} from "../Login/AddChat";
import {useSelector} from "react-redux";
import {selectApp} from "../../app/app.select";
import {Navigate} from "react-router-dom";
import {useActions} from "../../hooks/useActions";
import {appThunks} from "../../app/app.slice";

export const Chat = () => {
    const {sendMessage, receiveNotification} = useActions(appThunks)
    const {isLoggedIn} = useSelector(selectApp)
    const [message, setMessage] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value)
    }
    const onSendMessage = () => {
        sendMessage({message})
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            receiveNotification({})
        }, 10000)
        return () => {
            clearInterval(intervalId)
        }
    },[])


    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div>
            <AddChat/>
            <input type="text" value={message} onChange={onChangeHandler}/>
            <button onClick={onSendMessage}>Send</button>

        </div>
    );
};

