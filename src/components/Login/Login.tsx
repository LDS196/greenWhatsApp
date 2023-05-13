import React from "react"
import s from "./Login.module.scss"
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material"
import {useForm} from "react-hook-form"
import {useSelector} from "react-redux"
import {selectApp} from "../../app/app.select";
import {useActions} from "../../hooks/useActions";
import {appActions, appThunks} from "../../app/app.slice";
import {Navigate} from "react-router-dom";


type LoginParamsType = {
    idInstance: number | null,
    apiTokenInstance: string
}
export const Login = () => {
    const {login, setIsLoggedIn} = useActions(appActions)
    const {getSettings} = useActions(appThunks)
    const {isLoggedIn} = useSelector(selectApp)

    const {register, formState: {errors, isDirty, isValid}, handleSubmit,} = useForm<LoginParamsType>({
        defaultValues: {
            idInstance: null,
            apiTokenInstance: "",
        },
        mode: "onChange",
    })

    const onSubmit = (data: LoginParamsType) => {
        login(data)
        setIsLoggedIn({isLoggedIn: true})
        getSettings({})
    }

    if (isLoggedIn) {
        return <Navigate to={"/"}/>
    }
    return (
        <Container component="main" maxWidth="xs" sx={{marginTop: 3}}>
            <Paper elevation={3} style={{padding: "10px"}}>
                <Box sx={{marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center",}}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{mt: 1, maxWidth: "350px", width: "100%"}}
                    >
                        <TextField
                            {...register("idInstance", {
                                required: "Required field",
                                minLength: {
                                    value: 10,
                                    message: "Min length 10 symbols",
                                },
                            })}
                            margin="normal"
                            fullWidth
                            id="idInstance"
                            label="idInstance"
                            name="idInstance"
                            type={"number"}
                        />
                        <div className={s.error}>{errors?.idInstance &&
                            <p>{errors?.idInstance?.message || "Error"}</p>}</div>
                        <div className={s.password}>
                            <TextField
                                {...register("apiTokenInstance", {
                                    required: true,
                                })}
                                margin="normal"
                                fullWidth
                                name="apiTokenInstance"
                                label="apiTokenInstance"
                                type={"text"}
                                id="apiTokenInstance"
                            />
                        </div>
                        <div className={s.error}>
                            {errors?.apiTokenInstance && <p>{errors?.apiTokenInstance?.message || "Error"}</p>}
                        </div>
                        <Button
                            disabled={!isDirty || !isValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}
