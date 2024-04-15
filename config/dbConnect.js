const { default: mongoose } = require("mongoose");

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL)
        console.log(`Database connected successfully!`)
    }
    catch (e) {
        console.log(`Database error!${e}`)
    }
};
module.exports = dbConnect;