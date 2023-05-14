import React, {useEffect} from "react";
import { Paper, Theme} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";

import {MessageLeft, MessageRight} from "./Message";
import {TextInput} from "./TextInput";
import {useSelector} from "react-redux";
import {selectApp} from "../../../app/app.select";
import {useActions} from "../../../hooks/useActions";
import {appThunks} from "../../../app/app.slice";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            width: "80vw",
            height: "80vh",
            maxWidth: "500px",
            maxHeight: "700px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        paper2: {
            width: "80vw",
            maxWidth: "500px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        container: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        messagesBody: {
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "scroll",
            height: "calc( 100% - 80px )"
        }
    })
);

export const ChatList = () => {
    const {receiveNotification} = useActions(appThunks)

    const classes = useStyles();
    const {messages,chatId} = useSelector(selectApp)
    useEffect(() => {
        const intervalId = setInterval(() => {
            receiveNotification({})
        }, 5000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])
    return (
        <div className={classes.container}>
            <Paper className={classes.paper} elevation={2}>
                <Paper id="style-1" className={classes.messagesBody}>
                    {
                        messages.map(m=>{
                            return m.id===chatId
                                ?<MessageLeft
                                    key={m.idMessage}
                                message={m.message}
                                timestamp="MM/DD 00:00"
                                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                                displayName={m.id}
                                avatarDisp={true}
                            />
                                :  <MessageRight
                                    key={m.idMessage}
                                    message={m.message}
                                    timestamp="MM/DD 00:00"
                                    photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                                    displayName=""
                                    avatarDisp={false}
                                />
                        })
                    }
                </Paper>
                <TextInput/>
            </Paper>
        </div>
);
}
