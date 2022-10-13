const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Chat = require("./models/Chat");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const User = require("./models/User");
const { Socket } = require("dgram");
const httpServer = createServer(app);
// const io = new Server(httpServer, {
//     cors: {
//         origin: "http://localhost:5173",
//     },
// });
app.use(
    cors({
        origin: ["http://localhost:5173", "*"],
    })
);
app.use(express.json());
// io.on("connection", (socket) => {
//     // console.log("New client connected " + socket.id);
// });
const socketIO = require("socket.io")(httpServer, {
    cors: {
        origin: ["http://localhost:5173", "*"],
    },
});
// socketIO
//Add this before the app.get() block
socketIO.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("disconnect", () => {
        console.log("🔥: A user disconnected");
    });
    socket.on("message", (data) => {
        // console.log(data);
        console.log("Broadcasting it to the world");
        // socket.emit("forward-message", data);
        // socket.broadcast.emit("forward-message", data);
        socketIO.sockets.emit("forward-message", data);
    });
});
// const clients = socketIO.;
// console.log(clients);
// setInterval(() => {
//     console.log(clients);
// }, 2000);
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
    res.send("Hello world ");
});
app.post("/newchat", async (req, res) => {
    // const { newMessage } = req.body;
    const newMessage = req.body.newChat;
    console.log(newMessage);
    const newChat = new Chat(newMessage);
    // console.log(newChat);
    // console.log(req.body.);
    try {
        await newChat.save();
        res.status(201).send(newChat);
    } catch (error) {
        res.status(400).send(error);
    }
});
app.get("/chats", async (req, res) => {
    try {
        // console.log("Params :", req.params);
        // console.log("Query :", req.query);
        const chats = await Chat.find({
            $or: [
                { person1: req.query.username },
                { person2: req.query.username },
            ],
        });
        res.send(chats);
        // console.log(chats);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.delete("/deleteChat/", async (req, res) => {
    try {
        const chats = await Chat.deleteOne({
            $or: [
                {
                    $and: [
                        { person1: req.query.user1 },
                        { person2: req.query.user2 },
                    ],
                },
                {
                    $and: [
                        { person2: req.query.user1 },
                        { person1: req.query.user2 },
                    ],
                },
            ],
        });
        res.status(204).send(chats);
        // console.log(chats);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.patch("/updatechat", async (req, res) => {
    console.log(req.body);
    try {
        const responsefromdb = await Chat.updateOne(
            {
                $or: [
                    {
                        $and: [
                            { person1: req.body.newMessage.username },
                            { person2: req.body.newMessage.chatmate },
                        ],
                    },
                    {
                        $and: [
                            { person2: req.body.newMessage.username },
                            { person1: req.body.newMessage.chatmate },
                        ],
                    },
                ],
            },
            {
                $push: {
                    chat: {
                        sendername: req.body.newMessage.sendername,
                        message: req.body.newMessage.message,
                        timestamp: req.body.newMessage.timestamp,
                        receiver: {
                            delivery: {
                                delivered: req.body.newMessage.delivered,
                                deliverTime: req.body.newMessage.deliverTime,
                            },
                            reading: {
                                read: req.body.newMessage.read,
                                readTime: req.body.newMessage.readTime,
                            },
                        },
                    },
                },
            }
        );
        if (responsefromdb.modifiedCount === 1) {
            console.log("Updated one");
            res.status(204).send({ message: "updated" });
        } else {
            //TODO handle this case : user donot exist create a  new chat with this user and send the message to this user
            //? handles already in ohter place no worries
            res.status(200).send({ message: "failed" });

            // res.status(400).send({ error: "message not updated" });
            // const newMessage = req.body.newChat;
            // console.log(newMessage);
            // const newChat = new Chat(newMessage);
            // console.log(newChat);
            // // console.log(req.body.);
            // try {
            //     await newChat.save();
            //     res.status(201).send(newChat);
            // } catch (error) {
            //     res.status(400).send(error);
            // }
        }
        // console.log();
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get("/getupdatedChat", async (req, res) => {
    console.log(req.query.user1);
    try {
        const updatedChat = await Chat.findOne({
            $or: [
                {
                    $and: [
                        { person1: req.query.user1 },
                        { person2: req.query.user2 },
                    ],
                },
                {
                    $and: [
                        { person2: req.query.user1 },
                        { person1: req.query.user2 },
                    ],
                },
            ],
        });
        res.status(200).send(updatedChat);
    } catch (err) {
        res.status(500).send(err);
    }
});
// app.delete("/deleteChat", async (req, res) => {
//     console.log(req.query._id);
//     console.log("helllo");
//     try {
//         await Chat.deleteOne({ _id: req.query._id });
//         res.status(204);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });
/**
 * get updated chat request should be like this:
 * http://localhost:3000/getupdatedChat?user1=basit&user2=Basit
 *
 */
/*
UPDATE CHAT REQUEST BODY SHOULD BE IN THIS FORMAT
{
  "username": "Basit",
  "chatmate": "Ali",
  "sendername": "Ali",
  "message": "HEllo G000000000",
  "timestamp": "2022-08-21T05:10:49.059Z",
  "delivered": true,
  "deliverTime": "2022-08-21T05:10:49.059Z",
  "read": true,
  "readTime": "2022-08-21T05:10:49.059Z"
}
?Now this way ->
{
  "newMessage":{
    "username": "basit1",
    "chatmate": "Basit",
    "sendername": "basit1",
    "message": " going crazy and steupid",
    "timestamp": "2022-08-25T05:10:49.059Z",
    "delivered": true,
    "deliverTime": "2022-08-25T05:10:49.059Z",
    "read": true,
    "readTime": "2022-08-25T05:10:49.059Z"
    }
}

*/
/**
NEW CHAT REQUEST BODY SHOULD BE IN THIS FORMAT
{
  "person1": "Basit",
  "person2": "Hanzala",
  "chat": [
    {
      "sendername": "Basit",
      "message": "hello Aji",
      "timestamp": "2022-08-21T16:38:34.551Z",
      "receiver": {
        "delivery": {
          "delivered": true,
          "deliverTime": "2022-08-21T16:38:34.551Z"
        },
        "reading": {
          "read": true,
          "readTime": "2022-08-21T16:38:34.551Z"
        }
      }
    }
  ]
} 

 */

app.post("/newuser", async (req, res) => {
    const userInDB = await User.find({ username: req.body.username });
    // console.log(userInDB);
    if (userInDB.length > 0) {
        res.status(200).send(
            JSON.stringify({ message: "User Already Exists" })
        );
        return;
    }
    const newUser = new User(req.body);
    // console.log(newUser);
    try {
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});
// app.post("/users", async (req, res) => {
//     // console.log(req.body.username);
//     try {
//         const user = await User.findOne({
//             $and: [
//                 { username: req.body.username },
//                 { password: req.body.password },
//             ],
//         });
//         if (user) {
//             res.status(200).send(user);
//         } else {
//             res.status(200).send({
//                 message: "User Not Found",
//             });
//         }
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });
app.get("/newusers", async (req, res) => {
    try {
        const users = await User.find({}, { username: 1 })
            .sort({ _id: -1 })
            .limit(12);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get("/finduser", async (req, res) => {
    try {
        const user = await User.find(
            {
                username: { $regex: req.query.search, $options: "i" },
            },
            { username: 1 }
        );
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(200).send({
                message: "User Not Found",
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
app.post("/newuser", async (req, res) => {
    const userInDB = await User.find({ username: req.body.username });
    // console.log(userInDB);
    if (userInDB.length > 0) {
        res.status(200).send(
            JSON.stringify({ message: "User Already Exists" })
        );
        return;
    }
    const newUser = new User(req.body);
    // console.log(newUser);
    try {
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});
app.post("/users", async (req, res) => {
    // console.log(req.body.username);
    try {
        const user = await User.findOne({
            $and: [
                { username: req.body.username },
                { password: req.body.password },
            ],
        });
        if (user) {
            // console.log(user);
            res.status(200).send(user);
        } else {
            try {
                const user = await User.findOne({
                    $or: [
                        { username: req.body.username },
                        { password: req.body.password },
                    ],
                });
                // console.log(user);
                if (user) {
                    // console.log(user);
                    console.log(202);
                    res.status(202).send({
                        message: "wrong",
                    });
                } else {
                    res.status(204).send({
                        message: "User Not Found",
                    });
                }
            } catch (err) {
                res.status(500).send(err);
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
