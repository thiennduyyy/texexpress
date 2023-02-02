import React from 'react'


function ServiceCard({imageSrc, header, serviceName, content}) {
  return (
    <div className='w-1/4 -mx-8 h-auto relative pb-16 border-b-2 border-zinc-900'>
        <img src={imageSrc} className='w-full' alt='National' />
        <img src={`/images/services/${serviceName}.png`} className='mt-4 w-1/5 mx-auto'/>
        <h3 className='text-center mt-8 mb-4 hover:text-cyan-900 cursor-pointer font-bold block h-12'>{header}</h3>
        <p className='text-center px-4'>{content}</p>
    </div>
  )
}

export default ServiceCard