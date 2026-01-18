import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';
import {
  FaMapMarkedAlt,
  FaComments,
  FaShoppingBag,
  FaArrowLeft,
  FaArrowRight,
  FaExternalLinkAlt,
  FaGithub
} from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiSocketdotio,
  SiRedux,
} from "react-icons/si";

const myProjects = [
  {
    title: "SAFE ROUTE — INTELLIGENT NAVIGATION SYSTEM",
    desc: ">> safety-first mapping solution prioritizing secure paths over shortest distances",
    subdesc: "// shows safer routes using live map data",
    href: "#",
    live: "https://safe-route-119-frontend.onrender.com/",
    github: "https://github.com/Devang1/safe-route",
    texture: "/projects/project1.mp4",
    accentColor: "#F57C00",
    tags: [
      { id: 1, name: "REACT", icon: SiReact },
      { id: 2, name: "LEAFLET", icon: FaMapMarkedAlt },
      { id: 3, name: "EXPRESS", icon: SiExpress },
    ],
    stats: {
      lines: "12K",
      latency: "47ms",
      coverage: "98.7%"
    }
  },
  {
    title: "REAL-TIME CHAT APPLICATION",
    desc: ">> scalable messaging platform with socket.io + redux state management",
    subdesc: "// real-time messaging with multiple users",
    href: "#",
    live: "https://chitchat-frontend-qiia.onrender.com/",
    github: "https://github.com/Devang1/chitchat",
    texture: "/projects/project2.mp4",
    accentColor: "#F57C00",
    tags: [
      { id: 1, name: "REACT", icon: SiReact },
      { id: 2, name: "REDUX", icon: SiRedux },
      { id: 3, name: "SOCKET.IO", icon: SiSocketdotio },
      { id: 4, name: "NODE.JS", icon: SiNodedotjs },
    ],
    stats: {
      users: "10K+",
      latency: "89ms",
      uptime: "99.99%"
    }
  },
  {
    title: "JEWELLERY E-COMMERCE PLATFORM",
    desc: ">> full-stack commerce solution with secure checkout + inventory management",
    subdesc: "// online store with product listings and checkout",
    href: "#",
    live: "https://geer-intern-assignment-7cwrlnca9.vercel.app/",
    github: "https://github.com/Devang1/geer-intern-assignment",
    texture: "/projects/project3.mp4",
    accentColor: "#F57C00",
    tags: [
      { id: 1, name: "NEXT.JS", icon: SiNextdotjs },
      { id: 2, name: "TAILWIND", icon: SiTailwindcss },
      { id: 3, name: "NODE.JS", icon: SiNodedotjs },
      { id: 4, name: "POSTGRESQL", icon: SiPostgresql },
    ],
    stats: {
      products: "500+",
      checkout: "2.3s",
      security: "A+"
    }
  },
];

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const terminalRef = useRef(null);
  const currentProject = myProjects[selectedProjectIndex];
  const accentColor = "#F57C00";

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track cursor for interactive effects (desktop only)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isMobile) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setCursorPosition({ x, y });
    };
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  useGSAP(() => {
    // Terminal text typing effect
    gsap.fromTo(".typing-text",
      { width: 0 },
      {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0.5
      }
    );

    // Project card entrance
    gsap.fromTo(".project-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

    // Stats counter animation
    gsap.fromTo(".stat-value",
      { textContent: 0 },
      {
        textContent: (i, el) => {
          const value = el.textContent;
          return value.includes('K') ? value : parseInt(value);
        },
        duration: 2,
        ease: "power1.out",
        snap: { textContent: 1 }
      }
    );

    // Border glow effect (desktop only)
    if (!isMobile) {
      gsap.to(".border-glow", {
        backgroundPosition: "200% 0",
        duration: 3,
        repeat: -1,
        ease: "linear"
      });
    }
  }, [selectedProjectIndex, isMobile]);

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) =>
      direction === "next"
        ? (prevIndex + 1) % myProjects.length
        : (prevIndex - 1 + myProjects.length) % myProjects.length
    );
  };

  // Swipe handling for mobile
  useEffect(() => {
    if (!isMobile) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next
          handleNavigation('next');
        } else {
          // Swipe right - previous
          handleNavigation('previous');
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-20 sm:py-24 md:py-32 overflow-hidden bg-[#03030B]"
      style={{
        backgroundImage: isMobile 
          ? `radial-gradient(circle at 50% 20%, ${accentColor}10 0%, transparent 70%)`
          : `radial-gradient(circle at 20% 50%, ${accentColor}10 0%, transparent 50%)`
      }}
    >
      {/* Terminal Grid Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(90deg, ${accentColor}20 1px, transparent 1px),
            linear-gradient(${accentColor}20 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? '30px 30px' : '50px 50px'
        }} />
      </div>

      {/* Blinking Cursor (desktop only) */}
      {!isMobile && (
        <div className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-50">
          <div className="w-full h-full bg-[#F57C00] rounded-full blur-sm animate-pulse" />
        </div>
      )}

      {/* Section Header - Terminal Style */}
      <div className="relative mb-12 sm:mb-16 md:mb-20">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F57C00] animate-pulse" />
          <span className="text-[#F57C00] text-xs sm:text-sm tracking-widest">
            $ ./projects --list --active
          </span>
        </div>
        
        <div className="relative">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 overflow-hidden">
            <span className="typing-text inline-block whitespace-nowrap overflow-hidden">
              PROJECT_MATRIX
            </span>
          </h1>
          
          {/* Blinking underscore */}
          <span className="text-[#F57C00] animate-pulse">_</span>
          
          <p className="text-gray-400 mt-2 sm:mt-3 text-sm sm:text-base tracking-wide">
            > system active | projects loaded: {myProjects.length} | last update: 00:00:00
          </p>
        </div>
      </div>

      {/* Main Content Grid - Reversed order for mobile */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 relative">
        
        {/* 3D Panel FIRST on Mobile, SECOND on Desktop */}
        <div className={`relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[480px] order-first lg:order-last ${isMobile ? 'mb-6' : ''}`}>
          {/* Mobile navigation overlay */}
          {isMobile && (
            <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
              <button
                onClick={() => handleNavigation('previous')}
                className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border border-gray-800 flex items-center justify-center text-white hover:border-[#F57C00] transition-all"
              >
                <FaArrowLeft className="text-sm" />
              </button>
              
              <div className="flex gap-1">
                {myProjects.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full ${
                      selectedProjectIndex === idx 
                        ? 'bg-[#F57C00]' 
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => handleNavigation('next')}
                className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border border-gray-800 flex items-center justify-center text-white hover:border-[#F57C00] transition-all"
              >
                <FaArrowRight className="text-sm" />
              </button>
            </div>
          )}

          {/* Glowing Border */}
          <div className={`absolute inset-0 border border-glow rounded-lg sm:rounded-xl overflow-hidden ${
            !isMobile ? 'border-glow' : ''
          }`}
            style={!isMobile ? {
              background: `linear-gradient(90deg, transparent, ${accentColor}20, transparent)`,
              backgroundSize: '200% 100%'
            } : {}}
          />
          
          <div className="absolute inset-1 sm:inset-2 rounded-lg overflow-hidden border border-gray-800 bg-black/40">
            <Canvas>
              <ambientLight intensity={Math.PI} />
              <directionalLight position={[10, 10, 5]} />
              <Center>
                <Suspense fallback={<CanvasLoader />}>
                  <group 
                    scale={isMobile ? 1.5 : 2} 
                    position={[0, isMobile ? -2 : -3, 0]} 
                    rotation={[0, -0.1, 0]}
                  >
                    <DemoComputer texture={currentProject.texture} isMobile={isMobile} />
                  </group>
                </Suspense>
              </Center>
              <OrbitControls 
                maxPolarAngle={Math.PI / 2} 
                enableZoom={false} 
                enablePan={false}
                enableDamping={!isMobile}
                dampingFactor={0.05}
              />
            </Canvas>
          </div>

          {/* Mobile swipe hint */}
          {isMobile && (
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <p className="text-xs text-gray-500 bg-black/50 backdrop-blur-sm inline-block px-3 py-1 rounded-full">
                Swipe to navigate projects
              </p>
            </div>
          )}
        </div>
        
        {/* Left Panel - Project Details (Terminal Interface) */}
        <div className="relative order-last lg:order-first">
          {/* Terminal Window */}
          <div className="border border-gray-800 rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 p-3 sm:p-4 border-b border-gray-800 bg-black/80">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 text-xs sm:text-sm ml-3 truncate">terminal — project-details</span>
            </div>
            
            {/* Terminal Content */}
            <div className="p-4 sm:p-6 text-xs sm:text-sm md:text-base">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProjectIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="project-content space-y-4 sm:space-y-6"
                >
                  {/* Project Title */}
                  <div>
                    <p className="text-[#F57C00] mb-1 sm:mb-2 text-xs sm:text-sm">
                      > PROJECT_ID: {String(selectedProjectIndex + 1).padStart(2, '0')}
                    </p>
                    <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-2 sm:mb-3 font-bold tracking-wider">
                      {currentProject.title}
                    </h2>
                    <div className="h-px w-full bg-gradient-to-r from-[#F57C00] to-transparent mb-3 sm:mb-4" />
                  </div>
                  
                  {/* Description */}
                  <div>
                    <p className="text-gray-300 leading-relaxed mb-1 sm:mb-2 text-sm sm:text-base">
                      {currentProject.desc}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {currentProject.subdesc}
                    </p>
                  </div>
                  
                  {/* Tech Stack */}
                  <div>
                    <p className="text-[#F57C00] mb-2 sm:mb-3 text-xs sm:text-sm">> TECH_STACK_ACTIVE</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {currentProject.tags.map((tag) => {
                        const Icon = tag.icon;
                        return (
                          <motion.div
                            key={tag.id}
                            whileHover={{ scale: isMobile ? 1 : 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 border border-gray-800 rounded bg-black/50 hover:border-[#F57C00]/30 transition-colors"
                          >
                            <Icon className="text-[#F57C00] text-sm sm:text-base" />
                            <span className="text-gray-300 text-xs sm:text-sm">{tag.name}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Project Links */}
                  <div>
                    <p className="text-[#F57C00] mb-2 sm:mb-3 text-xs sm:text-sm">> PROJECT_LINKS</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                      {/* Live Demo */}
                      {currentProject.live && (
                        <motion.a
                          href={currentProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: isMobile ? 1 : 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm border border-[#F57C00] text-[#F57C00] rounded hover:bg-[#F57C00]/10 transition-all"
                        >
                          <span>LIVE</span>
                          <FaExternalLinkAlt className="text-xs" />
                        </motion.a>
                      )}

                      {/* GitHub */}
                      {currentProject.github && (
                        <motion.a
                          href={currentProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: isMobile ? 1 : 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-700 text-gray-300 rounded hover:border-[#F57C00] hover:text-[#F57C00] transition-all"
                        >
                          <span>GITHUB</span>
                          <FaGithub className="text-xs" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  
                  {/* Command Line */}
                  <div className="mt-4 sm:mt-6 md:mt-8">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">$</span>
                      <span className="text-gray-300 truncate">run --project {selectedProjectIndex + 1}</span>
                      <span className="text-[#F57C00] animate-pulse">█</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Desktop Navigation Controls */}
          {!isMobile && (
            <div className="flex items-center justify-between mt-6 sm:mt-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.button
                  onClick={() => handleNavigation('previous')}
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-800 rounded hover:border-[#F57C00] hover:bg-[#F57C00]/10 transition-all group"
                >
                  <span className="text-gray-400 group-hover:text-[#F57C00] text-xs sm:text-sm tracking-wider">← PREV</span>
                </motion.button>
                
                <motion.button
                  onClick={() => handleNavigation('next')}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-800 rounded hover:border-[#F57C00] hover:bg-[#F57C00]/10 transition-all group"
                >
                  <span className="text-gray-400 group-hover:text-[#F57C00] text-xs sm:text-sm tracking-wider">NEXT →</span>
                </motion.button>
              </div>
              
              {/* Project Indicator */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {myProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedProjectIndex(idx)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                      selectedProjectIndex === idx 
                        ? 'bg-[#F57C00] w-4 sm:w-6'
                        : 'bg-gray-800 hover:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Data Stream */}
      <div className="absolute bottom-6 sm:bottom-10 left-0 w-full h-px overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-[#F57C00] to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Projects;