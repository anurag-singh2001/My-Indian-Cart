import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
const Navbar = ({ logout,cart,user, addToCart, removeFromCart, clearCart, subTotal }) => {
    console.log(cart, addToCart, removeFromCart, clearCart, subTotal)
    const [dropdown, setDropdown] = useState(false)

    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }
    }

    const ref = useRef();
    return (
        <div className="flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md py-2 sticky top-0 z-10 bg-white   ">
            <div className="logo mx-5">
                <Link href={'/'}><a><Image width={250} height={90} src='/logo2.png' alt="logo" /></a></Link>
            </div>

            <div className="nav md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center cursor-pointer">
                <ul className='flex items-center space-x-6 font-bold'>
                    <Link href={'/men'}><a className="mr-5 hover:text-blue-300"><li>Men</li></a></Link>
                    <Link href={'/women'}><a className="mr-5 hover:text-blue-300"><li>Women</li></a></Link>
                    <Link href={'/children'}><a className="mr-5 hover:text-blue-300"><li>Children</li></a></Link>
                </ul>
            </div>
            <button onClick={toggleCart} className="cart hover:text-blue-100 inline-flex items-center py-1 px-3 focus:outline-none text-xl  md:mt-0"><AiOutlineShoppingCart className='ml-2 text-2xl' /></button>
          <div onMouseOver={() => { setDropdown(true) }} onMouseOut={() => { setDropdown(false) }}>
            {dropdown && <div className="dropdown shadow-xl absolute top-14 right-2 bg-blue-100 rounded-md px-5 w-36 py-3">
              <ul>
                <Link passHref href={'/myaccount'}><li className='py-1  hover:text-blue-600 cursor-pointer  font-bold font-mono'>My Account</li></Link>
                <Link passHref href={'/orders'}><li className='py-1  hover:text-blue-600 cursor-pointer  font-bold font-mono'>Orders</li></Link>
                <li onClick={logout} className='py-1  hover:text-blue-600 cursor-pointer font-bold font-mono'>Logout</li>
              </ul>
            </div>}
            {user.value && <MdAccountCircle className='ml-2 hover:text-blue-50 text-3xl mx-2 cursor-pointer' />}
          </div>
          {!user.value && <Link href={'/login'}><a><button className='bg-blue-500 hover:bg-blue-600 rounded r px-3 py-2 text-white border-0 focus:outline-none  my-auto'>Login</button></a></Link>}
            <div ref={ref} className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute bg-blue-100 rounded-md top-0 right-0 px-8 py-10 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
                <h2 className="font-bold text-xl text-center">
                    Shoping Cart
                </h2>
                <span onClick={toggleCart} className=' cursor-pointer absolute top-5 right-2 text-2xl text-blue-500'><AiFillCloseCircle /></span>
                <ol className='list-decimal '>
                    {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your Cart is Empty</div>}
                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex my-5">
                                <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                                <div className='w-1/3 flex items-center justify-center font-semibold text-lg'><AiFillPlusCircle className='cursor-pointer text-blue-500 ' onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} /><span className='mx-2'>{cart[k].qty}</span><AiFillMinusCircle className='cursor-pointer text-blue-500 ' onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} /></div>

                            </div>
                        </li>
                    })}



                </ol>
                <div className="flex">
                    <Link href={'/checkout'}><button className="flex mr-2 text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
                    <button onClick={clearCart} className="flex mr-2 text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-sm">Clear Cart</button>

                </div>

            </div>
        </div>
    )
}

export default Navbar