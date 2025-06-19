// server/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");
const path = require("path");
const authRoutes = require("./routes/auth");
const donorRoutes = require("./routes/donors");
const bloodRequestRoutes = require("./routes/bloodrequests");
const adminRoutes = require("./routes/admin");
const userRoutes = require('./routes/users'); 

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api/users', userRoutes); 
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/blood-requests", bloodRequestRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("API is running 🚀"));

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
