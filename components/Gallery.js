import React from 'react'


function Gallery({ galleryRef }) {
    let array = [1,2,3,4,5,6,7,8]
  return (
    <div ref={galleryRef} className='w-4/5 mx-auto py-8 border-t-2 border-zinc-900 mb-8'>
        <h1 className='text-center text-lg mb-4 font-bold'>MỘT SỐ HÌNH ẢNH</h1>
        <div className='w-full mx-auto flex flex-wrap'>
            {array.map((number) => 
                <img src={`/images/gallery/${number}.jpg`} 
                    key={number} 
                    alt={number}
                    className='w-1/4 h-96 p-4 object-cover'
                />
            )}
        </div>
    </div>
  )
}

export default Gallery