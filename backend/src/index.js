const { default: mongoose } = require("mongoose");
const config = require("./config");
const { app } = require("./app");

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

let server;

async function connectDb() {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log("database connected successfully");
    server = app.listen(config.port, () => {
      console.log("server running on port", config.port);
    });
  } catch (err) {
    console.log(err);
    console.log("database connection failed");
  }

  process.on("unhandledRejection", (err) => {
    if (server) {
      server.close(() => {
        console.log(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

connectDb();

process.on("SIGTERM", (err) => {
  errorLogger.info("SIGTERM is received", err);
  if (server) {
    server.close();
  }
});
