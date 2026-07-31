import express from "express"
import { addProducts } from "../../controllers/apps/products/products.controller.js"


const router = express.Router()

router.post("/addProducts",addProducts)

export default router