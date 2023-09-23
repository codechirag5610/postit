const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
}
);

messageSchema.pre('remove', async function(next){
    try {
        // find a user
        let user = User.findById(this.user);
        // remove the id of message from message list
        user.message.remove(this.id);
        // save user
        await user.save();
        // return next
        return next();
    }
    catch (e) {
        return next(err);
    }
})

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;