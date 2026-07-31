import { Product } from "../../../models/apps/products/product.model.js"

const addProducts = async(req,res ,next)=>{
    try {
        const response = await fetch(`https://uozftngvlrbpauswzzdz.supabase.co/storage/v1/object/public/resumes/dummydata.json`)
        const products = await response.json()

        if(!Array.isArray(products) || products.length === 0){
            return res.error(400,"Please Provide")
        }


        const productsInDB = await Product.insertMany(products)

        return res.success(200,"Added Products To The DataBase",productsInDB)
    } catch (error) {
        next(error)
    }
}

export {
    addProducts
}