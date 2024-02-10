const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://shazebansari2536:Ghazal32@ghazali.ye8bn9j.mongodb.net/paytm');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
})

const accountSchema = new mongoose.Schema({
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    balance: Number,
})

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    User, Account
};