const { Schema, model } = require("mongoose");
// const messageSchema = new Schema({
//     sendername: {
//         type: String,
//         required: true,
//     },
//     message: {
//         type: String,
//         required: true,
//     },
// });
const ChatSchema = new Schema({
    person1: {
        type: String,
        required: true,
    },
    person2: {
        type: String,
        required: true,
    },
    chat: [
        {
            sendername: String,
            message: String,
            timestamp: Date,
            receiver: {
                delivery: {
                    delivered: Boolean,
                    deliverTime: Date,
                },
                reading: {
                    read: Boolean,
                    readTime: Date,
                },
            },
        },
    ],
});
module.exports = model("Chat", ChatSchema);
