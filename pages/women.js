import React from 'react'
import Link from 'next/link'
import Product from "../models/Product"
import mongoose from "mongoose";
const Women = ({ products }) => {
  console.log(products)
  return (
    <section className="text-gray-400 bg-white-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap  justify-center mx-5 -m-4">
        {Object.keys(products).length===0 && <p>Sorry all the items are currently out of stocks.New stock coming soon. Stay tuned</p>}
          {Object.keys(products).map((item) => {
            return <Link key={products[item._id]} passHref={true} href={`/product/${products[item].slug}`}><div className="lg:w-1/5 cursor-pointer shadow-lg m-5 md:w-1/2 p-4 w-full">
              <a className="block relative rounded overflow-hidden">
                <img alt="ecommerce" className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block" src={products[item].img} />
              </a>
              <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                <p className="mt-1">₹{products[item].price}</p>
                <div className="mt-1">
                    {products[item].size.includes('S') && <span className='border border-indigo-200 px-1 mx-1'>S </span>}
                    {products[item].size.includes('M') && <span className='border border-indigo-200 px-1 mx-1'>M </span>}
                    {products[item].size.includes('L') && <span className='border border-indigo-200 px-1 mx-1'>L </span>}
                    {products[item].size.includes('X') && <span className='border border-indigo-200 px-1 mx-1'>X </span>}
                    {products[item].size.includes('XL') && <span className='border border-indigo-200 px-1 mx-1'>XL </span>}
                    {products[item].size.includes('XXL') && <span className='border border-indigo-200 px-1 mx-1'>XXL </span>}
                  </div>
                  <div className="mt-1">
                    {products[item].color.includes('Red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                  </div>
              </div>
            </div>
            </Link>
          })}


        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: 'women' })
  let tshirts = {}
  for(let item of products){
    
    tshirts[item.title] = JSON.parse(JSON.stringify(item))
    
}
  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  }
}

export default Women