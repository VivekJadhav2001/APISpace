import mongoose from "mongoose"


async function connectDB() {
    try {
        const connectionInstance  = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`)
    } catch (error) {
        console.log("MongoDB Connection Error: ",error)
        process.exit(1)
    }
}

export default connectDB