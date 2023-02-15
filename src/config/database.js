var mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//Set up default mongoose connection

// database connection
mongoose.set("strictQuery", true);
const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
