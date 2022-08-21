const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Chat = require("./models/Chat");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    },
});
app.use(express.json());
io.on("connection", (socket) => {
    console.log("New client connected " + socket.id);
});
httpServer.listen(3000);
const uri =
    "mongodb+srv://admin:admin@learn-next.7nvta2d.mongodb.net/ChatApp?retryWrites=true&w=majority";
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
app.get("/", (req, res) => {
    res.send("Hello ");
});
app.post("/newchat", async (req, res) => {
    const newChat = new Chat(req.body);
    console.log(newChat);
    console.log(req.body);
    try {
        await newChat.save();
        res.status(201).send(newChat);
    } catch (error) {
        res.status(400).send(error);
    }
});
app.get("/chats", async (req, res) => {
    try {
        console.log(req.body.username);
        const chats = await Chat.find({
            $or: [
                { person1: req.body.username },
                { person2: req.body.username },
            ],
        });
        res.send(chats);
        console.log(chats);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.delete("/deleteChat/", async (req, res) => {
    try {
        const chats = await Chat.deleteOne({
            $and: [
                { person1: req.body.username },
                { person2: req.body.chatmate },
            ],
        });
        res.status(204).send(chats);
        console.log(chats);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.patch("/updatechat", async (req, res) => {
    try {
        const chats = await Chat.updateOne(
            {
                $or: [
                    {
                        $and: [
                            { person1: req.body.username },
                            { person2: req.body.chatmate },
                        ],
                    },
                    {
                        $and: [
                            { person2: req.body.username },
                            { person1: req.body.chatmate },
                        ],
                    },
                ],
            },
            {
                $push: {
                    chat: {
                        sendername: req.body.sendername,
                        message: req.body.message,
                        timestamp: req.body.timestamp,
                        receiver: {
                            delivery: {
                                delivered: req.body.delivered,
                                deliverTime: req.body.deliverTime,
                            },
                            reading: {
                                read: req.body.read,
                                readTime: req.body.readTime,
                            },
                        },
                    },
                },
            }
        );
        res.status(204).send(chats);
        console.log(chats);
    } catch (error) {
        res.status(500).send(error);
    }
});

/*
UPDATE CHAT REQUEST BODY SHOULD BE IN THIS FORMAT
{
  "username": "bilal",
  "chatmate": "usman",
  "sendername": "Basit",
  "message": "HEllo GAAAAAAAAAY000000000000",
  "timestamp": "2022-08-21T05:10:49.059Z",
  "delivered": true,
  "deliverTime": "2022-08-21T05:10:49.059Z",
  "read": true,
  "readTime": "2022-08-21T05:10:49.059Z"
}

*/
