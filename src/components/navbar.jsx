import React, { useState, useEffect } from 'react'

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY) {
            setIsVisible(true);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="z-50">
            <img 
              src="/logo1.png" 
              alt="logo" 
              className="h-20 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
            />
          </a>
          <div className="flex items-center gap-6">
            <a href="#contact">Contact</a>
            <a
            href="/resume.pdf"
            download="Devang_Kishore_Shukla_Resume.pdf"
            className="relative text-[#03030B] bg-[#F57C00]  p-0.5 text-md tracking-wider px-4 py-2 transition-all duration-300 hover:opacity-100 opacity-80   group rounded-2xl"
          >
            My Resume
          </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar