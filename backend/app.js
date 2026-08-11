const express = require("express");
const cors = require("cors");
require("dotenv").config();

const summaryRoutes = require("./routes/summaryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", summaryRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});