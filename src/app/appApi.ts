import { instance } from "./common.api"

export const appApi = {
    sendMessage(data: MessageType) {
        return instance.post<{ idMessage: string }>(
            `waInstance${+data.idInstance}/sendMessage/${data.apiTokenInstance}`,
            { chatId: data.chatId, message: data.message }
        )
    },
    receiveNotification(data: { apiTokenInstance: string; idInstance: string }) {
        return instance.get<ReceiveMessageResponseType>(
            `waInstance${+data.idInstance}/ReceiveNotification/${data.apiTokenInstance}`
        )
    },
    deleteNotification(data: DeleteNotificationDataType) {
        return instance.delete<{ result: boolean }>(
            `waInstance${+data.idInstance}/DeleteNotification/${data.apiTokenInstance}/${data.receiptId}`
        )
    },
    getSettings(data: { apiTokenInstance: string; idInstance: string }) {
        return instance.get<{ wid: string }>(`waInstance${data.idInstance}/getSettings/${data.apiTokenInstance}`)
    },
}

export type DeleteNotificationDataType = {
    receiptId: number
    apiTokenInstance: string
    idInstance: string
}
export type MessageType = {
    chatId: string
    message: string
    apiTokenInstance: string
    idInstance: string
}

export type ReceiveMessageResponseType = {
    receiptId: number
    body: {
        typeWebhook: string
        instanceData: {
            idInstance: number
            wid: string
            typeInstance: string
        }
        timestamp: number
        idMessage: string
        senderData: {
            chatId: string
            sender: string
            senderName: string
        }
        messageData: {
            typeMessage: string
            textMessageData: {
                textMessage: string
            }
        }
    }
}
