import React from 'react'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router'
export const loader = async({request}) =>{
  try {
    const {data} = await customFetch.get('/history')
    return data
  } catch (error) {
    console.log(error);
  }
}
const IpAdress = () => {
  const value = useLoaderData()
  console.log(value);
  const {msg, coupon} = value
  return (
    <>
    <h1 className='text-[50px] leading-[25px] text-center text-black mt-8 ' >User Claim History By Ip Address</h1>
    <h1 className='text-[20px] text-center leading-[20px] mt-12 text-black  ' >Last one was claimed at {msg}</h1>
    {coupon.map((item,index)=>{
      const {couponCode,claimedBy} = item
      return <div key={index} className='mt-7 flex  justify-center
      items-center' >
 <div className='w-[80vw] h-[10vh] bg-gray-200 px-12 rounded-[12px] flex justify-between items-center'>
 <h1>User Address : {claimedBy} </h1>
 <h1>Coupon Code : {couponCode}</h1>
 </div>
     </div>
    })}
    </>
  )
}

export default IpAdress