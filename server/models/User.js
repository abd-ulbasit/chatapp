const { Schema, model } = require("mongoose");
const UserSchema = new Schema({
    username: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
});
const User = model("User", UserSchema);
module.exports = User;
