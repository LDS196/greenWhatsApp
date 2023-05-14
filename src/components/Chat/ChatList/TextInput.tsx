import React, {ChangeEvent, useState} from 'react'
import {createStyles, makeStyles} from "@mui/styles";
import {Button, TextField, Theme} from "@mui/material";

import SendIcon from '@mui/icons-material/Send';
import {useActions} from "../../../hooks/useActions";
import {appThunks} from "../../../app/app.slice";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapForm: {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            margin: `10px auto`
        },
        wrapText: {
            width: "100%"
        },
        button: {
        },
    })
);


export const TextInput = () => {
    const {sendMessage,} = useActions(appThunks)
    const [message, setMessage] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value)
    }
    const onSendMessage = () => {
        sendMessage({message})
        setMessage('')
    }
    const classes = useStyles();
    return (
        <>
            <div className={classes.wrapForm} >
                <TextField
                    value={message}
                    onChange={onChangeHandler}
                    id="standard-text"
                    label="new message"
                    className={classes.wrapText}
                />
                <Button
                    disabled={message.length===0}
                    onClick={onSendMessage}
                    variant="contained"
                    color="primary"
                    className={classes.button}>
                    <SendIcon/>
                </Button>
            </div>
        </>
    )
}



