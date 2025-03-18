import express from "express";
import cors from "cors";
import "./utils/db.js";
import bodyParser from "body-parser";
import router from "./routers/wings.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/admin", router);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
