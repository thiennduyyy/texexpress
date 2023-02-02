import React from 'react'


export default function AboutUs({ aboutUsRef }) {
  return (
    <div ref={aboutUsRef} className='w-3/5 mx-auto flex py-16 justify-between'>
        <div className='w-1/2 flex flex-col justify-between -mx-4'>
            <h1 className='text-3xl text-left font-medium mb-8'>WELCOME TO OUR WEBSITE!</h1>
            <p className='text-left text-lg mb-8'>Transcargo makes business flow. As one of the world’s leading non-asset-based supply chain management companies, we design and implement industry-leading solutions in both freight management.</p>
            <p className='text-left text-lg'>Over 42,000 dedicated employees, working in 17 regional clusters around the globe, deliver operational excellence — to provide viable answers to the most challenging supply chain questions.</p>
            <p className='text-left text-lg'>Over 42,000 dedicated employees, working in 17 regional clusters around the globe, deliver operational excellence — to provide viable answers to the most challenging supply chain questions.</p>
        </div>
        <img src='/images/meeting.jpg' alt='meeting' className='w-1/2 -mx-4'></img>
    </div>
  )
}