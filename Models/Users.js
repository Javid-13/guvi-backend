const { default: mongoose } = require("mongoose")

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    age: {
        type: String,
        default: 0,
    },
    gender: {
        type: String,
        default: "",
    },
    mobileNumber: {
        type: String,
        default: 0,
    },

    dateOfBirth: {
        type: String,
    },
}, {
    collection: "Users"
}
)

module.exports = mongoose.model("Users", usersSchema)