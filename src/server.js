import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { globalError, globalResponse } from "./middlewares/response.middleware.js"
dotenv.config()
import todoRouter from "./routes/apps/todo.routes.js"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
connectDB()
app.use(express.json())
app.use(globalResponse)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


app.use("/todos",todoRouter)









app.use(globalError)


app.listen(process.env.PORT || 8000, ()=>console.log("⚙️  Server is running on port: " + process.env.PORT))
