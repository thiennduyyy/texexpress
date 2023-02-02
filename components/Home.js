import React from 'react'


export default function HomeComponent({ homeRef, showLogin }) {
  return (
    <>
      {/* {showLogin &&
      <div className='w-full py-8 mt-16 bg-gray-300'>
        <div className='w-3/5 m-auto h-auto flex flex-col justify-between'>
          <div className='flex text-center'>
            <p className='my-auto font-semibold'>Username: </p>
            <input className='focus:outline-none border-2 p-2 rounded border-zinc-900 pl-4 h-10 w-11/12 m-auto rounded' placeholder='Username' type='text'/>
          </div>
          <div className='flex mt-4'>
            <p className='my-auto font-semibold'>Password: </p>
            <input className='focus:outline-none border-2 p-2 rounded border-zinc-900 pl-4 h-10 w-11/12 m-auto rounded' placeholder='Password' type='password'/>
          </div>
          <p className='my-6 text-medium'>Forgot your password?</p>
          <div>
            <button className='bg-lime-700 hover:bg-lime-600 rounded h-10 py-1 px-4 text-white'>Log-in</button>
            <button className='bg-lime-700 hover:bg-lime-600 ml-8 rounded h-10 py-1 px-4 text-white'>Sign-up</button>
          </div>
        </div>
      </div>} */}
      <div ref={homeRef} className={`relative flex w-screen h-75vh bg-cover bg-no-repeat bg-[url('/images/transportation.jpg')]`}>
          <div className='absolute top-0 w-full backdrop-opacity-40 backdrop-invert bg-blue/30 w-full h-10'>
            <div className='h-full w-3/5 mx-auto flex justify-between'>
              <p className='text-white text-sm my-auto'>CALL FREE: +1 212-226-3126</p>
              <p className='text-white text-sm my-auto'> info@transcargo.com</p>
              <p className='text-white text-sm my-auto'>Mon — Sat: 9AM — 6PM.</p>
            </div>    
          </div>
      </div>
    </>
  )
}