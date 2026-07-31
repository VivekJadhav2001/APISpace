import { Product } from "../../../models/apps/products/product.model.js";

const addProducts = async (req, res, next) => {
  try {
    const response = await fetch(
      `https://uozftngvlrbpauswzzdz.supabase.co/storage/v1/object/public/resumes/dummydata.json`,
    );
    const products = await response.json();

    if (!Array.isArray(products) || products.length === 0) {
      return res.error(400, "Please Provide");
    }

    const productsInDB = await Product.insertMany(products);

    return res.success(200, "Added Products To The DataBase", productsInDB);
  } catch (error) {
    next(error);
  }
};

const filterProducts = async (req, res, next) => {
  try {
    const {
      productName,
      brand,
      category,
      minPrice,
      maxPrice,
      color,
      size,
      material,
      season,
      style,
      cursor,
      limit= 10
    } = req.query;

    const query = {};

    if (productName) {
      query.product_name = productName;
    }
    if (brand) {
      query.brand = brand;
    }

    if (category) {
      query.category = category;
    }
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }
    if (color) {
      query.color = color;
    }
    if (size) {
      query.size = size;
    }
    if (material) {
      query.material = material;
    }
    if (season) {
      query.season = season;
    }
    if (style) {
      query.style = style;
    }

    if(cursor){
        query._id ={
            $gt:cursor
        }
    }

    const filteredProducts = await Product.find(query);

    return res.success(200,"PRODUCTS",filteredProducts)
  } catch (error) {
    next(error);
  }
};

export { addProducts, filterProducts };
