import React from 'react'

const linkList = ['Home', 'Services', 'About us', 'Gallery', 'Policy']
export default function Footer({ handleFocus }) {
  return (
    <div className='w-full h-auto bg-neutral-800 py-4'>
        <div className='w-3/5 py-8 m-auto flex justify-between border-b-2 border-white'>
          <div className='flex py-4 w-1/3 flex-col justify-around backdrop-opacity-20 rounded backdrop-invert bg-blue/30'>
            <h1 className='text-center text-white px-4 text-3xl'>TEX Worldwide Express</h1>
            <p className='text-center my-6 text-white px-4 text-base '>18 Nguyen Canh Di Str, Ward 4, Tan Binh Dist, HCMC 72106, VietNam</p>
            <p className='text-center text-white px-4 text-base '><b>Phone</b>: +84 28 3948 3949</p>
            <p className='text-center text-white px-4 text-base '><b>Email</b>: phuc.vo@vietanexpress.com.vn</p>
          </div>
          <div className='w-1/3 flex'>
            <div className='w-auto h-auto mx-auto'>
              <h4 className='text-white'>Useful links</h4>
              <ul className='text-white flex flex-col justify-around'>
                {linkList.map((link) => 
                    <li key={link} onClick={handleFocus} className='pt-2 cursor-pointer hover:text-gray-400 text-white ml-2'>{link}</li>
                )}
              </ul>
            </div>
          </div>
          <div className='w-1/3'>
            <h1 className='text-white text-base mb-2'>Newsletter sign-up</h1>
            <input className='focus:outline-none border-2 p-2 rounded border-zinc-900 pl-4 w-11/12 m-auto' placeholder='Enter your E-mail'></input>
          </div>
        </div>
        <div className='py-4'>
          <p className='text-center text-white'>© Copyright TEX Worldwide Express. All Rights Reserved</p>
          <p className='text-center text-white'>Copyright © 2023 - TEX Worldwide Express International Co., Ltd</p>
        </div>
    </div>
  )
}