import express from "express"
import { addProducts, filterProducts } from "../../controllers/apps/products/products.controller.js"


const router = express.Router()

router.post("/addProducts",addProducts)
router.get("/filteredProducts", filterProducts);

export default router