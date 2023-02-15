const app = require("./app");
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./" });
}

const connectDatabase = require("./src/config/database");
connectDatabase();

const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
