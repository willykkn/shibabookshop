const express = require("express");
const app = express();
const port = process.env.PORT || "4000";

app.use("/", express.static("./www/"));
app.use("/payment", express.static("./www/payment.html"));
app.use("/api", express.static("./api/"));

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/`);
});
