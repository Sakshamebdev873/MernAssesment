import React from 'react'
import { Form, redirect, useNavigation } from 'react-router'
import customFetch from '../utils/customFetch'
export const action = async({request}) =>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/login',data)
    return redirect('/dashboard')
  } catch (error) {
    console.log(error);
  }
}
const Login = () => {
  const navigation = useNavigation();
    // const navigate = useNavigate()
    const isSubmitting = navigation.state === "submitting";
  return (
    <>
    <div className='flex justify-center items-center bg-gray-200 min-h-[85vh] w-full '  >
<Form className='min-h-[40vh] min-w-[35vw] bg-white flex flex-col gap-4 justify-center items-center rounded-[16px]'  method="post">
<div className='flex flex-col w-full' >
<label htmlFor="Username" className='text-[16px] font-medium px-12'  >Username</label>
<input type="text" name="username" id="username" placeholder='Enter here Sakshamarya for admin' className='border-b mt-4 font-extralight border-b-black min-w-[80%] mx-12 outline-0 min-h-[24px]  ' />
  </div>
  <div className='flex flex-col w-full' >
<label htmlFor="Password" className='text-[16px] font-medium px-12'  >Password</label>
<input type="password" name="password" id="password" placeholder='Enter here 1234567890 for admin' className='border-b outline-0 mt-4 font-extralight border-b-black min-w-[80%] mx-12 min-h-[24px]  ' />

</div>
<button type="submit" className='px-12 py-2 text-white bg-red-400 text-xl w-[80%] mt-4 rounded-[12px] leading-[20px]' >{isSubmitting ? "submitting..." : "submit"}</button>
</Form>
    </div>
    </>
  )
}

export default Login