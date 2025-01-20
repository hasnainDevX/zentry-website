import React, { useEffect, useRef, useState } from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import Button from './Button'
import { useWindowScroll } from 'react-use' 
import gsap from "gsap/all"

const navItems = [
  "Nexus", "Vault","Prologue", "Blog", "Contact"
]

const Navbar = () => {
  const navContainerRef = useRef(null);
  const AudioElemRef = useRef(null);
  const [isAudioPlaying, setisAudioPlaying] = useState(false);
  const [isIndicatorActive, setisIndicatorActive] = useState(false);
  const [IsNavVisible, setIsNavVisible] = useState(true)
  const [lastScrollY, setlastScrollY] = useState(0)
  const {y: currentScrollY} = useWindowScroll();

  useEffect(() => {
    if(currentScrollY === 0){
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav")
     } else if(currentScrollY > lastScrollY) {
      setIsNavVisible(false);
    } else if (currentScrollY < lastScrollY){
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav")
    }
    setlastScrollY(currentScrollY)
  }, [currentScrollY, lastScrollY])

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: IsNavVisible ? 0 : -100,
      opacity: IsNavVisible ? 1 : 0,
      duration: 0.2,
    })
  }, [IsNavVisible])
  
  
  const toggleAudioIndicator = () => {
    // setisAudioPlaying(prev => !prev)
    setisAudioPlaying(!isAudioPlaying);
    setisIndicatorActive(!isIndicatorActive);
  }

  useEffect(() => {
    if(isAudioPlaying){
      AudioElemRef.current.play();
    }
    else{
      AudioElemRef.current.pause();
    }
  }, [isAudioPlaying])

  useEffect(() => {
    const handleUserInteraction = () => {
      setisIndicatorActive(true);
      setisAudioPlaying(true);
  
      // Remove listeners after interaction
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };
  
    // Add listeners for various interaction types
    window.addEventListener("click", handleUserInteraction);
    window.addEventListener("keydown", handleUserInteraction);
    window.addEventListener("scroll", handleUserInteraction);
  
    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };
  }, []); 
  
  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
      <header className='absolute top-1/2 w-full -translate-y-1/2'>
        <nav className='flex size-full items-center justify-center p-4'>
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className='w-10' />
            <Button id="product-button" title="Products" rightIcon={<TiLocationArrow/>} containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1" />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, idx) => (
                <a key={idx} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>
            <audio ref={AudioElemRef} src="/audio/loop.mp3" className='hidden' loop />
            {[1,2,3,4].map((bar)=> (
              <div key={bar} className={`indicator-line ${isIndicatorActive ? "active": ""}`} style={{animationDelay: `${bar*0.1}s`}} />
            ))}
          </button>
        </nav>
      </header>
    </div>
  )
}

export default Navbar