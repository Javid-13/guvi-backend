const mongoose = require("mongoose")

const connectDb = async () => {

    try {
        await mongoose.connect("mongodb+srv://jj9566134:B8jMtyTE5kQm09HZ@cluster0.oqeqmv7.mongodb.net/users")
        console.log("connected MongoDb");
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = connectDb


