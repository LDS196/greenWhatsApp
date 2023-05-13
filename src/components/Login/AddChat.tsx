import React from "react"
import s from "./Login.module.scss"
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
} from "@mui/material"
import {useForm} from "react-hook-form"
import {useActions} from "../../hooks/useActions";
import {appActions} from "../../app/app.slice";



type ChatIdType = {
    chatId: string,
}
export const AddChat = () => {
    const {setChatId} = useActions(appActions)

    const {register, formState: {errors, isDirty, isValid}, handleSubmit,} = useForm<ChatIdType>({
        defaultValues: {
            chatId: "",
        },
        mode: "onChange",
    })

    const onSubmit = (data: ChatIdType) => {
        const value = {chatId: data.chatId + '@c.us'}
        setChatId(value)
    }

    return (

        <Paper elevation={3} style={{padding: "10px"}}>
            <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center",}}>
                <Typography component="h1" variant="h5">
                    Add new chat
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{mt: 1, maxWidth: "350px", width: "100%"}}
                >
                    <TextField
                        {...register("chatId", {
                            required: "Required field",
                            minLength: {
                                value: 11,
                                message: "Min length 11 symbols",
                            },
                            maxLength: {
                                value: 11,
                                message: "Max length 11 symbols",
                            },
                        })}
                        margin="normal"
                        fullWidth
                        id="chatId"
                        label="Add number in the format 79826000101"
                        name="chatId"
                        type={"number"}
                    />
                    <div className={s.error}>{errors?.chatId &&
                        <p>{errors?.chatId?.message || "Error"}</p>}</div>
                    <Button
                        disabled={!isDirty || !isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Paper>

    )
}
