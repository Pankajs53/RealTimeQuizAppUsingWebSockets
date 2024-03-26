const express = require("express");
const app = express();
const cors = require("cors");
const cron = require('node-cron');
const {deleteOldEntries} = require("./controllers/Room")
const { initializeSocketEvents } = require("./socketEvents");


// for socket.io
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

// PORT
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// import {dbConnect} from "./utils/dbConnection"
const dbConnect = require("./utils/dbConnection");

dbConnect();
// middelware to access req body data before routes
app.use(cors());
// for socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], // Allow only GET and POST methods
    allowedHeaders: ["my-custom-header"], // Allow only specified headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  },
});
app.use(express.json());
// Apply CORS middleware
// app.use(cors(corsOptions));
// cookie-parser-otherwise while accessing it will show undefined
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const userRoute = require("./routes/userRoutes");
const roomRoute = require("./routes/roomRoutes");
// routes
app.use("/user", userRoute);
app.use("/room", roomRoute);

// Initialize socket events
initializeSocketEvents(io);

// Schedule the task to run every hour
cron.schedule('0 * * * *', deleteOldEntries);

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`listing at port no ${PORT}`);
});
