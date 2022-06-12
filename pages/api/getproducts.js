import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
  let products = await Product.find()
  let tshirts = {}
  for(let item of products){
    
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      
  }
  res.status(200).json({ tshirts })
  }

export default connectDb(handler)