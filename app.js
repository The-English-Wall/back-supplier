const express = require("express");
const cors = require("cors");
const app = express();
const supplierRoutes = require("./routes/supplier.routes");
const taxRoutes = require("./routes/taxinformation.routes");
const comercialCriteria = require("./routes/comercialCriteria.routes");
const hseqCriteria = require("./routes/hseqCriteria.routes");
const safetyCriteria = require("./routes/safetyCriteria.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use("/", (req, res) => {
//   res.send("hola");
// });
app.use("/api/v1/suppliers", supplierRoutes);
app.use("/api/v1/taxinformation", taxRoutes);
app.use("/api/v1/comercialcriteria", comercialCriteria);
app.use("/api/v1/hseqcriteria", hseqCriteria);
app.use("/api/v1/safetycriteria", safetyCriteria);

module.exports = { app };
