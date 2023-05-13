import {instance} from "./common.api";


const idInstance = 1101819970
const apiTokenInstance = 'ce772188c5c44f569958249eb4d01381845d95252e91405b9e'

export const appApi = {
    sendMessage(data: MessageType) {
        return instance.post<{ idMessage: string }>(`waInstance${idInstance}/sendMessage/${apiTokenInstance}`, data)
    },
    receiveNotification() {
        return instance.get<ReceiveMessageResponseType>(`waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
    },
    deleteNotification(data: DeleteNotificationDataType) {
        return instance.delete<{ result: boolean }>(`waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${data.receiptId}`)
    },
    getSettings() {
        return instance.get<{ wid: ''}>(`waInstance${idInstance}/getSettings/${apiTokenInstance}`)
    },


}

export type DeleteNotificationDataType = {
    receiptId: number
}
export type MessageType = {
    chatId: string,
    message: string
}

export type ReceiveMessageResponseType = {
    receiptId: number,
    body: {
        typeWebhook: string,
        instanceData: {
            idInstance: number,
            wid: string,
            typeInstance: string
        },
        timestamp: number,
        idMessage: string,
        senderData: {
            chatId: string,
            sender: string,
            senderName: string
        },
        messageData: {
            typeMessage: string,
            textMessageData: {
                textMessage: string
            }
        }
    }
}