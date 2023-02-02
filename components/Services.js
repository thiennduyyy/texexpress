import React from 'react'
import ServiceCard from './ServiceCard'

let cardContent = [
    {
      imageSrc: "/images/sea.jpg",
      serviceName: 'ship',
      header: 'VẬN CHUYỂN TRONG NƯỚC',
      content: 'TEX Worldwide Express chuyên phục vụ khách hàng cần gửi hàng trong nước, thuê container chở hàng bằng đường bộ, biển và hàng không.'
    },
    {
      imageSrc: "/images/international.jpg",
      serviceName: 'airplane',
      header: 'DỊCH VỤ VẬN CHUYỂN HÀNG KHÔNG QUỐC TẾ',
      content: 'TEX Worldwide Express cung cấp dịch vụ gửi hàng chuyên tuyến Đài Loan, Malaysia, Philippines, Singapore và tại quốc gia khác.'
    },
    {
      imageSrc: "/images/airplane.png",
      serviceName: 'international',
      header: 'DỊCH VỤ GỬI HÀNG CHUYÊN TUYẾN QUỐC TẾ',
      content: 'TEX Worldwide Express cung cấp dịch vụ gửi hàng chuyên tuyến Đài Loan, Malaysia, Philippines, Singapore và tại quốc gia khác'
    },
    {
      imageSrc: "/images/advise.png",
      serviceName: 'advise',
      header: 'DỊCH VỤ TƯ VẤN - KHAI BÁO HẢI QUAN & BÁO CƯỚC VẬN TẢI                                            ',
      content: 'Đội ngũ nhân viên trình độ cao  phục vụ, tư vấn cho khách hàng kiến thức về thủ tục hải quan và cước vận tải.'
    }
]

export default function Services({ servicesRef }) {
  return (
    <div ref={servicesRef} className='w-full pt-8'>
        <h1 className='mx-auto block w-full text-center pb-8 text-lg font-bold'>DỊCH VỤ CỦA CHÚNG TÔI</h1>
        <div className='w-4/5 flex mx-auto justify-between'>
          {cardContent.map((card) => 
            <ServiceCard
              key={card.imageSrc} 
              imageSrc={card.imageSrc}
              header={card.header}
              content={card.content}
              serviceName={card.serviceName}
            />
          )}
        </div>
    </div>
  )
}