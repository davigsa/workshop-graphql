const mongoose = require("mongoose");

try {
  mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
} catch (err) {
  console.error(err);
}

mongoose.connection
  .once("open", () => console.log("MongoDB is running 🍃"))
  .on("error", (e) => {
    throw e;
  });
