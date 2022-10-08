export interface ChatType {
    _id ?: string;
    person1: string,
    person2: string |undefined,
    chat ?: [{
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
    id?: string
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
export interface User{
    username:String;
    _id:String;
}


//This was a wrong approch and it would be leading into a lot of bugs

// export interface NewChatType{
//     person1:String;
//     person2:String|undefined
//     chat:ChatMessageType[];
// }
    // {
    //     "person1": "Basit",
    //     "person2": "Hanzala",
    //     "chat": [
    //       {
    //         "sendername": "Basit",
    //         "message": "hello Aji",
    //         "timestamp": "2022-08-21T16:38:34.551Z",
    //         "receiver": {
    //           "delivery": {
    //             "delivered": true,
    //             "deliverTime": "2022-08-21T16:38:34.551Z"
    //           },
    //           "reading": {
    //             "read": true,
    //             "readTime": "2022-08-21T16:38:34.551Z"
    //           }
    //         }
    //       }
    //     ]