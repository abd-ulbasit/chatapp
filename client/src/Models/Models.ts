export interface ChatType {

    _id: string,
    person1: string,
    person2: string,
    chat: [{
        message: string,
        sendername: string,
        timestamp: string
        id: string
        receiver: {
            delivery: {
                delivered: boolean,
                deliveryTime: string
            },
            reading: {
                read: boolean
                readTime: string
            }

        }

    }]
}
export interface ChatMessageType{
    message: string,
    sendername: string,
    timestamp: string
    id: string
    receiver: {
        delivery: {
            delivered: boolean,
            deliveryTime: string
        },
        reading: {
            read: boolean
            readTime: string
        }

    }
}
export interface UserReceivedForNewChatType{
    username:String;
    _id:String;
}