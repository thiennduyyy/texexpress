// import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import ServiceCard from '../components/ServiceCard'
import Gallery from '../components/Gallery'
import Input from '../components/Input'
import Header from '../components/Header'
import HomeComponent from '../components/Home'
import Services from '../components/Services'
import { useRef, useState, useEffect } from 'react'
import AboutUs from '../components/AboutUs'
import Footer from '../components/Footer'
import Login from '../components/Login'

// const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  useEffect(() => {
    document.title = 'TEX Express - Công ty vận chuyển hàng quốc tế'
  }, [])
  const [active, setActive] = useState('Home')
  const homeRef = useRef()
  const servicesRef = useRef()
  const aboutUsRef = useRef()
  const galleryRef = useRef()
  const componentRefList = [homeRef, servicesRef, aboutUsRef, galleryRef]
  const handleFocus = (e) => {
    switch (e.target.innerText) {
      case 'Home':
        console.log(homeRef.current.getBoundingClientRect())
        homeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        // window.scrollTo({top: 0})
        break
      case 'Services':
        console.log(servicesRef.current.getBoundingClientRect())
        servicesRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        break
      case 'Gallery':
        galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        break
      case 'About us':
        aboutUsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        break
    }
  }
  const handleScroll = () => {
    let i=0
    let component 
    while (i<4) {
      if (checkPercentageInViewport(componentRefList[i])) {
        component = componentRefList[i]
        break
      }
      i++
    }
    switch (component) {
      case homeRef:
        setActive('Home')
        break;
      case servicesRef:
        setActive('Services')
        break;
      case galleryRef:
        setActive('Gallery')
        break;
      case aboutUsRef:
        setActive('About us')
        break;
    }
  }
  useEffect(() => {

    window.addEventListener("scroll", handleScroll);

   return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);
  const checkPercentageInViewport = (element) => {
    const rect= element.current.getBoundingClientRect()
    if (rect.top >=0 && rect.top <= 1076) {
      let heightInViewport = (window.innerHeight - rect.top) < rect.height ? (window.innerHeight - rect.top) : rect.height
      let percentage = heightInViewport/window.innerHeight > 0.5
      if (percentage) {
        return true
      } else {
        return false
      }
    } else {
      let heightInViewport = (rect.bottom > 0) ? rect.bottom : 0
      let percentage = heightInViewport/window.innerHeight > 0.5
      if (percentage) {
        return true
      } else {
        return false
      }
    }
  }
  return (
    <>
      {/* <Login/> */}
      <Header handleFocus={handleFocus} active={active}/>
      <HomeComponent homeRef={homeRef}/>
      <Services servicesRef={servicesRef}/>
      <AboutUs aboutUsRef={aboutUsRef}/>
      <Gallery galleryRef={galleryRef}/>
      <Footer handleFocus={handleFocus}/>
      {/* <Input /> */}
    </>
  )
}
