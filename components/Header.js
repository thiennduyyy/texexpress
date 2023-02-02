import React, { useState } from 'react'
import Login from './Login'

const menu = ['Home', 'Services', 'About us', 'Gallery']
export default function Header({ active, handleFocus }) {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <div className='fixed top-0 left-0 right-0 z-10'>
      <div className='bg-neutral-800 py-4'>
        <div className='w-4/5 flex justify-between m-auto'>
          <div className='-mx-8 flex'>
            <h1 className='text-white text-lg font-bold mr-2 my-auto inline-block cursor-pointer'>TEX {' '}
              <p className='inline-block text-lime-600'>Worldwide Express</p>
            </h1>
            <img src='images/worldwide.png' className='h-8'/>
          </div>
          <div className='flex -mx-8'>
            <div className='flex'>
              {menu.map((component, index) => 
              <p key={index} onClick={handleFocus} className={`cursor-pointer block text-white rounded text-center align-center w-auto m-auto mr-4 hover:bg-white hover:text-black py-1 px-2 ${active === component ? 'bg-white text-black font-semibold' :''}`}>{component}</p>
              )}
            </div>
            <button 
              onClick={() => setShowLogin(prev => !prev)}
              className={`text-white px-4 ml-2 py-1 ${showLogin ? 'bg-lime-600' : 'bg-lime-700'} rounded-md`}>Log-in</button>
          </div>
        </div>
      </div>
      {showLogin &&
      <div className='w-4/5 relative m-auto mt-1'>
        <div className='w-2/5 absolute rounded-md h-auto top-0 right-0 py-8 bg-neutral-800 -mx-8'>
          <div className='w-4/5 m-auto h-auto flex flex-col justify-between'>
            <div className='flex w-auto'>
              <p className='my-auto w-1/5 text-white font-normal mr-4'>Username: </p>
              <input className='focus:outline-none block flex-1 border-2 p-2 rounded border-zinc-900 pl-4 h-10 m-auto rounded' placeholder='Username' type='text'/>
            </div>
            <div className='flex mt-4'>
              <p className='my-auto w-1/5 text-white font-normal mr-4'>Password: </p>
              <input className='focus:outline-none block flex-1 border-2 p-2 rounded border-zinc-900 pl-4 h-10 m-auto rounded' placeholder='Password' type='password'/>
            </div>
            <p className='my-6 text-white text-normal'>Forgot your password?</p>
            <div>
              <button className='bg-lime-700 hover:bg-lime-600 rounded h-10 py-1 px-4 text-white'>Log-in</button>
              <button className='bg-lime-700 hover:bg-lime-600 ml-8 rounded h-10 py-1 px-4 text-white'>Sign-up</button>
            </div>
          </div>
        </div>
      </div>   
      }
    </div>
  )
}