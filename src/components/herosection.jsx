import React, { useState, useEffect } from "react";
function HeroSection() {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
  const move = (e) => {
    document.documentElement.style.setProperty(
      "--mouse-x",
      `${(e.clientX / window.innerWidth) * 100}%`
    );
    document.documentElement.style.setProperty(
      "--mouse-y",
      `${(e.clientY / window.innerHeight) * 100}%`
    );
  };

  window.addEventListener("mousemove", move);
  return () => window.removeEventListener("mousemove", move);
}, []);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate parallax values
  const getParallaxValues = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    const x = ((mousePosition.x / window.innerWidth) - 0.5) * 20;
    const y = ((mousePosition.y / window.innerHeight) - 0.5) * 20;
    return { x, y };
  };

  const { x: parallaxX, y: parallaxY } = getParallaxValues();

  return (
    <section className="relative flex min-h-screen w-full px-6 md:px-12 lg:px-24 items-center overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-5 blur-3xl transition-transform duration-100"
          style={{
            background: "radial-gradient(circle, currentColor 0%, transparent 70%)",
            transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`,
          }}
        />
        <div className="absolute inset-0 pointer-events-none">
            <div className="hero-grid-base" />
            <div className="hero-grid-cursor" />
        </div>

      </div>

      <div className="flex w-full justify-between items-center gap-10 lg:gap-20 relative z-10">
        {/* LEFT CONTENT */}
        <div className="space-y-6 max-w-2xl">
          {/* Intro */}
          <div className="relative inline-block group">
            <h1 className="text-xl tracking-widest opacity-80">
              Hi there,
            </h1>
            <div className="absolute -bottom-1 left-0 h-px w-0 bg-current opacity-20 transition-all duration-500 group-hover:w-full" />
          </div>

          {/* Name */}
          <div className="relative">
            <h1 
              className="text-[#03030B] bg-[#f57b0050] text-3xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-500 hover:translate-x-2 cursor-default px-2"
              style={{
                transform: `translateX(${parallaxX * 0.1}px) translateY(${parallaxY * 0.1}px)`,
              }}
            >
              I'm Devang Kishore Shukla
            </h1>
          </div>

          {/* Skills */}
          <ul className="list-none mt-10 space-y-3">
            {[
              "Full-Stack MERN Developer",
              "API & Authentication Experienced",
              "Modern Web Solutions",
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-center group cursor-default transition-all duration-300 hover:pl-2"
                style={{
                  transform: `translateX(${parallaxX * 0.05}px)`,
                }}
              >
                {/* Animated bullet */}
                <div className="w-2 h-2 mr-3 rounded-full bg-current opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 relative">
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20" />
                </div>
                <span className="text-md group-hover:tracking-wide transition-all duration-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Terminal Block */}
          <div 
            className="mt-16 text-sm leading-relaxed rounded-xl p-6 relative overflow-hidden group bg-gradient-terminal backdrop-blur-md border border-white/10 hover:border-white/40 transition-all duration-300"
            style={{
              transform: `translateY(${parallaxY * 0.1}px)`,
            }}
          >
            {/* Terminal header dots */}
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3].map((dot) => (
                <div key={dot} className="w-3 h-3 rounded-full bg-current opacity-30" />
              ))}
            </div>
            
            {/* Terminal content */}
            <div className="space-y-2 relative z-10">
              <p className="flex items-center">
                <span className="mr-2 opacity-60">~$</span>
                WELCOME TO DEVANG'S PORTFOLIO
                <span className="ml-2 opacity-60 animate-pulse">~</span>
              </p>
              <p className="opacity-80 flex items-center">
                <span className="mr-2 opacity-60">~$</span>
                -- SCROLL TO GET STARTED
              </p>
              <p className="flex items-center mt-4">
                <span className="mr-2 opacity-60">USER:</span>
                -$
                <span className={`ml-1 w-2 h-5 transition-opacity duration-100 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>
                  █
                </span>
              </p>
            </div>
            
            {/* Animated scan line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20 group-hover:opacity-40 animate-scan" />
            
            {/* Hover glow effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${(mousePosition.x / window.innerWidth) * 100}% ${(mousePosition.y / window.innerHeight) * 100}%, currentColor 0%, transparent 50%)`
              }}
            />
          </div>
        </div>

        {/* IMAGE */}
        <div 
          className="hidden lg:block relative group"
          style={{
            transform: `translate(${parallaxX * 0.2}px, ${parallaxY * 0.2}px)`,
          }}
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl bg-radial-glow" />
          
          {/* Floating border effect */}
          <div className="absolute -inset-2 rounded-xl border-2 border-current opacity-0 group-hover:opacity-10 transition-all duration-500 group-hover:scale-105" />
          
          {/* Main image */}
          <img
            src="/hero.jpeg"
            alt="Devang Kishore Shukla"
            className="h-[80vh] rounded-xl relative z-10 transition-all duration-700 group-hover:scale-[1.02] object-cover image-mask"
            style={{
              transform: `rotate3d(${parallaxY * 0.01}, ${parallaxX * 0.01}, 0, 1deg) `,
            }}
          />
          
          {/* Subtle shine overlay */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-20 bg-shine-overlay animate-shine" />
          
          {/* Corner accents */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-current opacity-0 group-hover:opacity-20 rounded-tl-lg transition-all duration-500" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-current opacity-0 group-hover:opacity-20 rounded-br-lg transition-all duration-500" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;