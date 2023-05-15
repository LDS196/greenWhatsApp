import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "../utils/create-app-async-thunk"
import { appApi, DeleteNotificationDataType } from "./appApi"
import { handleServerNetworkError } from "../utils/handle-server-network-error"

const sendMessage = createAppAsyncThunk<{ idMessage: string }, { message: string }>(
    "app/sendMessage",
    async (arg, ThunkApi) => {
        const { rejectWithValue, getState, dispatch } = ThunkApi
        const { chatId, wid, apiTokenInstance, idInstance } = getState().app

        try {
            const data = { chatId, message: arg.message, apiTokenInstance, idInstance }
            const res = await appApi.sendMessage(data)
            dispatch(appActions.addMessage({ id: wid, message: arg.message, idMessage: res.data.idMessage }))
            return res.data
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)
const getSettings = createAppAsyncThunk<{ wid: string }, void>("app/getSettings",
    async (arg, ThunkApi) => {
    const { rejectWithValue, getState } = ThunkApi
    const { apiTokenInstance, idInstance } = getState().app
    try {
        const res = await appApi.getSettings({ apiTokenInstance, idInstance })
        return res.data
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
const deleteNotification = createAppAsyncThunk<{result:boolean}, DeleteNotificationDataType>(
    "app/deleteNotification",
    async (arg, ThunkApi) => {
        const { rejectWithValue } = ThunkApi
        try {
            const res = await appApi.deleteNotification(arg)
            return res.data
        } catch (error) {
            return rejectWithValue(handleServerNetworkError(error))
        }
    }
)

const receiveNotification = createAppAsyncThunk<any,void>("app/receiveNotification",
    async (arg, ThunkApi) => {
    const { rejectWithValue, getState, dispatch } = ThunkApi
    const { apiTokenInstance, idInstance, chatId } = getState().app

    try {
        const res = await appApi.receiveNotification({ apiTokenInstance, idInstance })
        if (res.data?.body?.senderData?.sender === chatId) {
            if (res.data.body.messageData.textMessageData) {
                dispatch(appActions.addMessage({
                        message: res.data?.body.messageData.textMessageData.textMessage,
                        id: res.data?.body.senderData.chatId,
                        idMessage: res.data?.body.idMessage,
                    })
                )
            }
        }
        return res.data
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
type MessageType = {
    id: string
    message: string
    idMessage: string
}
const slice = createSlice({
    name: "app",
    initialState: {
        wid: "",
        messages: [] as Array<MessageType>,
        error: null as null | string,
        idInstance: "",
        apiTokenInstance: "",
        isLoading: false,
        isLoggedIn: false,
        chatId: "",
    },
    reducers: {
        addMessage: (state, action: PayloadAction<MessageType>) => {
            state.messages.push(action.payload)
        },
        clearMessages: (state) => {
            state.messages = []
        },
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        login: (state, action: PayloadAction<{ idInstance: string; apiTokenInstance: string }>) => {
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
            .addCase(sendMessage.fulfilled, () => {})
            .addCase(getSettings.fulfilled, (state, action) => {
                state.wid = action.payload.wid
            })
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/pending")
                },
                (state) => {
                    state.isLoading = true
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/rejected")
                },
                (state, action) => {
                    const { payload } = action
                    if (payload?.showGlobalError) {
                        state.error = payload.data
                    }
                    state.isLoading = false
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/fulfilled")
                },
                (state) => {
                    state.isLoading = false
                }
            )
    },
})
export const appActions = slice.actions
export const appReducer = slice.reducer
export const appThunks = { getSettings, sendMessage, deleteNotification, receiveNotification }
