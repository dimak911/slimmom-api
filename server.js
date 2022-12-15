const app = require("./src/app");
const mongoose = require("mongoose");
const { PORT, DB_HOST } = require("./src/config");

(async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3001");
    });
  } catch (err) {
    console.error("Failed to start server with error: ", err.message);
    process.exit(1);
  }
})();
