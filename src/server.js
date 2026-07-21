import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { globalError, globalResponse } from "./middlewares/response.middleware.js"
dotenv.config()
import todoRouter from "./routes/apps/todo.routes.js"



const app = express()
connectDB()
app.use(express.json())
app.use(globalResponse)



app.use("/api/v1/todos",todoRouter)









app.use(globalError)


app.listen(process.env.PORT || 8000, ()=>console.log("⚙️  Server is running on port: " + process.env.PORT))
