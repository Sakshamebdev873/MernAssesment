import React from 'react'
import { Link } from 'react-router'

const Hero = () => {
  return (
    <>
    <div className='flex justify-center items-center bg-gray-200 flex-col min-h-[85vh] w-full ' >
    <h1 className='text-5xl text-red-400 font-medium uppercase text-center' >The #1 webiste for claiming free coupons </h1>
    
        <h1 className='text-xl text-black mt-4 font-medium uppercase' >Claim Free Coupon Now!!</h1>
        <div className='flex justify-between w-[50vw] items-center mt-6' >
        <Link to={'/login'} className='px-6 py-2 rounded-2xl  hover:text-red-400 shadow-2xl bg-red-400 hover:border-white transition-all hover:bg-white ease-in duration-500 text-white border border-red-400 text-xl ' >Login as a Admin</Link >
        <Link to={'/guest'} className='px-6 py-2 rounded-2xl bg-white text-red-400 hover:bg-red-400 hover:border-white transition-all ease-in duration-500 hover:text-white border border-red-400 text-xl  ' >Continue as a Guest</Link >
        </div>
    </div>
    </>
  )
}

export default Hero