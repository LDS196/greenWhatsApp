import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {createAppAsyncThunk} from "../components/utils/create-app-async-thunk";
import {appApi, DeleteNotificationDataType,} from "./appApi";


const sendMessage = createAppAsyncThunk<{ idMessage: string }, { message: string }>(
    "app/sendMessage",
    async (arg, ThunkApi) => {
        const {rejectWithValue, getState, dispatch} = ThunkApi
        const {chatId, wid} = getState().app

        try {
            const data = {chatId: chatId, message: arg.message}
            const res = await appApi.sendMessage(data)
            dispatch(appActions.addMessage({id: wid, message: arg.message}))
            console.log(res.data)
            return res.data
        } catch (error) {
            return rejectWithValue(null)
        }
    }
)
const getSettings = createAppAsyncThunk<{ wid: string }, void>(
    "app/getSettings",
    async (arg, ThunkApi) => {
        const {rejectWithValue} = ThunkApi
        try {
            const res = await appApi.getSettings()
            return res.data
        } catch (error) {
            return rejectWithValue(null)
        }
    }
)
const deleteNotification = createAppAsyncThunk<void, DeleteNotificationDataType>(
    "app/deleteNotification",
    async (arg, ThunkApi) => {
        const {rejectWithValue} = ThunkApi
        try {
            await appApi.deleteNotification(arg)
        } catch (error) {
            return rejectWithValue(null)
        }
    }
)

const receiveNotification = createAppAsyncThunk<void, void>(
    "app/receiveNotification",
    async (arg, ThunkApi) => {
        const {rejectWithValue, getState, dispatch} = ThunkApi
        const {chatId} = getState().app

        try {
            const res = await appApi.receiveNotification()
            if (res.data !== null) {
                dispatch(appThunks.deleteNotification({receiptId: res.data.receiptId}))
            }
            if (res.data?.body.senderData.chatId === chatId) {
                if (res.data?.body.messageData.textMessageData) {
                    dispatch(appActions.addMessage({
                        message: res.data?.body.messageData.textMessageData.textMessage,
                        id: res.data?.body.senderData.chatId

                    }))
                }
            }
            return
        } catch
            (error) {
            return rejectWithValue(null)
        }
    }
)
type MessageType = {
    id: string
    message: string
}
const slice = createSlice({
    name: "app",
    initialState: {
        wid: '',
        messages: [] as Array<MessageType>,
        error: null as null | string,
        idInstance: null as null | number,
        apiTokenInstance: '',
        isLoading: false,
        isLoggedIn: false,
        chatId: ''
    },
    reducers: {
        addMessage: (state, action: PayloadAction<MessageType>) => {
            state.messages.push(action.payload)
        },
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        login: (state, action: PayloadAction<{ idInstance: number | null, apiTokenInstance: string }>) => {
            console.log(action.payload)
            state.idInstance = action.payload.idInstance
            state.apiTokenInstance = action.payload.apiTokenInstance
        },
        setChatId: (state, action: PayloadAction<{ chatId: string }>) => {
            state.chatId = action.payload.chatId
        },
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.fulfilled, () => {
            })
            .addCase(getSettings.fulfilled, (state, action) => {
                state.wid = action.payload.wid
            })
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/pending")
                },
                (state, action) => {
                    state.isLoading = true
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/rejected")
                },
                (state, action) => {

                    state.isLoading = false
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/fulfilled")
                },
                (state, action) => {

                    state.isLoading = false
                }
            )
    },
})
export const appActions = slice.actions
export const appReducer = slice.reducer
export const appThunks = {getSettings, sendMessage, deleteNotification, receiveNotification}
