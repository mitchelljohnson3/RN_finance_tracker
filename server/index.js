const express = require("express");
const app = express();
const port = 2000;
// importing routes
const transactionRoutes = require("./routes/transactions");
const themeRoutes = require("./routes/themes");
// automatically parse json
app.use(express.json());
// listen to these routes
app.use("/transaction", transactionRoutes);
app.use("/theme", themeRoutes);

// process.env.PORT -> heroku will give this a custom port
// when in testing, server will be at http://localhost:2000
app.listen(process.env.PORT || port, () =>
  console.log(`server listening at http://localhost:${port}`)
);
